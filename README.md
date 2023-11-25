# BaekjoonRooms

## 프로젝트 소개

**백준룸즈**는 [LeetRooms](https://leetrooms.com/)에서 영감을 받아 [백준](https://www.acmicpc.net/)에서 동일한 기능을 제공하기 위한 프로젝트입니다.

[LeetRooms](https://leetrooms.com/)는 [LeetCode](https://leetcode.com/)에서 사용하는 익스텐션 입니다.

### LeetRooms 개요

LeetCode를 위한 멀티 플레이어 룸.

리트룸스는 리트코드에 멀티플레이어 룸을 추가합니다. 이 확장 기능은 새로운 리트코드 UI에 또 다른 패널을 추가하여 문제를 푸는 동안 방에 있는 다른 사람들과 채팅할 수 있습니다. 콜라보레이션이나 심지어 경쟁에도 완벽합니다!

### 백준룸즈 기능

#### 백준 사이트를 이용

#### 콘테스트 스타일 멀티플레이어 방 생성

- 백준 사이트에 문제 제출 시 제출 결과 백준룸즈 방에서 확인 기능
- 실시간 채팅 기능
- 실시간 순위 기능

#### 방 설정의 사용자 정의

- 백준 사이트의 문제를 이용

#### 로그인 옵션

---

- 기본적인 서비스는 웹 페이지로 제작
- 익스텐션의 기능 최소화
  - 익스텐션은 단순히 백준 페이지의 제출 버튼을 listen해서 특정 코드 실행
  - 백준룸즈에 로그인이 되지 않으면 익스텐션 기능 비활성화
  - 로그인을 했더라도, 방에 참가하지 않았다면 익스텐션 기능 비활성화

### 백준룸즈 문서

[백준룸즈 위키](https://github.com/boostcampwm2023/web15-BaekjoonRooms/wiki)

## 익스텐션 설치 가이드

```shell
git clone https://github.com/boostcampwm2023/web15-BaekjoonRooms.git
```

- 저장소 클론
- chrome 접속
- `확장프로그램 관리`로 이동
- `개발자 모드`로 전환
- `압축해제된 확장 프로그램을 로드합니다.` 클릭
- `../web15-BaekjoonRooms/extension` 선택

## 기술 스택

### FE

- React
- Vite
- TypeScript
- Tailwind

### BE

- Node.js
- NestJS
- TypeScript
- Socket.io
- MySQL
- TypeORM
- Docker

### EXTENSION

- HTML
- CSS
- JavasCript

## 팀 ETA

<table align=center>
    <thead>
        <tr >
            <th style="text-align:center;" >김기원</th>
            <th style="text-align:center;" >김대현</th>
            <th style="text-align:center;" >노성주</th>
            <th style="text-align:center;" >이성우</th>
            <th style="text-align:center;" >정예찬</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><img width="200" src="https://avatars.githubusercontent.com/u/74997112?v=4" /> </td>
            <td><img width="200" src="https://avatars.githubusercontent.com/u/18080546?s=400&u=504dc96bb5e1946d10056ca91b21bafaf0dce2f3&v=4" /> </td>
            <td><img width="200" src="https://avatars.githubusercontent.com/u/71765155?v=4" /></td>
            <td><img width="200" src="https://avatars.githubusercontent.com/u/97015501?v=4" /></td>
            <td><img width="200" src="https://avatars.githubusercontent.com/u/63452858?v=4" /></td>
        </tr>
        <tr>
            <td style="text-align:center;">FE</td>
            <td style="text-align:center;">BE</td> 
            <td style="text-align:center;">BE</td> 
            <td style="text-align:center;">FE</td> 
            <td style="text-align:center;">FE</td>
        </tr>
        <tr>
            <td style="text-align:center;"><a href="https://github.com/kiuuon">@kiuuon</a></td>
            <td style="text-align:center;"><a href="https://github.com/dqgthb">@dqgthb</a></td>
            <td style="text-align:center;"><a href="https://github.com/sjn0910">@sjn0910</a></td>
            <td style="text-align:center;"><a href="https://github.com/Lukaid-dev">@Lukaid-dev</a></td>
            <td style="text-align:center;"><a href="https://github.com/glowisn">@glowisn</a></td>
        </tr>
        <tr>
            <td width="200">든든한 기초를 바탕으로 같이 일하고 싶은 개발자가 되고싶어요</td>
            <td width="200">건강한 신체에 건강한 코드가 깃든다. 모두가 행복한 체덕지 프로그래밍 화이팅!</td>
            <td width="200">다른 사람과 함께 자라고 싶은 개발자!</td>
            <td width="200">같이 일하고 싶은,<br>일을 잘하는 개발자<br>개발도 잘함</td>
            <td width="200">협업 마스터가 되고 싶은 FE 뉴비</td>
        </tr>
    </tbody>
</table>
