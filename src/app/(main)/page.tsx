import Image from "next/image";
import React from "react";
import HeroSection from "../../components/Hero";
import Team from "../../components/Team";
import ContactForm from "../../components/Contact";
import SocialProof from "../../components/SocialProof"; 
import Features from "../../components/Features";
import Pricing from "../../components/Pricing";
export default function Home() {
  return (
    <>
      <HeroSection />
      <SocialProof />
      <Features />
      <Pricing />
      <Team />
      <ContactForm />
    </>
  );

}   
