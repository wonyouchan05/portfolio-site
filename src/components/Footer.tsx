export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-2 px-6 py-8 sm:px-10 lg:px-20">
      <div className="mx-auto flex max-w-[1080px] flex-col gap-1.5 text-[12.5px] text-muted-2 sm:flex-row sm:items-center sm:justify-between">
        <span>© {year} 원유찬</span>
        <span>AI/SW 창업을 향해 만들고 배우는 중</span>
      </div>
    </footer>
  );
}
