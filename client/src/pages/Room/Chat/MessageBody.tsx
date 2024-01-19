import Markdown from 'react-markdown';

const CustomCode = ({...props}) => (
  <div className="bg-bg_secondary p-4 rounded-lg text-sm">
    <code {...props}/>
  </div>
);

const components = {
  code: CustomCode,
};


export default function MessageBody({
  message,
}: {
  message: string;
}): JSX.Element {
  return <Markdown components={components}>{message}</Markdown>;
}