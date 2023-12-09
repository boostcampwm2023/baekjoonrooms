import { FaArrowRight } from 'react-icons/fa6';
import { Socket } from 'socket.io-client';
import TextAreaAutoSize from 'react-textarea-autosize';

import Message from './Message';
import { useAuthContext } from '../hooks/useAuthContext';
import { ChatEvent, MessageInterface } from '../types/Message';

// TODO: userColor -> 서버에서 설정
export default function Chat({
  messages,
  inputRef,
  messagesRef,
  socketRef,
}: {
  messages: MessageInterface[];
  inputRef: React.RefObject<HTMLTextAreaElement>;
  messagesRef: React.RefObject<HTMLUListElement>;
  socketRef: React.MutableRefObject<Socket | null>;
}) {
  const { user } = useAuthContext();

  function insertNewlines(text: string, width: number): string {
    const words = text.split(' ');
    let lineLength = 0;
    let result = '';

    for (const word of words) {
      if (lineLength + word.length > width) {
        result += '\n';
        lineLength = 0;
      }
      result += word + ' ';
      lineLength += word.length + 1;
    }

    return result;
  }

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
    const inputText = insertNewlines(inputRef.current.value, 40);
    const newChatMessage: MessageInterface = {
      timestamp: Date.now(),
      username: user?.username || 'Anonymous',
      body: inputText,
      chatEvent: ChatEvent.Message,
      color: 'text-purple', // TODO: 클라에서 랜덤 설정
    };

    socket.emit('chat-message', newChatMessage);

    inputRef.current.value = '';
  }

  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden">
      <div className="mx-2 flex-1 overflow-y-auto px-2 py-2">
        <ul ref={messagesRef} className="flex flex-col gap-y-1.5">
          {messages.map((message, index) => (
            <Message key={index} message={message} user={user?.username} />
          ))}
        </ul>
      </div>
      <div className="mx-2 mb-2.5 flex flex-row items-center justify-center gap-x-2 rounded-lg border bg-default_white py-[5px] pl-3 pr-2">
        <form onSubmit={handleSubmitMessage} className="flex-grow">
          <TextAreaAutoSize
            ref={inputRef}
            name="chatBox"
            className="overflow-grow flex h-auto w-full resize-none items-center outline-none"
            placeholder="메세지를 입력해주세요"
            spellCheck="false"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            minRows={1}
            maxRows={10}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleSubmitMessage(event);
              }
            }}
          />
        </form>
        <div className="cursor-pointer" onClick={handleSubmitMessage}>
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
}
