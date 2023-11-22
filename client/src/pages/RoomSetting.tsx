export default function RoomSetting() {
  return (
    <>
      <div className="h-[450px] w-[350px] border-2">
        <div>번호로 출제</div>
        <form>
          <input className="rounded-lg px-2 py-1" />
          <button>등록</button>
        </form>
        <div className="h-[250px] w-[250px] border-2"></div>
        <div>
          <select>
            <option value="15분">15분</option>
            <option value="15분">30분</option>
            <option value="15분">45분</option>
            <option value="15분">60분</option>
            <option value="15분">90분</option>
            <option value="15분">120분</option>
            <option value="15분">무제한</option>
          </select>
          <button>설정 완료</button>
        </div>
      </div>

      <div className="h-[450px] w-[350px] border-2">
        <div>랜덤 출제</div>
        <form>
          <select>
            <option value="브론즈">브론즈</option>
            <option value="실버">실버</option>
            <option value="골드">골드</option>
            <option value="플레티넘">플레티넘</option>
            <option value="다이아">다이아</option>
          </select>
          <select>
            <option value="bfs,dfs">bfs,dfs</option>
          </select>
          <select>
            <option value="1개">1개</option>
            <option value="2개">2개</option>
            <option value="3개">3개</option>
            <option value="4개">4개</option>
            <option value="5개">5개</option>
          </select>
          <button>등록</button>
        </form>
        <div className="h-[250px] w-[250px] border-2"></div>
        <div>
          <select>
            <option value="15분">15분</option>
            <option value="30분">30분</option>
            <option value="45분">45분</option>
            <option value="60분">60분</option>
            <option value="90분">90분</option>
            <option value="120분">120분</option>
            <option value="무제한">무제한</option>
          </select>
          <button>설정 완료</button>
        </div>
      </div>
    </>
  );
}
