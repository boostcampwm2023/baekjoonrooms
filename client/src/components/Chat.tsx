import { io, Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';

import {
  ChatEvent,
  MessageInterface,
  RoomMessagesLocalStorage,
} from '../types/Message';
import { FaArrowRight } from 'react-icons/fa6';
import Message from './Message';
import { useAuthContext } from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';

// TODO: userColor -> 서버에서 설정
export default function Chat() {
  const roomId = useParams<{ roomId: string }>().roomId;
  const { user } = useAuthContext();

  const serverUrl = import.meta.env.VITE_BASE_URL;

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLUListElement>(null);
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const socketRef = useRef<Socket | null>(null);

  function handleSubmitMessage(event: React.SyntheticEvent) {
    event.preventDefault();

    if (
      !inputRef.current ||
      !socketRef.current ||
      (inputRef.current && !inputRef.current.value.trim())
    ) {
      return;
    }

    const socket = socketRef.current;
    const inputText = inputRef.current.value.trim();
    const newChatMessage: MessageInterface = {
      timestamp: Date.now(),
      username: user?.username || 'Anonymous',
      body: inputText,
      chatEvent: ChatEvent.Message,
      color: 'text-aod_purple', // TODO: 서버에서 설정
    };

    socket.emit('chat-message', newChatMessage);

    inputRef.current.value = '';
  }

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

    // socket.on('keep-alive', () => {
    //   socket.emit('keep-alive', 'keep-alive-message-client');
    // });

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
        behavior: 'auto',
      });
    }

    autoScrollToLatestMessage();
  }, [messages]);

  return (
    <div className="flex flex-1 flex-col justify-end overflow-auto bg-aod_rose">
      <div className="border-transparent mx-2 grow overflow-auto border bg-aod_cyan px-3 py-[10px]">
        <ul ref={messagesRef} className="flex flex-col gap-y-1.5">
          {messages.map((message, index) => (
            <Message key={index} message={message} user={user?.username} />
          ))}
        </ul>
      </div>
      <div className="border-transparent bg-lc-fg-light focus-within:border-blue-500 hover:border-blue-500 dark:bg-lc-fg mx-2 mb-2.5 flex flex-row items-center justify-between gap-x-2 rounded-lg border py-[5px] pl-3 pr-2">
        <form onSubmit={handleSubmitMessage} className="flex-grow">
          <input
            ref={inputRef}
            type="text"
            name="chatBox"
            id="chatBox"
            className="bg-lc-fg-light dark:bg-lc-fg w-full  outline-none"
            placeholder="Type a message..."
            spellCheck="false"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
          />
        </form>

        <div
          onClick={handleSubmitMessage}
          className={` bg-lc-fg-light hover:bg-zinc-200 dark:bg-lc-fg dark:hover:bg-zinc-600 rounded-md p-2 transition-all`}></div>
        <FaArrowRight />
      </div>
    </div>
  );
}
