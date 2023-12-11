import { useRoom } from '../../hooks/useRoom';
import { userColors } from '../../../public/userColors';
import { hash } from '../../utils/hash';
import { ChatEvent, MessageInterface } from '../../types/Message';
import MessageBody from './MessageBody';

export default function Message({
  message,
  user,
}: {
  message: MessageInterface;
  user: string | undefined;
}) {
  const { roomCode } = useRoom();
  const generateRandomColor = (username: string) => {
    const idx = Math.abs(hash(username + roomCode) % userColors.length);
    return userColors[idx];
  };

  switch (message.chatEvent) {
    // 유저의 채팅 메세지
    case ChatEvent.Message:
      return user === message.username ? (
        <li className="flex flex-row items-start justify-end gap-x-1">
          <span>
            <span className="chat-message text-text_default">
              <MessageBody message={message.body} />
            </span>
          </span>
        </li>
      ) : (
        <li className="flex flex-row items-start gap-x-1 py-1">
          <span
            className={`${generateRandomColor(message.username)} font-bold`}>
            {message.username}
          </span>
          <span className="text-text_default">:&nbsp;</span>
          <span className="chat-message text-text_default">
            <MessageBody message={message.body} />
          </span>
        </li>
      );
    // 유저가 방에 들어왔을 때 메세지
    // 유저가 방에서 나갔을 때 메세지
    case ChatEvent.Join:
    case ChatEvent.Leave:
      return (
        <li className="bg-lc-fg-message-light flex flex-row items-start gap-x-1 rounded-md  py-1">
          <span>
            <span className="m1-1 font-bold text-accent">system&nbsp;</span>
            <span className="text-text_default">
              :&nbsp;
              {`👋`}
              &nbsp;
            </span>
            <span
              className={`${generateRandomColor(
                message.username,
              )} ml-1 font-bold`}>
              {`${message.username}`}
            </span>
            <span className="chat-message text-text_default">{`${message.body}`}</span>
          </span>
        </li>
      );
    // 유저가 문제를 제출했을 때 메세지
    case ChatEvent.Submit:
      return (
        <li className="bg-lc-fg-message-light flex flex-row items-start gap-x-1 rounded-md px-2 py-1.5 dark:bg-[hsl(0,0%,20%)]">
          <span>
            <span className="m1-1 font-bold text-accent">system&nbsp;</span>
            <span className="text-text_default">
              :&nbsp
              {`🤞`}
              &nbsp;
            </span>
            <span
              className={`${generateRandomColor(
                message.username,
              )} ml-1 font-bold`}>
              {`${message.username}`}
            </span>
            <span className="chat-message">{`${message.body}`}</span>
          </span>
        </li>
      );
    // 유저가 문제를 맞췄을 때 메세지
    case ChatEvent.Accepted:
      return (
        <li className="bg-lc-fg-message-light flex flex-row items-start gap-x-1 rounded-md px-2 py-1.5 dark:bg-[hsl(0,0%,20%)]">
          <span>
            <span className="m1-1 font-bold text-accent">system&nbsp;</span>
            <span className="text-text_default">
              :&nbsp;
              {`💯`}
              &nbsp;
            </span>
            <span
              className={`${generateRandomColor(
                message.username,
              )} ml-1 font-bold`}>
              {`${message.username}`}
            </span>
            <span className="chat-message">{`${message.body}`}</span>
          </span>
        </li>
      );
    // 유저가 문제를 틀렸을 때 메세지
    case ChatEvent.Wrong:
      return (
        <li className="bg-lc-fg-message-light flex flex-row items-start gap-x-1 rounded-md px-2 py-1.5 dark:bg-[hsl(0,0%,20%)]">
          <span>
            <span className="m1-1 font-bold text-accent">system&nbsp;</span>
            <span className="text-text_default">
              :&nbsp;
              {`👎`}
              &nbsp;
            </span>
            <span
              className={`${generateRandomColor(
                message.username,
              )} ml-1 font-bold`}>
              {`${message.username}`}
            </span>
            <span className="chat-message">{`${message.body}`}</span>
          </span>
        </li>
      );
  }
}
