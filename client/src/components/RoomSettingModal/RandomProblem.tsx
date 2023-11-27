export default function RandomProblem() {
  return (
    <form className="m-2 flex w-[250px] justify-between">
      <select className="bg-aod_white rounded-lg px-1">
        <option value="B5">B5</option>
        <option value="S5">S5</option>
        <option value="G5">G5</option>
        <option value="P5">P5</option>
        <option value="D5">D5</option>
        <option value="R5">R5</option>
      </select>
      <select className="bg-aod_white rounded-lg px-1">
        <option value="bfs,dfs">bfs,dfs</option>
      </select>
      <select className="bg-aod_white rounded-lg px-1">
        <option value="1개">1개</option>
        <option value="2개">2개</option>
        <option value="3개">3개</option>
        <option value="4개">4개</option>
        <option value="5개">5개</option>
      </select>
      <button className="bg-aod_accent text-aod_white rounded-lg px-3 py-1 text-sm hover:bg-gray-600">
        등록
      </button>
    </form>
  );
}
