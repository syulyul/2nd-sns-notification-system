require('dotenv').config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import api from './api';
import mongodbConnect from './schemas';

const { PORT, NODE_ENV, COOKIE_SECRET } = process.env;

const app = express();
app.set('port', PORT);
mongodbConnect();

if (NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(
  '/',
  express.static(
    path.join(__dirname, '../../../sns-frontend/react-server/build')
  )
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use('/node', api);

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

const server = app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
