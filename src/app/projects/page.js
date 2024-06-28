import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from "./work";

import data from "../../../data.json";

const ProjectsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 text-white">
      <div className="max-w-2xl mx-auto lg:mx-0 mt-16">
        <WorkHeader data={data} />
      </div>
      <div className="w-full my-10 h-px bg-zinc-800" />
      {projects.map((project, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row items-center md:items-start mb-12 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
        >
          <WorkImage imageUrl={project.imageUrl} alt={project.alt} />
          <WorkDescription
            title={project.title}
            description={project.description}
            type={project.type}
            urls={project.url}
          />
        </div>
      ))}
    </div>
  );
};

const WorkHeader = ({ data }) => {
  return (
    <>
      <h2 className="text-4xl font-bold mb-2 text-center md:text-left">
        Some{" "}
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          of my works
        </span>
      </h2>
      <p className="text-center md:text-left text-zinc-400">{data.description}</p>
      <Link
        href="/work/github"
        className="inline-block mt-4 md:mt-5 px-4 py-2 rounded-xl text-purple-500 border border-purple-500 hover:text-white hover:bg-purple-500 transition duration-300 ease-in-out"
      >
        Github Repo
      </Link>
    </>
  );
};

const WorkDescription = ({ title, description, type, urls }) => {
  const highlightWords = (text) => {
    const keywords = ["simple", "easy", "good", "project", "show"];
    return text.split(" ").map((word, index) =>
      keywords.includes(word.toLowerCase()) ? (
        <span
          key={index}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text"
        >
          {word}
        </span>
      ) : (
        `${word} `
      )
    );
  };

  return (
    <div className="w-full md:w-1/2 md:pl-8 text-center md:text-left">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-lg mb-4">{highlightWords(description)}</p>
      <p className="text-lg mb-4">{type}</p>

      <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
        {urls.map((link, index) => (
          <Link key={index} href={link.url}>
            <button className={link.name === "GitHub" ? "button-primary" : "button-secondary"}>
              {link.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

const WorkImage = ({ imageUrl, alt }) => {
  return (
    <div className="w-full md:w-1/2 mb-8 md:mb-0 relative p-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-xl shadow-xl">
      <div className="relative w-full h-64 md:h-80 lg:h-96">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
    </div>
  );
};

export default ProjectsPage;