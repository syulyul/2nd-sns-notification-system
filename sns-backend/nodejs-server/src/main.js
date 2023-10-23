require('dotenv').config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import api from './api';
import mongodbConnect from './schemas';
import redisConnect from './redis';
import webSocket from './socket';
import http from 'http';
import https from 'https';
import fs from 'fs';

const {
  PORT,
  NODE_ENV,
  COOKIE_SECRET,
  REACT_SERVER_URL,
  SPRING_SERVER_URL,
  BUILD_DIRECTORY,
} = process.env;

const HTTP_PORT = 80;
// const HTTPS_PORT = PORT || 443;
const HTTPS_PORT = PORT || 3001;


const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/bitsns.site/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/bitsns.site/fullchain.pem')
};

// app.set('port', PORT);


const app = express();

mongodbConnect();
redisConnect();

if (NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

const corsOptions = {
  origin: [REACT_SERVER_URL, SPRING_SERVER_URL],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

const buildDirectory = path.resolve(__dirname, BUILD_DIRECTORY);
app.use('/', express.static(buildDirectory));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(COOKIE_SECRET));

app.use('/node', api);

// 여기에 /test 엔드포인트를 추가합니다.
app.get('/test', (req, res) => {
  console.log("GET request received for /test");
  res.status(200).send("통신 성공!");
});


app.use('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, BUILD_DIRECTORY + '/index.html'));
});

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
});

// HTTP 서버 생성
http.createServer(app).listen(HTTP_PORT, () => {
  console.log(`HTTP Server listening on port ${HTTP_PORT}`);
});

// HTTPS 서버 생성
const server = https.createServer(options, app).listen(HTTPS_PORT, () => {
  console.log(`HTTPS Server listening on port ${HTTPS_PORT}`);
});

webSocket(server, app);