import { FaGithub } from 'react-icons/fa6';

export default function Landing() {
  return (
    <div className="h-full min-h-screen overscroll-none bg-bg pt-5">
      <header className="fixed z-50 w-full bg-opacity-50 shadow-lg backdrop-blur-sm transition duration-300 ease-in-out">
        <div className="flex h-20 flex-row items-center justify-center px-16 md:px-24 lg:px-36">
          <div className="flex flex-row items-center gap-x-3 sm:flex-1">
            <FaGithub size="2rem" className="text-text_default" />
            <div className="text-xl font-bold text-text_default">
              BaekjoonRooms
            </div>
          </div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/boostcampwm2023/web15-BaekjoonRooms"
            className="hidden sm:block">
            <FaGithub size="2rem" className="text-text_default" />
          </a>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center gap-y-16 pt-36">
        <div className="text-transparent bg-gradient-to-r from-text_default to-default_white bg-clip-text text-center text-xl font-bold md:text-3xl lg:text-5xl">
          Multiplayer rooms for BOJ
        </div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://chrome.google.com/webstore/"
          className="flex flex-row items-center justify-center gap-x-2 rounded-lg bg-fg p-4 transition-all hover:bg-fg/80">
          <div className="text-lg font-bold text-text_default">
            Download for
          </div>
          {/* <img src="/assets/ChromeIcon.2bb1a2c9.svg" alt="Download for Chrome" className="w-7"> */}
          <FaGithub size="2rem" className="text-text_default" />
        </a>

        <div className="relative mx-8 lg:mx-28">
          <div className="bg-gradient-radial from-yellow-700 absolute -inset-6 to-[hsl(0,0%,12%)] blur-[64px]"></div>
          <img
            src="/assets/test.png"
            id="baekjoonrooms-screenshot"
            alt="BaekjoonRooms screenshot"
            className="border-slate-600 relative rounded-xl border-[1px]"
          />
        </div>
        <div className="relative mx-8 lg:mx-28">
          <div className="bg-gradient-radial from-yellow-700 absolute -inset-6 to-[hsl(0,0%,12%)] blur-[64px]"></div>
          <img
            src="/assets/test.png"
            id="baekjoonrooms-screenshot"
            alt="BaekjoonRooms screenshot"
            className="border-slate-600 relative rounded-xl border-[1px]"
          />
        </div>
        <div className="relative mx-8 lg:mx-28">
          <div className="bg-gradient-radial from-yellow-700 absolute -inset-6 to-[hsl(0,0%,12%)] blur-[64px]"></div>
          <img
            src="/assets/test.png"
            id="baekjoonrooms-screenshot"
            alt="BaekjoonRooms screenshot"
            className="border-slate-600 relative rounded-xl border-[1px]"
          />
        </div>
      </main>
    </div>
  );
}
