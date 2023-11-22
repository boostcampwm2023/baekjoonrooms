export default function RoomSetting() {
  return (
    <>
      <div className="flex h-[430px] w-[330px] flex-col items-center bg-gray-400">
        <div className="mb-2 mt-4 text-lg font-semibold">번호로 출제</div>
        <form className="m-2 flex w-[250px] justify-between">
          <input className="rounded-lg bg-gray-200 px-2 py-1" />
          <button className="rounded-lg bg-gray-800 px-3 text-sm text-white hover:bg-gray-600">
            등록
          </button>
        </form>
        <div className="m-2 h-[250px] w-[250px] rounded-lg border-2"></div>
        <div className="m-2 flex w-[250px] justify-between">
          <select className="rounded-lg bg-gray-200 px-2 py-1">
            <option value="15분">15분</option>
            <option value="15분">30분</option>
            <option value="15분">45분</option>
            <option value="15분">60분</option>
            <option value="15분">90분</option>
            <option value="15분">120분</option>
            <option value="15분">무제한</option>
          </select>
          <button className="rounded-lg bg-gray-800 px-5 py-1 text-sm text-white hover:bg-gray-600">
            설정 완료
          </button>
        </div>
      </div>

      <div className="flex h-[430px] w-[330px] flex-col items-center bg-gray-400">
        <div className="mb-2 mt-4 text-lg font-semibold">랜덤 출제</div>
        <form className="m-2 flex w-[250px] justify-between">
          <select className="rounded-lg bg-gray-200 px-1">
            <option value="B5">B5</option>
            <option value="S5">S5</option>
            <option value="G5">G5</option>
            <option value="P5">P5</option>
            <option value="D5">D5</option>
            <option value="R5">R5</option>
          </select>
          <select className="rounded-lg bg-gray-200 px-1">
            <option value="bfs,dfs">bfs,dfs</option>
          </select>
          <select className="rounded-lg bg-gray-200 px-1">
            <option value="1개">1개</option>
            <option value="2개">2개</option>
            <option value="3개">3개</option>
            <option value="4개">4개</option>
            <option value="5개">5개</option>
          </select>
          <button className="rounded-lg bg-gray-800 px-3 py-1 text-sm text-white hover:bg-gray-600">
            등록
          </button>
        </form>
        <div className="m-2 h-[250px] w-[250px] rounded-lg border-2"></div>
        <div className="m-2 flex w-[250px] justify-between">
          <select className="rounded-lg bg-gray-200 px-2 py-1">
            <option value="15분">15분</option>
            <option value="15분">30분</option>
            <option value="15분">45분</option>
            <option value="15분">60분</option>
            <option value="15분">90분</option>
            <option value="15분">120분</option>
            <option value="15분">무제한</option>
          </select>
          <button className="rounded-lg bg-gray-800 px-5 py-1 text-sm text-white hover:bg-gray-600">
            설정 완료
          </button>
        </div>
      </div>
    </>
  );
}
