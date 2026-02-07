"use client"; // Required for the toggle buttons (interactivity)

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Portfolio() {
  const languages = [
    "Python",
    "Java",
    "SQL",
    "C#",
    "HTML",
    "CSS",
    "JavaScript",
  ];

  return (
    <main className="max-w-4xl min-h-screen mx-auto p-8 font-sans">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold">Liam Callahan</h1>
        <h3 className="text-xl text-gray-600">Computer Science Student</h3>
        <h2 className="mt-4">
          <a
            href="mailto:liam@acodecrafter.xyz"
            className="text-blue-600 hover:underline"
          >
            liam@acodecrafter.xyz
          </a>
        </h2>
      </header>

      {/* Intro */}
      <section className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-gray-200">
          <Image
            src="/profile_516.png"
            alt="Liam Callahan"
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-2xl leading-relaxed">
          I&apos;m Liam Callahan, a computer science student and up-and-coming
          full-stack engineer.
        </h3>
      </section>

      {/* Languages */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Languages</h2>
        <div className="flex flex-wrap gap-3">
          {languages.map((lang) => (
            <span
              key={lang}
              className="px-4 py-2 bg-white/10 border border-white/300 rounded-md font-medium"
            >
              {lang}
            </span>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        <div className="space-y-4">
          <ProjectItem
            title="Flask Blogging and Administration Engine"
            github="https://github.com/aCodeCrafter/personal_website"
          >
            For this website I wanted a simple portfolio and blog administration
            engine...
          </ProjectItem>

          <ProjectItem title="Python Blog Migration Tool">
            A while back my church wanted to migrate their website from Weebly
            to Wordpress...
          </ProjectItem>

          {/* Add your other projects here following the same pattern */}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Recent Blog Posts</h2>
        <div className="p-8 border-2 border-dashed border-gray-200 rounded-lg text-center text-gray-500">
          Blog feed coming soon...
        </div>
        <Link
          href="/blog-archive/page-1"
          className="inline-block mt-4 text-blue-600 hover:underline"
        >
          Read More
        </Link>
      </section>
    </main>
  );
}

// Reusable Project Component (The "Dynamic" part)
function ProjectItem({
  title,
  children,
  github,
}: {
  title: string;
  children: React.ReactNode;
  github?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 bg-white/10 hover:bg-white/30 transition-colors font-semibold flex justify-between"
      >
        {title}
        <span>{isOpen ? "−" : "+"}</span>
      </button>
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isOpen
            ? "max-h-[500px] p-4 opacity-100"
            : "max-h-0 p-0 opacity-0 overflow-hidden",
        )}
      >
        <p className="text-gray-700 leading-relaxed">
          {children}
          {github && (
            <a
              href={github}
              className="block mt-2 text-blue-600 hover:underline"
            >
              View on GitHub
            </a>
          )}
        </p>
      </div>
    </div>
  );
}
