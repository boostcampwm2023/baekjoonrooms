# 백준룸즈 서버

<p align="center">
<img width=30% height=auto src="https://github.com/boostcampwm2023/web15-BaekjoonRooms/assets/74997112/d154ee99-e3e7-4e11-8252-b6220387e9eb" alt="백준룸즈 기본 아이콘"/>
<img width=30% height=auto src="https://github.com/boostcampwm2023/web15-BaekjoonRooms/assets/74997112/6d8c7a08-b87d-48af-855c-02f309a019c8" alt="백준룸즈 다크 아이콘"/>
</p>

## 프로젝트 요약

백준룸즈를 가동시키는 백엔드 서버입니다.

REST API Swagger 링크 (작성 중): https://api.baekjoonrooms.com/api

## Domain에 대한 설명

### Auth

사용자 인증을 처리하는 부분입니다. Passport.js를 통한 자격 증명, 세션 관리, 깃헙 OAuth2 연동 등을 담당합니다.

### User

사용자와 관련된 모든 정보를 관리합니다. 사용자 이름, 깃허브 닉네임, 이메일 등을 저장합니다.

### Problem

이 도메인은 문제와 관련된 기능을 담당합니다. 백준룸즈 서비스에서 제공되는 다양한 백준 문제들의 정보, 태그, 난이도 등을 관리할 수 있습니다.

### Room

방 도메인은 사용자들이 상호작용하는 가상의 공간을 관리합니다. 사용자는 방을 만들거나 방에 참가할 수 있으며, 각 방에서 방장은 여러 문제들을 출제할 수 있습니다.

### Submission

사용자가 문제를 해결하고 그 해답을 제출하는 과정을 관리합니다.

### Socket

사용자 간의 실시간 대화, 참가 상태 업데이트, 실시간 문제 제출 내역, '맞았습니다' or '틀렸습니다' 알림 등을 처리합니다.

## Installation & Running

MySQL을 설치한 뒤 
서버 루트 경로에 .env 파일을 추가하고

```
DB_HOSTNAME=???
DB_USERNAME=???
DB_PASSWORD=???
DB_NAME=???

MYSQL_DATABASE=???
MYSQL_USER=???
MYSQL_PASSWORD=???
MYSQL_ROOT_PASSWORD=???

GITHUB_CLIENT_ID=???
GITHUB_CLIENT_SECRET=???
GITHUB_CALLBACK_URL=http://localhost:4000/auth/github/callback

CLIENT_URL=http://localhost:5173
SERVER_URL=http://localhost:4000

SESSION_SECRET=???
```

위 내용에 ???를 보완해야 합니다.

그 이후는 일반적인 NestJS 설치 및 실행 방법과 동일합니다.

```bash
npm ci
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 기술 스택

<div align=center>
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white">
  <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white">
  </div>

- Node.js
- NestJS
- TypeScript
- MySQL
- TypeORM
- Socket.io
  - 실시간 채팅 + 제출 알림
- Nginx
  - 리버스 프록시 + HTTPS 설정
- Docker
  - 배포
- Naver Cloud Platform

## Directory Structure

```
 .
├──  src
│  ├──  auth
│  │  ├──  dto
│  │  │  ├──  create-auth.dto.ts
│  │  │  └──  update-auth.dto.ts
│  │  ├──  auth.controller.spec.ts
│  │  ├──  auth.controller.ts
│  │  ├──  auth.guard.ts
│  │  ├──  auth.module.ts
│  │  ├──  auth.serializer.ts
│  │  ├──  auth.service.ts
│  │  └──  auth.strategy.ts
│  ├──  const
│  │  └──  boj-results.ts
│  ├──  entities
│  │  ├──  problem.entity.ts
│  │  ├──  room.entity.ts
│  │  ├──  submission.entity.ts
│  │  ├──  tag.entity.ts
│  │  └──  user.entity.ts
│  ├──  exceptions
│  │  ├──  exceptions.controller.spec.ts
│  │  ├──  exceptions.controller.ts
│  │  └──  exceptions.filter.ts
│  ├──  problem
│  │  ├──  dto
│  │  │  ├──  random.problem.dto.ts
│  │  │  └──  search.problem.dto.ts
│  │  ├──  problem.controller.ts
│  │  ├──  problem.module.ts
│  │  └──  problem.service.ts
│  ├──  room
│  │  ├──  room.controller.ts
│  │  ├──  room.module.ts
│  │  └──  room.service.ts
│  ├──  room-user
│  │  ├──  room-user.entity.ts
│  │  ├──  room-user.module.ts
│  │  ├──  room-user.service.spec.ts
│  │  └──  room-user.service.ts
│  ├──  short-logger
│  │  └──  short-logger.service.ts
│  ├──  socket
│  │  ├──  socket.adapter.ts
│  │  ├──  socket.filter.spec.ts
│  │  ├──  socket.filter.ts
│  │  ├──  socket.gateway.ts
│  │  ├──  socket.module.ts
│  │  └──  socket.service.ts
│  ├──  submission
│  │  ├──  dto
│  │  │  ├──  roomSubmission.dto.ts
│  │  │  └──  submission.dto.ts
│  │  ├──  submission.controller.ts
│  │  ├──  submission.module.ts
│  │  └──  submission.service.ts
│  ├──  types
│  │  ├──  auth-profiles.ts
│  │  ├──  message-interface.ts
│  │  ├──  problem-type.ts
│  │  ├──  room-info.ts
│  │  ├──  room-user-input.ts
│  │  ├──  submission.ts
│  │  ├──  user-session.ts
│  │  └──  user.ts
│  ├──  user
│  │  ├──  dto
│  │  │  └──  create.user.dto.ts
│  │  ├──  user.controller.spec.ts
│  │  ├──  user.controller.ts
│  │  ├──  user.module.ts
│  │  ├──  user.service.spec.ts
│  │  └──  user.service.ts
│  ├──  app.controller.spec.ts
│  ├──  app.controller.ts
│  ├──  app.module.ts
│  ├──  app.service.ts
│  └──  main.ts
├──  .dockerignore
├──  .env
├──  .eslintrc.js
├──  .gitignore
├──  .prettierignore
├──  .prettierrc
├──  Dockerfile
├──  nest-cli.json
├──  package-lock.json
├──  package.json
├──  README.md
├──  tsconfig.build.json
└──  tsconfig.json
```
