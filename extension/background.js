chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    if (details.method === 'POST') {
      fetch('http://localhost:3000/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 서버에 현재 제출한 답안의 정보
        body: JSON.stringify(details.responseHeaders.filter((item) => item.name === 'location').value),
      });
    }
  },
  { urls: ['https://www.acmicpc.net/submit/*'] },
  ['responseHeaders'],
);

// 소스 코드가 필요할 때
// chrome.webRequest.onBeforeRequest.addListener(
//   function (details) {
//     if (details.method === "POST") {
//       fetch("http://localhost:3000/test", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(details),
//       });
//     }
//   },
//   { urls: ["https://www.acmicpc.net/submit/*"] },
//   ["requestBody"]
// );
