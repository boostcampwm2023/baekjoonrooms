import { FaGithub } from 'react-icons/fa6';
import VideoPlayer from '../components/Intro/VideoPlayer';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Intro() {
  const videoSource = '/assets/test.mp4';

  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/lobby');
    }
  }, [navigate, user]);

  return (
    <div className="h-full min-h-screen overscroll-none bg-bg">
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
        <div className="bg-gradient-to-r from-text_default to-gold bg-clip-text text-center text-xl font-bold text-transparent md:text-3xl lg:text-5xl">
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
          <div className="absolute -inset-6 rounded-xl border-[1px] bg-gradient-to-r from-gold to-gold opacity-20 blur-[64px]"></div>
          <img
            src="/assets/test.png"
            id="baekjoonrooms-screenshot"
            alt="BaekjoonRooms screenshot"
            className="border-slate-600 relative rounded-xl border-[1px]"
          />
        </div>

        <div className="mb-14 mt-14 flex flex-row flex-wrap items-start justify-center gap-x-16 gap-y-12 px-28 text-text_default lg:gap-x-36">
          <div className="flex flex-1 flex-col items-center gap-2 text-center">
            <FaGithub size="4rem" className="text-text_default" />
            <div className="font-bold">개쩌는 채팅</div>
            <div className="text-md max-w-[16rem] opacity-60">
              우리 채팅 ㄹㅇ 개쩜
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center gap-2 text-center">
            <FaGithub size="4rem" className="text-text_default" />
            <div className="font-bold">백준에 제출하면 자동 연동됨</div>
            <div className="text-md max-w-[16rem] opacity-60">
              백준에 제출하면 자동으로 연동됨 ㄹㅇ 개신기함
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center gap-2 text-center">
            <FaGithub size="4rem" className="text-text_default" />
            <div className="font-bold">프-라이버시</div>
            <div className="text-md max-w-[16rem] opacity-60">
              우리는 님들 프라이버시 존중해줌. 일단 채팅 저장 안하고, 코드도
              싫다하면 안가져감 ㄹㅇ
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 p-10">
          <div className="bg-gradient-to-r from-text_default to-gold bg-clip-text text-3xl font-bold text-transparent">
            시연영상 보시죠
          </div>
          <VideoPlayer videoSrc={videoSource} />
        </div>
      </main>
    </div>
  );
}
