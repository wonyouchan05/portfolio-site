"use client";

import { useState } from "react";
import LockScreen from "@/components/LockScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return <LockScreen onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div id="site-top" className="min-h-screen bg-bg text-text">
      <Navbar />

      <Hero />

      <About />

      <Timeline />

      <Stack />

      <Contact />

      <Footer />
    </div>
  );
}
