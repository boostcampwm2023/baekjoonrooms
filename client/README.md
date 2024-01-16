# BaekjoonRooms Client

<br/>

<p align="center">
<img width=30% height=auto src="https://github.com/boostcampwm2023/web15-BaekjoonRooms/assets/74997112/d154ee99-e3e7-4e11-8252-b6220387e9eb" alt="백준룸즈 기본 아이콘"/>
<img width=30% height=auto src="https://github.com/boostcampwm2023/web15-BaekjoonRooms/assets/74997112/6d8c7a08-b87d-48af-855c-02f309a019c8" alt="백준룸즈 다크 아이콘"/>
</p>

<br/>

## dependencies

<br/>

- react
- react-router-dom
- axios
- typescript
- tailwindcss
- @tanstack/react-query

<br/>

## vite 사용 이유

<br/>

프론트 개발자 전원이 이전의 프론트 개발 프로젝트 경험이 없었습니다. 따라서, webpack, parcel 등의 번들러를 학습하고 사용하는 것 보다, react와 tailwindcss등을 학습하여 프로젝트의 비즈니스 코드에 집중하는 것이 더 중요하다고 판단하였습니다. 이에, 빠르게 프로젝트에 적응하고, 프로젝트를 진행할 수 있도록, `vite`를 사용하였습니다.

`vite`는 `webpack`과 같은 번들러가 아닌, `esbuild`를 사용하여 빌드를 진행합니다. 이는, JavaScript기반의 번들러보다 수십배 더 빠른 속도로 종속성을 사전에 번들링하고, 빌드를 진행합니다. 또한, `vite`는 `hot-reload`를 지원합니다. 따라서 빠른 개발 속도를 유지하면서, 프로젝트를 진행할 수 있었습니다.

<br/>

## directory 구조

<br/>

```
📦 src
 ┣ 📂 apis
 ┣ 📂 assets
 ┣ 📂 components
 ┃ ┣ 📂 Intro
 ┃ ┣ 📂 Lobby
 ┃ ┣ 📂 Room
 ┃ ┗ 📂 buttons
 ┣ 📂 contexts
 ┣ 📂 hooks
 ┣ 📂pages
 ┃ ┣ 📜Home.tsx
 ┃ ┣ 📜Intro.tsx
 ┃ ┣ 📜Lobby.tsx
 ┃ ┣ 📜Room.tsx
 ┃ ┗ 📜UserBasedRoute.tsx
 ┣ 📂 types
 ┣ 📂 utils
 ┣ 📜 App.tsx
 ┣ 📜 index.css
 ┣ 📜 main.tsx
 ┗ 📜 routes.tsx
```

<br/>

## Routes

<br/>

### Entry Point

<br/>

- `routes.tsx` : `react-router-dom`의 `createBrowserRouter`를 통해 router 생성
- `main.tsx` : `react-router-dom`의 `RouterProvider`의 `router` prop에 `routes.tsx`의 router를 전달, 이를 통해 root component인 `App.tsx`를 렌더링
- `app.tsx` : `react-router-dom`의 `Outlet`을 통해 `routes.tsx`에서 정의한 root router의 children을 렌더링

<br/>

```ts
// main.tsx
ReactDOM.createRoot(
  document.getElementById('root')!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
);
```

```ts
// routes.tsx
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: (
          <UserBasedRoute>
            <Home />
          </UserBasedRoute>
        ),
      },
      {
        path: '/lobby',
        element: (
          <UserBasedRoute>
            <Lobby />
          </UserBasedRoute>
        ),
      },
      ...
    ],
  },
]);
```

```ts
// App.tsx
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalStorageProvider>
        <ThemeProvider>
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        </ThemeProvider>
      </LocalStorageProvider>
    </QueryClientProvider>
  );
}
```

<br/>

### routes

<br/>

- `/` and `/home` : 로그인 페이지, 로그인 여부에 따라 `/home` 또는 `/lobby`로 이동
- `/lobby` : 로비 페이지, 해당 페이지에서 코드로 방에 접속하거나, 방을 생성 할 수 있음. 추가적으로, 서비스의 테마를 변경 할 수 있음.
- `/room/:roomId` : 서비스의 가장 메인이 되는 **멀티 플레이어 룸.** 해당 페이지에서, 문제를 제출하거나 제출된 문제를 확인하고, 제한시간 안에 문제를 풀면서 자유롭게 채팅을 통해 플레이어들과 소통 할 수 있음. 또한, 제출된 문제의 난이도와 순서에 따라 랭킹이 매겨지고, 이를 확인 할 수 있음.
- `/intro` : 서비스의 소개 페이지. 익스텐션으로 진입하는 경우가 아니면 해당 링크로 안내하고 있음. 해당 페이지에서는 서비스의 소개와, 서비스를 이용하는 방법을 안내하고 있으며, 익스텐션의 설치 링크를 제공하고 있음.

<br/>

## Contexts

<br/>

서비스 전역에서 필요한 상태를 관리하기 위해, `react`의 `Context API`를 사용하여 `Context`를 구현하였습니다. `Context`는 `Provider`와 `Consumer`로 구성되어 있으며, `Provider`는 `value` prop을 통해 `Context`의 상태를 전달하고, `Consumer`는 `Context`의 상태를 사용하기 위해 `useContext` hook을 통해 `Context`의 상태를 가져옵니다.

<br/>

### AuthProvider

<br/>

- `AuthProvider`는 `Context`를 통해 로그인 여부를 관리합니다. `AuthProvider`는 `getSession`메서드로 페이지가 렌더 될 때마다 로그인 여부를 확인합니다. 이는, 탭 전환이 빈번한 서비스의 특성상 유저가 실수로 현재 진행중인 방의 탭을 닫았을 경우, 다시 서비스로 접속했을때, 서버에서 상태를 받아오고 해당 상태에 맞는 페이지로 이동하기 위함입니다. 이를 통해, 유저가 실수로 탭을 닫았을 경우, 다시 서비스로 접속했을 때, 현재 진행중인 방으로 이동하게 됩니다. 이동 로직은 `UserBasedRoute`에서 구현되어 있습니다.

<br/>

### ThemeProvider

<br/>

- `ThemeProvider`는 `Context`를 통해 서비스의 테마를 관리합니다. `ThemeProvider`는 `useLocalStorage` hook을 통해 로컬 스토리지에 저장된 테마를 가져옵니다. 이를 통해, 유저가 서비스의 테마를 변경하고, 서비스를 종료하고 다시 접속했을 때, 유저가 변경한 테마를 유지할 수 있습니다.

<br/>

### LocalStorageProvider

<br/>

- `LocalStorageProvider`는 `Context`를 통해 로컬 스토리지에 저장된 유저의 정보를 관리합니다. 서비스에서 자주 사용되는 로컬 스토리지 관련 로직들을 정리해두었습니다.

<br/>

### RoomProvider

<br/>

- `RoomProvider`는 `Context`를 통해 현재 진행중인 방의 정보를 관리합니다. 서비스에서 가장 핵심이 되는 기능을 담당합니다. 이는 전역 상태가 아닌, `room` 페이지의 상태를 관리합니다.
- `socket.io`를 활용하여 서버와 연결 및 통신하여, 룸정보, 시작 정보, 문제 정보, 채팅 등을 받아옵니다.
