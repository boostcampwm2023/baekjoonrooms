import Result from './Result';


export default function Players({ playerScore }) {
  return (
    <li className="flex flex-row bg-bg px-5 py-2.5 text-text_default odd:bg-bg_secondary">
      {/* <div>{playerScore.name}</div> */}
      <div className="flex w-full flex-row gap-1">
        {/* {playerScore.results.map((result, index) => (
          <Result key={index} result={result} />
        ))} */}
      </div>
    </li>
  );
}
