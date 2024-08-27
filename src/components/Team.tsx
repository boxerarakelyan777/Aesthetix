'use client';

import React from 'react';
import Image from 'next/image';

const Team: React.FC = () => {
  return (
    <section className="py-20 bg-midnight-black text-soft-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 text-electric-cyan">Our Team</h2>
          <p className="font-light text-xl text-slate-gray">
            Meet the dedicated team behind LookMate, working to bring you the best AI-powered fashion experience.
          </p>
        </div>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Team Member 1 */}
          <TeamMember
            name="Rudik Arakelyan"
            title="Co-founder & Full Stack Web Developer"
            description="Rudik is a co-founder and full stack web developer of the platform."
            imgSrc="/teamMembers/Rudik.JPG"
            linkedIn="https://www.linkedin.com/in/rudik-arakelyan/"
            github="https://github.com/boxerarakelyan777"
            twitter="https://x.com/boxerarakelyan"
          />
          {/* Team Member 2 */}
          <TeamMember
            name="Diepreye Charles-Daniel"
            title="Co-founder & Full Stack Web Developer"
            description="Diepreye is a co-founder and full stack web developer of the platform."
            imgSrc="/teamMembers/David.jpg"
            linkedIn="https://www.linkedin.com/in/diepreyecd/"
            github="https://github.com/davephoenix360"
            twitter="https://x.com/diepreyecd"
          />
          {/* Team Member 3 */}
          <TeamMember
            name="Vedant Patare"
            title="Co-founder & Full Stack Web Developer"
            description="Vedant is a co-founder and full stack web developer of the platform."
            imgSrc="/teamMembers/Vedant.jpg"
            linkedIn="https://www.linkedin.com/in/vedant-patare-65a332280/"
            github="https://github.com/vedant1729"
            twitter="https://x.com/vedantp1729"
          />
          {/* Team Member 4 */}
          <TeamMember
            name="Rohit Menon"
            title="Co-founder & Full Stack Web Developer"
            description="Rohit is a co-founder and full stack web developer of the platform."
            imgSrc="/teamMembers/Rohit.jpg"
            linkedIn="https://www.linkedin.com/in/rohit-menon-376216228/"
            github="https://github.com/rohitrm13"
            twitter="https://x.com/rohitm13"
          />
        </div>
      </div>
    </section>
  );
};

interface TeamMemberProps {
  name: string;
  title: string;
  description: string;
  imgSrc: string;
  linkedIn: string;
  github: string;
  twitter: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, title, description, imgSrc, linkedIn, github, twitter }) => {
  return (
    <div className="bg-slate-gray rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-center text-center">
      <Image
        className="w-full h-auto rounded-full mb-6 object-cover border-4 border-electric-cyan shadow-lg"
        src={imgSrc}
        alt={`${name} Avatar`}
        width={200}
        height={200}
      />
      <h3 className="text-2xl font-semibold mb-2 text-electric-cyan">{name}</h3>
      <span className="text-lg font-light text-soft-white mb-4">{title}</span>
      <p className="text-base mb-6 text-gray-400">{description}</p>
      <ul className="flex justify-center space-x-4">
        <li>
          <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="block p-2 rounded-full bg-gradient-to-r from-royal-purple to-electric-cyan hover:from-electric-cyan hover:to-vibrant-coral transition-all duration-300">
            <svg className="w-6 h-6 fill-soft-white" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M19 0h-14c-2.762 0-5 2.238-5 5v14c0 2.762 2.238 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.762-2.238-5-5-5zm-11.75 20h-3v-11h3v11zm-1.5-12.269c-.966 0-1.75-.785-1.75-1.75s.784-1.75 1.75-1.75c.967 0 1.75.785 1.75 1.75s-.783 1.75-1.75 1.75zm13.25 12.269h-3v-5.607c0-1.335-.03-3.059-1.862-3.059-1.863 0-2.148 1.454-2.148 2.958v5.708h-3v-11h2.882v1.505h.041c.402-.76 1.383-1.561 2.848-1.561 3.046 0 3.607 2.006 3.607 4.612v6.444z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>
        <li>
          <a href={github} target="_blank" rel="noopener noreferrer" className="block p-2 rounded-full bg-gradient-to-r from-royal-purple to-electric-cyan hover:from-electric-cyan hover:to-vibrant-coral transition-all duration-300">
            <svg className="w-6 h-6 fill-soft-white" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M12 .296c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.207 11.387.599.111.793-.26.793-.577v-2.176c-3.338.725-4.042-1.611-4.042-1.611-.546-1.387-1.333-1.756-1.333-1.756-1.091-.745.084-.729.084-.729 1.205.084 1.839 1.238 1.839 1.238 1.07 1.834 2.809 1.304 3.494.997.109-.775.418-1.305.76-1.604-2.665-.305-5.466-1.335-5.466-5.93 0-1.311.468-2.38 1.237-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.009-.322 3.301 1.23.957-.266 1.98-.399 3-.404 1.02.005 2.043.138 3 .404 2.292-1.552 3.299-1.23 3.299-1.23.655 1.653.243 2.873.119 3.176.77.841 1.237 1.91 1.237 3.221 0 4.607-2.807 5.624-5.479 5.921.43.372.815 1.102.815 2.222v3.293c0 .319.192.694.801.576 4.767-1.588 8.203-6.084 8.203-11.386 0-6.627-5.373-12-12-12z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>
        <li>
          <a href={twitter} target="_blank" rel="noopener noreferrer" className="block p-2 rounded-full bg-gradient-to-r from-royal-purple to-electric-cyan hover:from-electric-cyan hover:to-vibrant-coral transition-all duration-300">
            <svg className="w-6 h-6 fill-soft-white" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M24 4.557c-.883.392-1.83.656-2.828.775 1.014-.608 1.794-1.573 2.163-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.92 0 .385.044.76.127 1.122-4.09-.205-7.719-2.165-10.14-5.144-.424.725-.666 1.567-.666 2.465 0 1.701.866 3.2 2.181 4.079-.804-.026-1.561-.247-2.228-.616v.062c0 2.375 1.693 4.355 3.946 4.804-.413.111-.849.171-1.296.171-.317 0-.626-.031-.928-.089.627 1.956 2.445 3.379 4.6 3.419-1.685 1.32-3.808 2.106-6.115 2.106-.398 0-.79-.023-1.175-.069 2.179 1.396 4.768 2.211 7.548 2.211 9.051 0 13.999-7.497 13.999-13.986 0-.213-.004-.426-.014-.637.961-.695 1.8-1.562 2.462-2.549z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Team;
