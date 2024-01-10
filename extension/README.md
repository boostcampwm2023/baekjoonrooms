# BaekjoonRooms Extension

## Features

- 백준룸즈 사이트에서 방에 참가 시 익스텐션 활성화
- 백준룸즈 사이트에서 방에 참가 중이고 익스텐션이 활성 되었을 때  
  백준 사이트에서 문제 제출 시 제출 결과 페이지의 url을 백준룸즈 서버에 전송

## Installation

[여기](https://chromewebstore.google.com/detail/baekjoonrooms/fndogmcoaeenjcihljbahpdlfinkepeh)를 눌러 크롬 익스텐션 다운로드.

## directory 구조

```
📦 extension
 ┣ 📂 icons
 ┣ 📂 images
 ┣ 📂 popup
 ┃ ┣ 📜 popup.css
 ┃ ┣ 📜 popup.html
 ┃ ┗ 📜 popup.js
 ┣ 📂 scripts
 ┃ ┗ 📜 content.js
 ┣ 📜 backgorund.js
 ┗ 📜 manifest.json
```

## Chrome API

### webRequest API

> chrome.webRequest API를 사용하여 트래픽을 관찰 및 분석하고 in-flight 요청을 가로채거나 차단하거나 수정할 수 있습니다.

- 백준 사이트의 제출 요청을 가로채 정보를 얻기 위해 사용
- 백준 사이트에서 제출 시 수신되는 HTTP 응답 헤더에 제출 결과 페이지의 url 정보가 있어 이를 얻기 위해 사용

### storage API

> Storage API는 사용자 데이터와 상태를 유지하는 확장 프로그램별 방법을 제공합니다.  
> 이는 웹 플랫폼의 스토리지 API (IndexedDB 및 Storage)와 유사하지만 확장 프로그램의 스토리지 요구사항을 충족하도록 설계되었습니다.

- background 파일에서 관리하는 전연 변수를 저장해 두기 위해 사용
- backgorund 파일을 실행시키는 서비스 워커는 시간이 지나면 비활성화가 되기 때문에  
  전역 변수를 저장해 두지 않으면 변수가 초기화 되는 현상을 해결하기 위해 사용
