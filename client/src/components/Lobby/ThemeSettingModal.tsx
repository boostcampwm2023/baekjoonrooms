import { RefObject } from 'react';
import {
  FaArrowRight,
  FaChartSimple,
  FaRegCopy,
  FaXmark,
} from 'react-icons/fa6';
import { RxExit } from 'react-icons/rx';
import { ProblemType } from '../../types/ProblemType';
import { getProblemButtonColor } from '../../utils/getProblemButtonColor';
import Message from '../Room/Message';
import { MessageInterface, ChatEvent } from '../../types/Message';
import { useTheme } from '../../hooks/useTheme';
import { useAuthContext } from '../../hooks/useAuthContext';

interface ThemeSettingModalProps {
  modalOverlayRef: RefObject<HTMLDivElement>;
  closeModal: () => void;
  modalOutsideClick: (arg: React.MouseEvent<HTMLDivElement>) => void;
}

export default function ThemeSettingModal({
  modalOverlayRef,
  closeModal,
  modalOutsideClick,
}: ThemeSettingModalProps) {
  const { theme, toggleTheme } = useTheme();

  const { user } = useAuthContext();

  const problems: ProblemType[] = [
    {
      title: '테스트 문제1',
      bojProblemId: 1000,
      url: 'https://www.acmicpc.net/problem/1000',
      level: 1,
      tags: [{ id: 96, name: '수학' }],
    },
    {
      title: '테스트 문제2',
      bojProblemId: 1001,
      url: 'https://www.acmicpc.net/problem/1001',
      level: 10,
      tags: [{ id: 96, name: '수학' }],
    },
    {
      title: '테스트 문제3',
      bojProblemId: 1002,
      url: 'https://www.acmicpc.net/problem/1002',
      level: 20,
      tags: [{ id: 96, name: '수학' }],
    },
    {
      title: '테스트 문제4',
      bojProblemId: 1003,
      url: 'https://www.acmicpc.net/problem/1003',
      level: 30,
      tags: [{ id: 96, name: '수학' }],
    },
  ];

  const messages: MessageInterface[] = [
    {
      timestamp: Date.now(),
      username: 'testUser1',
      body: 'testMessage1',
      chatEvent: ChatEvent.Message,
      color: 'text-cyan',
    },
    {
      timestamp: Date.now(),
      username: 'testUser2',
      body: 'testMessage2',
      chatEvent: ChatEvent.Message,
      color: 'text-blue',
    },
    {
      timestamp: Date.now(),
      username: 'testUser3',
      body: 'testMessage3',
      chatEvent: ChatEvent.Message,
      color: 'text-purple',
    },
    {
      timestamp: Date.now(),
      username: 'testUser4',
      body: 'testMessage4',
      chatEvent: ChatEvent.Message,
      color: 'text-green',
    },
    {
      timestamp: Date.now(),
      username: 'testUser5',
      body: 'testMessage5',
      chatEvent: ChatEvent.Message,
      color: 'text-rose',
    },
    {
      timestamp: Date.now(),
      username: 'testUser6',
      body: 'testMessage6',
      chatEvent: ChatEvent.Message,
      color: 'text-orange',
    },
    {
      timestamp: Date.now(),
      username: 'testUser7',
      body: 'testMessage7',
      chatEvent: ChatEvent.Message,
      color: 'text-red',
    },
    {
      timestamp: Date.now(),
      username: 'testUser8',
      body: 'testMessage8',
      chatEvent: ChatEvent.Message,
      color: 'text-gold',
    },
    {
      timestamp: Date.now(),
      username: user!.username,
      body: 'testMessage9',
      chatEvent: ChatEvent.Message,
      color: 'text-purple',
    },
    {
      timestamp: Date.now(),
      username: 'testUser10',
      body: 'testMessage10',
      chatEvent: ChatEvent.Message,
      color: 'text-cyan',
    },
    {
      timestamp: Date.now(),
      username: 'testUser11',
      body: 'testMessage11',
      chatEvent: ChatEvent.Message,
      color: 'text-blue',
    },
    {
      timestamp: Date.now(),
      username: 'testUser12',
      body: 'testMessage12',
      chatEvent: ChatEvent.Message,
      color: 'text-purple',
    },
  ];

  return (
    <div
      className="absolute top-0 z-50 flex h-screen w-full items-center justify-center"
      style={{ backdropFilter: 'blur(10px)' }}
      ref={modalOverlayRef}
      onClick={modalOutsideClick}>
      <div className="z-100 relative flex h-[90%] w-full flex-col items-center gap-2 rounded-lg bg-bg p-4 shadow-2xl md:w-[70%] lg:w-[50%]">
        <div className="relative mb-2 mt-4 flex w-full justify-center gap-2 align-middle text-lg font-semibold text-text_default">
          Theme Setting
          <div className="absolute right-8 top-1/2 flex -translate-y-1/2 transform gap-2">
            <button className="" onClick={closeModal}>
              <FaXmark />
            </button>
          </div>
        </div>
        <div className="flex w-full items-center justify-center gap-2">
          <div className="flex w-full justify-end">
            <span className="text-text_default">{`현재 테마 : `}</span>
          </div>
          <div className="flex w-full justify-start">
            <span className="text-text_default">{theme}</span>
          </div>
        </div>

        <button
          className="w-[30%] rounded-md bg-accent py-1 text-default_white hover:opacity-80"
          onClick={toggleTheme}>
          Next Theme
        </button>
        {/* DEMO */}
        <div className="flex h-screen w-full flex-col items-center gap-2 rounded-lg bg-bg p-4 shadow-2xl overflow-auto">
          {/* RoomInfo */}
          <>
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-row items-center rounded-lg text-text_default">
                <div className="pr-3 text-xl font-bold">testRoom</div>
                <FaRegCopy />
              </div>
              <button
                id="room-exit-button"
                className="flex flex-row items-center gap-x-2 rounded-lg bg-accent px-2.5 py-1 text-default_white hover:opacity-80">
                <RxExit
                  style={{
                    fontWeight: 'bold',
                  }}
                />
                <div className="font-medium ">Exit</div>
              </button>
            </div>
          </>
          {/* Problems */}
          <div className="h-[120px] w-full flex-col">
            {problems.map((problem, index) => (
              <div className="mt-1 flex h-[24px]" key={index}>
                <div
                  className={`flex h-[24px] max-w-[368px] cursor-pointer items-center justify-center gap-2  rounded-[21px] px-2.5 py-1 text-left text-xs ${getProblemButtonColor(
                    problem.level,
                  )}`}>
                  <img
                    className="h-[12px] w-[12px]"
                    src={`https://static.solved.ac/tier_small/${problem.level}.svg`}
                    alt={`${problem.level}`}
                  />
                  <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {problem.bojProblemId}. {problem.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* ScoreboardButton */}
          <>
            <button className="flex w-full flex-row items-center justify-center rounded-lg bg-accent px-3 py-2 text-default_white hover:opacity-80">
              <FaChartSimple />
              <div className="pl-2 font-medium">Scoreboard</div>
            </button>
          </>
          {/* Chat */}
          <div className="flex w-full flex-1 flex-col overflow-hidden">
            <div className="mx-2 flex-1 overflow-auto px-2 py-2">
              <ul className="flex flex-col gap-y-1.5">
                {messages.map((message, index) => (
                  <Message key={index} message={message} />
                ))}
              </ul>
            </div>
            <div className="mx-2 mb-2.5 flex flex-row items-center justify-center gap-x-2 rounded-lg border bg-default_white py-[5px] pl-3 pr-2">
              <form className="flex-grow">
                <input
                  type="text"
                  name="chatBox"
                  className="w-full outline-none"
                  placeholder="메세지를 입력해주세요"
                  spellCheck="false"
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                />
              </form>
              <FaArrowRight />
            </div>
          </div>
        </div>
        {/* DEMO */}
      </div>
    </div>
  );
}
