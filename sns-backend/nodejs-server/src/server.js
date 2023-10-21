// 필요한 모듈들을 가져옵니다.
const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');

// HTTP와 HTTPS 서버가 사용할 포트를 정의합니다.
const HTTP_PORT = 80;
const HTTPS_PORT = 443;

// Let's Encrypt에서 발급받은 인증서와 키 파일의 경로를 지정합니다.
// bitsns.site 도메인을 위한 인증서와 키를 사용합니다.
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/bitsns.site/privkey.pem'), // 비밀 키 파일
  cert: fs.readFileSync('/etc/letsencrypt/live/bitsns.site/fullchain.pem') // 인증서 파일
};

// Express 앱을 초기화합니다.
const app = express();

// 기본 라우트를 설정합니다. 서버의 상태를 나타내는 메시지를 반환합니다.
app.get('/', (req, res) => {
  res.json({ message: `Server is running on port ${req.secure ? HTTPS_PORT : HTTP_PORT}` });
});

// HTTP 서버를 생성하고, 설정된 포트(HTTP_PORT)에서 실행합니다.
http.createServer(app).listen(HTTP_PORT);

// HTTPS 서버를 생성하고, 설정된 포트(HTTPS_PORT)에서 실행합니다.
https.createServer(options, app).listen(HTTPS_PORT);
