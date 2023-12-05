import { io, Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import Problems from '../components/Problems';
import ScoreboardButton from '../components/buttons/ScoreBoardButton';
import Chat from '../components/Chat';
import StartButton from '../components/buttons/StartButton';
import RoomInfo from '../components/RoomInfo';
import { MessageInterface, RoomMessagesLocalStorage } from '../types/Message';

export default function Room() {
  const location = useLocation();
  const isHost = location.state?.isHost;
  const roomCode = location.state?.roomCode;

  const roomId = useParams<{ roomId: string }>().roomId;

  const serverUrl = import.meta.env.VITE_BASE_URL;

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLUListElement>(null);
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket: Socket = io(serverUrl, {
      transports: ['websocket', 'polling'],
    });

    const storedRoomMessagesString = localStorage.getItem('leetRoomsMessages');
    if (storedRoomMessagesString) {
      const storedRoomMessages: RoomMessagesLocalStorage = JSON.parse(
        storedRoomMessagesString,
      );
      if (storedRoomMessages) {
        setMessages(storedRoomMessages.messages);
      }
    }

    socket.on('chat-message', (newMessage) => {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, newMessage];

        localStorage.setItem(
          'leetRoomsMessages',
          JSON.stringify({
            messages: newMessages,
          }),
        );
        return newMessages;
      });
    });

    socketRef.current = socket;
    return () => {
      socket.disconnect();
    };
  }, [roomId, serverUrl]);

  useEffect(() => {
    function autoScrollToLatestMessage() {
      if (!messagesRef.current) {
        return;
      }

      const latestMessage = messagesRef.current.lastElementChild;
      latestMessage?.scrollIntoView({
        behavior: 'smooth',
      });
    }

    autoScrollToLatestMessage();
  }, [messages]);

  return (
    <div className="flex items-center justify-center bg-fg">
      <div className="flex h-screen w-full flex-col items-center gap-2 rounded-lg bg-bg p-4 shadow-2xl md:w-[70%] lg:w-[50%]">
        <RoomInfo roomCode={roomCode} />
        <Problems isHost={isHost} />
        <ScoreboardButton />
        <StartButton isHost={isHost} />
        <Chat
          messages={messages}
          inputRef={inputRef}
          messagesRef={messagesRef}
          socketRef={socketRef}
        />
      </div>
    </div>
  );
}
