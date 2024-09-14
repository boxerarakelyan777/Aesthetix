'use client'

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import HeroSection from "../../components/Hero";
import TestimonialStrip from "../../components/TestimonialStrip";
import ContactForm from "../../components/Contact";
import Features from "../../components/Features";
import Pricing from "../../components/Pricing";
import Chatbot from '../../components/Chatbot';

export default function Home() {
  const { user, isLoaded } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isLoaded) {
    return null;
  }

  return (
    <>
      <HeroSection />

      <Features />
      <Pricing />
      <ContactForm />
      <Chatbot />
    </>
  );
}
