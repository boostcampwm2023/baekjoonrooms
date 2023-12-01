import { ChatEvent, MessageInterface } from '../types/Message';

// This just needs to be here so that these colors get bundled in the final distribution.
// The userColor is actually assigned on the server.
const colorChoices = ['cyan', 'blue', 'green', 'rose', 'orange', 'red', 'gold'];

export default function Message({
  message,
  user,
}: {
  message: MessageInterface;
  user: string | undefined;
}) {
  switch (message.chatEvent) {
    case ChatEvent.Message:
      return user === message.username ? (
        <li className="flex flex-row items-start justify-end gap-x-1">
          <span>
            <span className="chat-message text-text_default">{`${message.body}`}</span>
          </span>
        </li>
      ) : (
        <li className="flex flex-row items-start gap-x-1">
          <span>
            <span className={`${message.color} font-bold`}>
              {message.username}
            </span>
            <span>:&nbsp;</span>
            <span className="chat-message text-text_default">{`${message.body}`}</span>
          </span>
        </li>
      );
    case ChatEvent.Join:
    case ChatEvent.Leave:
      return (
        <li className="bg-lc-fg-message-light flex flex-row items-start gap-x-1 rounded-md px-2 py-1.5 dark:bg-[hsl(0,0%,20%)]">
          <span>
            <span>
              {`👋`}
              &nbsp;
            </span>
            <span className={`${message.color} ml-1 font-bold`}>
              {`${message.username}`}&nbsp;&nbsp;
            </span>
            <span className="chat-message">{`${message.body}`}</span>
          </span>
        </li>
      );
    case ChatEvent.Submit:
      return (
        <li className="bg-lc-fg-message-light flex flex-row items-start gap-x-1 rounded-md px-2 py-1.5 dark:bg-[hsl(0,0%,20%)]">
          <span>
            <span>
              {`🤞`}
              &nbsp;
            </span>
            <span className={`${message.color} ml-1 font-bold`}>
              {`${message.username}`}&nbsp;&nbsp;
            </span>
            <span className="chat-message">{`${message.body}`}</span>
          </span>
        </li>
      );
    case ChatEvent.Accepted:
      return (
        <li className="bg-lc-fg-message-light flex flex-row items-start gap-x-1 rounded-md px-2 py-1.5 dark:bg-[hsl(0,0%,20%)]">
          <span>
            <span>
              {`💯`}
              &nbsp;
            </span>
            <span className={`${message.color} ml-1 font-bold`}>
              {`${message.username}`}&nbsp;&nbsp;
            </span>
            <span className="chat-message">{`${message.body}`}</span>
          </span>
        </li>
      );
    case ChatEvent.Complete:
      return (
        <li className="bg-lc-fg-message-light flex flex-row items-start gap-x-1 rounded-md px-2 py-1.5 dark:bg-[hsl(0,0%,20%)]">
          <span>
            <span>
              {`🎉`}
              &nbsp;
            </span>
            <span className={`${message.color} ml-1 font-bold`}>
              {`${message.username}`}&nbsp;&nbsp;
            </span>
            <span className="chat-message">{`${message.body}`}</span>
          </span>
        </li>
      );
  }
}
