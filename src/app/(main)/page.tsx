import Image from "next/image";
import React from "react";
import HeroSection from "../../components/Hero";

import ContactForm from "../../components/Contact";

import Features from "../../components/Features";
import Pricing from "../../components/Pricing";

export default function Home() {
  return (
    <>
      <HeroSection />

      <Features />
      <Pricing />

      <ContactForm />
    </>
  );

}   
