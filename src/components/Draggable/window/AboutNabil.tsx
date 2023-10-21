import EmojiPeople from "@/components/svgs/EmojiPeople";
import Github from "@/components/svgs/Github";
import LinkedIn from "@/components/svgs/LinkedIn";
import Mail from "@/components/svgs/Mail";
import WorkspacePremium from "@/components/svgs/WorkspacePremium";

const AboutNabil = () => {
    return (
      <div className="flex flex-col items-center w-full h-full bg-ubuntu-dark-5 overflow-y-auto justify-items-start">
        <div className="text-2xl py-10">
          <div className="text-center">
            My name is{" "}
            <span className="font-bold text-lime-700">Nabil Spann</span>,
          </div>
          <div className="text-center">
            I&apos;m a{" "}
            <span className="font-bold text-purple-600">
              Front-end Developer
            </span>
          </div>
        </div>
        <div className="border-b-2 border-gray-600 w-96"></div>
        <div className="flex flex-row px-7 py-3 max-w-3xl pt-10">
          <span className="pr-3">
            <WorkspacePremium size={24} color="#EAB308" />
          </span>
          <span>
            I am an experienced Front-end/UI developer with 5+ years of
            experience with primary focus on React. I have worked in insurance
            companies such as Kaiser Permanente and Unum. I have also taken
            roles for financial companies such as American Express.
          </span>
        </div>
        <div className="flex flex-row px-7 py-3 max-w-3xl w-full">
          <span className="pr-3">
            <EmojiPeople size={24} color="#0284C7" />
          </span>
          <span>
            Currently I am looking for more remote opportunities and roles in
            Front-end development. Even though my primary focus is in React, I
            can work with other frame-works such as Vue and Angular as well. I
            would also like to work with back-end and cloud technologies such as
            NodeJS or AWS so that I can become a better Front-end developer.
          </span>
        </div>
        <div className="flex flex-row py-3 max-w-3xl w-full px-7">
          <a
            className="pr-3"
            target="_blank"
            href="mailto:nabilspann@gmail.com"
          >
            <Mail size={24} color="#fff"/>
          </a>
          <a
            target="_blank"
            href="mailto:nabilspann@gmail.com"
          >
            nabilspann@gmail.com
          </a>
        </div>
        <div className="flex flex-row py-3 max-w-3xl w-full px-7">
          <a
            className="pr-3"
            target="_blank"
            href="https://github.com/nabilspann"
          >
            <Github size={24} />
          </a>
          <a target="_blank" href="https://github.com/nabilspann">
            https://github.com/nabilspann
          </a>
        </div>
        <div className="flex flex-row py-3 max-w-3xl w-full px-7">
          <a
            className="pr-3"
            target="_blank"
            href="https://www.linkedin.com/in/nabil-spann-7078b2172/"
          >
            <LinkedIn size={24} />
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/nabil-spann-7078b2172/"
          >
            https://www.linkedin.com/in/nabil-spann-7078b2172/
          </a>
        </div>
      </div>
    );
};

export default AboutNabil;
