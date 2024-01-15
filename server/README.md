# 백준룸즈 서버

## Description

백준룸즈를 가동시키는 백엔드 서버입니다.

REST API Swagger 링크: https://api.baekjoonrooms.com/api



## Installation

```bash
npm ci
```

## Running the app

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
- Nginx
- Docker
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
├──  test
│  ├──  app.e2e-spec.ts
│  └──  jest-e2e.json
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
