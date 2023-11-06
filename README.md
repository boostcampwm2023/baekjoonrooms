# BaekjoonRooms

## 프로젝트 소개

**백준룸즈**는 [LeetRooms](https://leetrooms.com/)에서 영감을 받아 [백준](https://www.acmicpc.net/)에서 동일한 기능을 제공하기 위한 프로젝트입니다.

\*[LeetRooms](https://leetrooms.com/)는 [LeetCode](https://leetcode.com/)에 멀티플레이어 방을 추가하는 플랫폼입니다.
[LeetRooms Github](https://github.com/marwanhawari/LeetRooms)

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

생략

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
- 모든 PR은 각 분야의 모든 동료들의 approve를 받아야 머지할 수 있어요.
- 다른 분야의 PR이라도 간단하게나마 읽어보는 것을 권장해요.
- 본인의 PR은 스스로 머지해요.
- Merge 독촉은 웰컴!

<br>

## 그라운드 룰

### 팀 규칙

- 매주 목요일 14시마다 오프라인 미팅을 해요.
- 일주일에 한번은 같이 밥을 먹어요.
- 코어 타임 내에서 쉰다고 알려주면 존중해주어요. 저희는 팀원 개개인의 자율성과 적극성을 믿어요.
- 최대한 부드럽게 말하도록 노력해요.
- 자신의 코드뿐만 아니라 팀원 모두의 진행 상황에도 관심을 가져요.

### 주간 일정

제가 나중에 넣을께요

### 협업 관리

- 같이 무언가를 기록할 일이 있으면 notion과 live share, hackmd를 통해서 기록해요.
- 업무 관리는 무엇으로 하나요
- 기록 관리는 어떻게 무엇을 할까요, 칸반 차트를 어디서 쓸까요
- 데일리 스크럼, 스프린트 회의록, 기타 짜잘한 회의록, 팀 회고록, 멘토링 일지, 피어세션?
- 기획 및 디자인 피그마, 아키텍쳐 구조도, 핵심 기능 별 flow chart, API 문서, 백로그

### 의견 충돌 시

- 의견 충돌 시 어떻게 해결할까요
- 기계적인 절차보다는 실무적인 관점에서 행동 규범, 1주일 해보고 개선

### 데일리 스크럼 방식

- 우리의 데일리 스크럼 시간은 `오전 10시`예요.
- 데일리 스크럼은 간단하게 끝내도록 해요.
- 생략

### 회고 진행 방식

- 생략

## 팀원 소개

팀 이름: ETA

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
            <td><img width="200" src="" /> </td>
            <td><img width="200" src="" /></td>
            <td><img width="200" src="" /></td>
            <td><img width="200" src="https://avatars.githubusercontent.com/u/97015501?v=4" /></td>
            <td><img width="200" src="" /></td>
        </tr>
        <tr>
            <td><a href=""></a></td>
            <td><a href=""></a></td>
            <td><a href=""></a></td>
            <td><a href="https://github.com/Lukaid-dev">@Lukaid-dev</a></td>
            <td><a href=""></a></td>
        </tr>
        <tr>
            <td width="200"></td>
            <td width="200"></td>
            <td width="200"></td>
            <td width="200">같이 일하고 싶은,<br>일을 잘하는 개발자<br>개발도 잘함</td>
            <td width="200"></td>
        </tr>
    </tbody>
</table>
