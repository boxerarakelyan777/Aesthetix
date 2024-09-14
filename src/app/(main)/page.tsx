import React from "react";
import dynamic from 'next/dynamic';
import LoadingSpinner from "../../components/LoadingSpinner"; // You'll need to create this component

// Dynamically import components with loading fallbacks
const HeroSection = dynamic(() => import("../../components/Hero"), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

const Features = dynamic(() => import("../../components/Features"), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

const Pricing = dynamic(() => import("../../components/Pricing"), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

const ContactForm = dynamic(() => import("../../components/Contact"), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

const Chatbot = dynamic(() => import('../../components/Chatbot'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

export default function Home() {
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
