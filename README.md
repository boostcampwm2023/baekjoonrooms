# BaekjoonRooms

## 프로젝트 소개

**백준룸즈**는 [LeetRooms](https://leetrooms.com/)에서 영감을 받아 [백준](https://www.acmicpc.net/)에서 동일한 기능을 제공하기 위한 프로젝트입니다.

- [LeetRooms](https://leetrooms.com/)는 [LeetCode](https://leetcode.com/)에 멀티플레이어 방을 추가하는 플랫폼입니다.
- [LeetRooms Github](https://github.com/marwanhawari/LeetRooms)

### 백준룸즈 기능

- 콘테스트 스타일 멀티플레이어 방 생성
- 실시간 채팅 기능
- 방 설정의 사용자 정의
- 로그인 옵션

<br>

## 깃 컨벤션

### 브랜치 전략

#### **Git Flow** 전략 사용

<img src="https://github.com/boostcampwm2023/web15-BaekjoonRooms/assets/63452858/ba0ef194-74a0-400b-bbc2-2d9cce1efe3a" alt="git-flow-diagram" width="550px" />

> 출처: https://blog.kinto-technologies.com/posts/2023-03-07-From-Git-flow-to-GitHub-flow/

#### 사용할 브랜치

- release
- develop
- feat
- hotfix

##### feat 브랜치 네이밍

    - 영어 소문자, 하이픈 띄어쓰기(kebab-case)
    - 예시 : `feat/new-feature-name, feat/hello-controller/get`

<br>

### 커밋 컨벤션

- Type

  - `test` — 테스트 코트, 리펙토링 테스트 코드 추가
  - `feat` — 기능 추가 및 수정
  - `fix` — 버그 수정
  - `chore` — 빌드 관련
  - `docs` — 문서 변경
  - `refactor` — 코드 리펙토링
  - `style` — 코드 포맷팅, 세미콜론 누락, 주석 작성 등 코드 변경이 없는 경우

- 커밋 메시지와 바디는 한글로 적어요.
- 커밋 예시 <br>

  ```
  feat: Github 로그인 기능 추가

  Github OAuth 로그인 구현
  ```

- commitizen이라는 것도 한번 살펴보세요.

<br>

### 이슈 컨벤션

```markdown
---
name: Feat
about: 프로젝트 개발 기능 이슈
title: "Feat"
labels: "✨ Feat"
---

## 💎 개발할 기능

<!-- 어떤 기능을 구현할지 알려주세요. -->

- [ ] feat-1

## 📖 참고 사항

<!-- 레퍼런스, 스크린샷 등을 넣어 주세요. -->
```

<br>

### PR 컨벤션

~~비공식: commit 메세지들을 모아서 chatgpt에 넣기~~

- PR 템플릿에 맞춰서 작성해요.
- PR 제목은 `브랜치명 : PR에 대한 간단한 요약`으로 작성해요.
- 리뷰이는 리뷰어를 배려해 최대한 자세히 상세히 열심히 작성해요.

```markdown
<!-- Review the checklist below before submitting -->

## Checklist

- [ ] **Code Review:** 작성한 코드를 다시 한 번 꼼꼼이 확인했나요?
- [ ] **Testing:** 앱이 잘 구동되는지 개발한 기능이 문제 없이 작동하는지 확인했나요?
- [ ] **Remove:** print나 주석 등 필요없는 코드를 삭제했나요?
- [ ] **Rebase:** (필요시) rebase를 완료했나요?
- [ ] **Conflict Resolution:** 충돌을 해결하는 과정을 거쳤나요?
- [ ] **New Dependencies:** 새로운 dependency를 추가했나요?

<!-- Please include a summary of the change and which issue is fixed. Please also include relevant motivation and context -->

## Description

<!-- List core changes that were made in this pull request -->

## Changes Made

<!-- Concerns, etc. -->

## Extra Comments

<!-- If applicable, add screenshots to help explain your changes -->

## Demo
```

```markdown
AFAIK - “As Far As I Know”
내가 아는 한.

FYI - “For Your Information”
참고로 라는 뜻. 웹상에서 마음에 드는 기사 나 뉴스가 보일때 , FYI라는 말과 함께 링크 URL을 보낼 때 등에 자주 사용된다.

IMO (IMHO) - “In My (Humble) Opinion”
개인적인 의견 입니다만, 내 소견이지만. (humble 이 들어가면 조금 겸손한 느낌)

**LGTM** - “Looks Good To Me”
okay, 개발 한 시스템과 코드 리뷰를 부탁하거나, 자료의 요약을 확인 갔을 때 특별한 문제가없는 경우에 사용함.

**TBD** - “To Be Determined”
결정되지 않은 부분에 “나중에 결정할 것”이라고 말했다 뉘앙스.

TL;DR. - “Too Long. Didn’t Read”
장문의 시작 부분에 “장문이므로 요약 올립니다”라는 느낌으로 사용.

WFM - “Works For Me”
나에게 좋다는 의미로 사용. 시스템의 프로토 타입을 만들어 테스트 할 때, 자신의 환경에서 잘 움직일 때, 또는 의견 조정시에 나에게 고마운
```

<br>

### 코드 리뷰 및 머지 컨벤션

- 코드 리뷰 시에는 칭찬할 점을 꼭 하나 이상 찾아주세요.
- 코어 타임 이내에 올라온 PR은 최대한 빠르게 리뷰를 해주어요.
- 코어 타임 이후에 올라온 PR은 데일리 스크럼이 끝난 직후 리뷰를 해주어요.
- 다른 분야의 PR이라도 간단하게나마 읽어보는 것을 권장해요.

<br>

- 모든 PR은 각 분야의 모든 동료들의 approve를 받아야 Merge할 수 있어요.
- merge 방식같은 경우, 기본적으로 merge로 하고 로컬에서는 때때로 편하게 rebase해요.
- 본인의 PR은 스스로 Merge해요.
- Merge 독촉은 웰컴!

<br>

## 그라운드 룰

### 팀 규칙

- 우리의 코어타임은 10시부터 19시에요.
- 최대한 부드럽게 말하도록 노력해요.
- 일주일에 한번은 같이 밥을 먹어요.
- 매주 목요일 14시마다 오프라인 미팅을 해요.
- 자신의 코드뿐만 아니라 팀원 모두의 진행 상황에도 관심을 가져요.
- 코어 타임 내에서 쉰다고 알려주면 존중해주어요. 저희는 팀원 개개인의 자율성과 적극성을 믿어요.

### 의견 충돌 시

- 의견 충돌 시 최대한 서로의 의견을 납득할 수 있을 때까지 끝장토론해요.
- 하지만 의견 충돌이 30분을 넘어가면, 팀원 중 한명이 다음에 이야기 하자는 제안을 할 수 있어요.
- 기계적인 절차보다는 실무적인 관점에서 접근하는 것이 좋을 수 있어요.

### 협업 관리

- 함께 회의를 하거나 다함께 기록을 해야할 경우에는 공동 편집이 가능한 툴을 사용해요. ex) notion, live share, hackmd, Excalidraw 등
- Github Issue를 일종의 백로그로 사용해요.
- 업무 관리를 위해 Github Issue와 연동한 Github Project의 주로 사용해요. 칸반보드 뷰를 통해서는 진행 상황 관리를 할 수 있어요.
- PR을 작성할 때 관련한 issue를 연결하고 해당 PR이 merge되면 자동으로 issue가 닫혀요.
- 데일리 스크럼, 팀 회고록, 멘토링 일지, 피어세션, 기획,구조도, 핵심 기능 별 flow chart, API 문서 등 대부분의 기록은 모두 Github Wiki에 정리해요.
- notion에 작성했던 회의록도 어느정도 갈무리해서 Wiki에 이관해요.

### 데일리 스크럼 방식

- 우리의 데일리 스크럼 시간은 `오전 10시`예요.
- 데일리 스크럼을 시작할 때는 팀원의 컨디션에 관심을 가져주어요.
- 데일리 스크럼은 간단하게 끝내도록 해요.

### 회고 진행 방식

- 추후 작성

<br>

## 팀 ETA 소개

### 팀원소개

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
         <tr>
            <td style="text-align:center;">ISTP</td>
            <td style="text-align:center;">INTP</td> 
            <td style="text-align:center;">ISTP</td> 
            <td style="text-align:center;">INTJ</td> 
            <td style="text-align:center;">INTJ</td>
        </tr>
    </tbody>
</table>

### 마스터 제도

- 일주일마다 하나씩 자기가 원하는 역할을 고를 수 있어요. ~~전관 예우~~
- 항상 마스터에게 감사한 마음을 가지고 "내가 해도 저거보단 잘하겠다"와 같은 생각을 갖지 않아요. ~~그럴 거면 니가 해라~~

`칸반 마스터` : 이슈, 백로그 관리  
`깃 마스터` : 깃 꼬인 거 풀어주기, 깃 질문 받기, 멘토, **깃 그래프 생김새 관리**  
`위키 마스터 `: 회의 내용 주로 기록 및 위키에 이관  
`진행 마스터` : 회의 내용 준비 및 진행  
`코인 & 고메 마스터` : 지각자 정산, 카페와 식당 알아보기, 식당 정산
