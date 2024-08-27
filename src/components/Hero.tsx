import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-800">
            Effortless Outfits, Every Day – Powered by AI
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            From Class to Night Out – Your AI Stylist Has You Covered
          </p>
          <div className="mt-8 flex justify-center md:justify-start space-x-4">
            <a
              href="#waitlist"
              className="px-6 py-3 bg-teal-500 text-white rounded-lg text-lg font-medium hover:bg-teal-600 transition"
            >
              Join the Waitlist
            </a>
            <a
              href="#features"
              className="px-6 py-3 bg-white text-teal-500 border border-teal-500 rounded-lg text-lg font-medium hover:bg-teal-50 transition"
            >
              Explore Premium Features
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-8 md:mb-0">
          <Image
            src="/images/hero-image.png"
            alt="Students using LookMate app"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
