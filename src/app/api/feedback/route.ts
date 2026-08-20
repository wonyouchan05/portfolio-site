import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { FeedbackType } from "@/generated/prisma/client";

const FEEDBACK_TYPES = Object.values(FeedbackType);
const MAX_CONTENT_LENGTH = 2000;
const MAX_AUTHOR_LENGTH = 60;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { type, content, author } = (body ?? {}) as {
    type?: string;
    content?: string;
    author?: string;
  };

  if (!type || !FEEDBACK_TYPES.includes(type as FeedbackType)) {
    return NextResponse.json({ error: "invalid_type" }, { status: 400 });
  }
  if (!content || typeof content !== "string" || !content.trim()) {
    return NextResponse.json({ error: "empty_content" }, { status: 400 });
  }
  if (content.length > MAX_CONTENT_LENGTH) {
    return NextResponse.json({ error: "content_too_long" }, { status: 400 });
  }
  if (author && (typeof author !== "string" || author.length > MAX_AUTHOR_LENGTH)) {
    return NextResponse.json({ error: "invalid_author" }, { status: 400 });
  }

  const feedback = await prisma.feedback.create({
    data: {
      type: type as FeedbackType,
      content: content.trim(),
      author: author?.trim() || null,
    },
  });

  return NextResponse.json({ id: feedback.id }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const adminCode = process.env.ADMIN_CODE;
  const providedCode = req.headers.get("x-admin-code");

  if (!adminCode || providedCode !== adminCode) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const typeParam = req.nextUrl.searchParams.get("type");
  const where =
    typeParam && FEEDBACK_TYPES.includes(typeParam as FeedbackType)
      ? { type: typeParam as FeedbackType }
      : undefined;

  const feedback = await prisma.feedback.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ feedback });
}
