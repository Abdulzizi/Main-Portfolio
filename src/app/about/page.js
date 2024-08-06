import { Navigation } from "../../components/nav";
import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center pt-16 md:pt-6 px-4 md:px-6 text-white font-semibold min-h-screen">
      <Navigation />
      <div className="flex-1 w-full md:w-1/2 flex flex-col justify-center items-center md:items-start p-4 md:p-6">
        <h2 className="text-2xl md:text-3xl mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text text-center md:text-left">
          A Bit About Me
        </h2>
        <p className="text-xl md:text-2xl text-center md:text-left">
          <span className="font-light text-[#E3E4E6]/50">
            I am a Web Developer
          </span>{" "}
          and I&apos;m used to building fullstack apps (not with the design.), I
          go to the gym, love gaming, enjoy reading, love nature, coffee, and
          make content.
        </p>
      </div>
      <div className="flex-1 w-full md:w-1/2 flex flex-col items-center justify-center p-4 md:p-6">
        <div className="gap-4 hidden md:block">
          <Link href="/">
            <Image
              width={200}
              height={200}
              src="https://github.com/Abdulzizi.png"
              alt="avatar"
              className="w-32 md:w-48 h-auto rounded-full animate-bounce"
            />
          </Link>
        </div>
        <div className="block md:hidden text-center mt-4">
          <p className="text-sm md:text-lg italic mt-2">
            &quot;A smooth sea never made a skilled sailor.&quot;
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
