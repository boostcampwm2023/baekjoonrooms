import { FaGithub } from 'react-icons/fa6';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { IoTrophyOutline } from 'react-icons/io5';
import { MdOutlinePrivacyTip } from 'react-icons/md'; // light

// import VideoPlayer from '../components/Intro/VideoPlayer';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTheme } from '../hooks/useTheme';

import LogoDefault from '../assets/LogoDefault.svg';
import LogoDefaultDark from '../assets/LogoDefaultDark.svg';
import ChromeIcon from '../assets/ChromeIcon.svg';
import Demo from '../assets/Demo.png';

export default function Intro() {
  const { user } = useAuthContext();
  const { theme } = useTheme();
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
            <img
              src={theme.includes('dark') ? LogoDefaultDark : LogoDefault}
              alt="BaekjoonRooms"
              style={{
                width: '4rem',
              }}
            />
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
        <div className="bg-gradient-to-r from-gold to-text_default bg-clip-text text-center  text-transparent ">
          Inspired By LeetRooms
        </div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://chromewebstore.google.com/detail/baekjoonrooms/fndogmcoaeenjcihljbahpdlfinkepeh"
          className="flex flex-row items-center justify-center gap-x-2 rounded-lg bg-fg/50 p-4 transition-all hover:bg-fg/20">
          <div className="text-lg font-bold text-text_default">
            Download for
          </div>
          <img
            src={ChromeIcon}
            alt="ChromeIcon"
            style={{
              width: '2rem',
            }}
          />
        </a>

        <div className="relative mx-8 lg:mx-28">
          <div className="absolute -inset-6 rounded-xl border-[1px] bg-gradient-to-r from-gold to-gold opacity-20 blur-[48px]"></div>
          <img
            src={Demo}
            id="baekjoonrooms-screenshot"
            alt="BaekjoonRooms screenshot"
            className="border-slate-600 relative rounded-xl border-[1px]"
          />
        </div>

        <div className="mb-14 mt-14 flex flex-row flex-wrap items-start justify-center gap-x-16 gap-y-12 px-28 text-text_default lg:gap-x-36">
          <div className="flex flex-1 flex-col items-center gap-2 text-center">
            <IoChatbubbleEllipsesOutline
              size="4rem"
              className="text-text_default"
            />
            <div className="font-bold">채팅</div>
            <div className="text-md max-w-[16rem] opacity-60">
              실시간 채팅으로 지루한 코테준비를 친구들과 함께 즐겨보세요
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center gap-2 text-center">
            <IoTrophyOutline size="4rem" className="text-text_default" />
            <div className="font-bold">
              BOJ에서 제공하는
              <br />
              수많은 문제들로 경쟁
            </div>
            <div className="text-md max-w-[16rem] opacity-60">
              검증된 수많은 문제들로 개발자들과 경쟁하며 코딩실력을
              향상시켜보세요
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center gap-2 text-center">
            <MdOutlinePrivacyTip size="4rem" className="text-text_default" />
            <div className="font-bold">프라이버시</div>
            <div className="text-md max-w-[16rem] opacity-60">
              백준룸즈는 비밀번호나 채팅을 저장하지 않습니다
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col items-center justify-center gap-2 p-10">
          <div className="bg-gradient-to-r from-text_default to-gold bg-clip-text text-3xl font-bold text-transparent">
            시연영상 보시죠
          </div>
          <VideoPlayer videoSrc={videoSource} />
        </div> */}

        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://chromewebstore.google.com/detail/baekjoonrooms/fndogmcoaeenjcihljbahpdlfinkepeh"
          className="mb-20 flex flex-row items-center justify-center gap-x-2 rounded-lg bg-fg/50 p-4 transition-all hover:bg-fg/20">
          <div className="text-lg font-bold text-text_default">
            Download for
          </div>
          <img
            src={ChromeIcon}
            alt="ChromeIcon"
            style={{
              width: '2rem',
            }}
          />
        </a>
      </main>
    </div>
  );
}
