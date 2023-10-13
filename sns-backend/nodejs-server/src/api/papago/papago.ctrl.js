require('dotenv').config();
const request = require('request');

const client_id = process.env.NAVER_PAPAGO_CLIENT_ID;
const client_secret = process.env.NAVER_PAPAGO_CLIENT_SECRET;

const translateAndDetectLang = (req, res) => {
  const query = req.query.text;

  // 먼저 언어 감지 API를 호출
  const detectApiUrl = 'https://naveropenapi.apigw.ntruss.com/langs/v1/dect';
  const detectOptions = {
    url: detectApiUrl,
    form: { query },
    headers: {
      'X-NCP-APIGW-API-KEY-ID': client_id,
      'X-NCP-APIGW-API-KEY': client_secret,
    },
  };

  request.post(detectOptions, function (detectError, detectResponse, detectBody) {
    if (!detectError && detectResponse.statusCode === 200) {
      const langCode = JSON.parse(detectBody).langCode;

      // 언어 감지 결과를 이용해 번역 API를 호출
      const translateApiUrl = 'https://naveropenapi.apigw.ntruss.com/nmt/v1/translation';

      let targetLanguage = 'en'; // 기본적으로 영어로 설정

      if (langCode === 'ko') {
        targetLanguage = 'en'; // 한국어일 때 영어로 번역
      } else if (langCode === 'en') {
        targetLanguage = 'ko'; // 영어일 때 한국어로 번역
      }

      const translateOptions = {
        url: translateApiUrl,
        form: {
          source: langCode,
          target: targetLanguage,
          text: query,
        },
        headers: {
          'X-NCP-APIGW-API-KEY-ID': client_id,
          'X-NCP-APIGW-API-KEY': client_secret,
        },
      };

      request.post(translateOptions, function (translateError, translateResponse, translateBody) {
        if (!translateError && translateResponse.statusCode === 200) {
          res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
          res.end(translateBody);
        } else {
          res.status(translateResponse.statusCode).end();
          console.log('Translation Error:', translateResponse.statusCode);
        }
      });
    } else {
      res.status(detectResponse.statusCode).end();
      console.log('Language Detection Error:', detectResponse.statusCode);
    }
  });
};

module.exports = { translateAndDetectLang };