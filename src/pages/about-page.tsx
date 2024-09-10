import Image from "next/image";
import { Roboto_Condensed } from "next/font/google";
import {
  aboutMeImageSrc,
  projectAuthorGithub
} from "@/general-utils/app-routes";
import Link from "next/link";

const robotoCondensed = Roboto_Condensed({
  weight: ["400", "700"],
  subsets: ["latin"]
});

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1
        className={`${robotoCondensed.className} text-4xl font-bold mb-8 text-center`}
      >
        About This Project
      </h1>
      <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
        <div className="w-full md:w-1/3">
          <Image
            src={aboutMeImageSrc}
            alt="Project Overview"
            width={400}
            height={400}
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <div className="w-full md:w-2/3">
          <h2
            className={`${robotoCondensed.className} text-2xl font-bold mb-4`}
          >
            Project Overview
          </h2>
          <p>
            This culinary blog platform is a full-stack web application designed
            to showcase recipes, cooking tips, and food-related content. It
            provides a user-friendly interface for both content creators and
            readers, emphasizing responsive design and seamless user experience.
          </p>
        </div>
      </div>

      <div className="w-full">
        <h2 className={`${robotoCondensed.className} text-2xl font-bold mb-4`}>
          Key Features
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>User authentication and profile management</li>
          <li>CRUD operations for blog posts and recipes</li>
          <li>Responsive design for various devices</li>
          <li>Comment system for user engagement</li>
          <li>Tag-based categorization of content</li>
          <li>Search functionality for recipes and blog posts</li>
        </ul>

        <h2 className={`${robotoCondensed.className} text-2xl font-bold mb-4`}>
          Technologies Used
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>Next.js for server-side rendering and routing</li>
          <li>React for building user interfaces</li>
          <li>TypeScript for type-safe code</li>
          <li>Tailwind CSS for styling</li>
          <li>NextAuth.js for authentication</li>
        </ul>

        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="italic">
            This project is part of my web development portfolio. To see more of
            my work, please visit my{" "}
            <Link
              href={projectAuthorGithub}
              className="text-blue-600 hover:underline"
            >
              main portfolio page
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
