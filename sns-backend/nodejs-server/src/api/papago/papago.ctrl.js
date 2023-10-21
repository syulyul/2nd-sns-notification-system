require('dotenv').config();
import Chat from '../../schemas/chat';
import request from 'request';
import fs from 'fs';
import crypto from 'crypto';

const client_id = process.env.NAVER_PAPAGO_CLIENT_ID;
const client_secret = process.env.NAVER_PAPAGO_CLIENT_SECRET;
const clova_client_id = process.env.NCP_CLOVA_CLIENT_ID;
const clova_client_secret = process.env.NCP_CLOVA_CLIENT_SECRET;

export const translateAndDetectLang = async (data) => {
  const chatLog = data.body.chatLog;
  const { chat } = chatLog; // 번역할 텍스트
  // const query = await Chat.findOne({ chat: req.params.chat});

  // 먼저 언어 감지 API를 호출
  const detectApiUrl = 'https://naveropenapi.apigw.ntruss.com/langs/v1/dect';
  const detectOptions = {
    url: detectApiUrl,
    form: { query: chat },
    headers: {
      'X-NCP-APIGW-API-KEY-ID': client_id,
      'X-NCP-APIGW-API-KEY': client_secret,
    },
  };

  request.post(
    detectOptions,
    async function (detectError, detectResponse, detectBody) {
      if (!detectError && detectResponse.statusCode === 200) {
        const langCode = JSON.parse(detectBody).langCode;

        // 언어 감지 결과를 이용해 번역 API를 호출
        const translateApiUrl =
          'https://naveropenapi.apigw.ntruss.com/nmt/v1/translation';

        let targetLanguage = data.body.targetLanguage;

        const translateOptions = {
          url: translateApiUrl,
          form: {
            source: langCode,
            target: targetLanguage,
            text: chat,
          },
          headers: {
            'X-NCP-APIGW-API-KEY-ID': client_id,
            'X-NCP-APIGW-API-KEY': client_secret,
          },
        };

        let isTranslated = false;
        // 불필요한 번역 요청 방지를 위해 검증 로직 추가 필요
        // const findChatLog = await Chat.findById(chatLog._id);
        // if () {
        //   isTranslated = true;
        // }

        if (isTranslated || langCode === targetLanguage) {
          console.log('이미 번역된 언어');
          data.ioOfChat.to(chatLog.room).emit('translateChat', {
            translatedChatLog: '이미 번역된 언어',
          });
        } else {
          request.post(
            translateOptions,
            async function (translateError, translateResponse, translateBody) {
              if (!translateError && translateResponse.statusCode === 200) {
                const translatedText =
                  JSON.parse(translateBody).message.result.translatedText;

                const voiceFilePath = clovaVoiceAPI({
                  language: targetLanguage,
                  text: translatedText,
                });

                const translatedChatLog = await Chat.findByIdAndUpdate(
                  chatLog._id,
                  {
                    $set: {
                      [`translated.${targetLanguage}`]: translatedText,
                      [`translated.${targetLanguage}-voice`]: voiceFilePath,
                    },
                  },
                  { new: true }
                ).populate('user');

                // 번역이 완료되면 Socket.io를 사용하여 클라이언트에게 결과를 전송
                data.ioOfChat.to(chatLog.room).emit('translateChat', {
                  translatedChatLog,
                });
              } else {
                console.log('Translation Error:', translateResponse.statusCode);
              }
            }
          );
        }
      } else {
        console.log('Language Detection Error:', detectResponse.statusCode);
      }
    }
  );
};

const clovaVoiceAPI = ({ language, text }) => {
  const api_url = 'https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts';
  let speaker;
  switch (language) {
    case 'ko':
      speaker = 'nara';
      break;
    case 'en':
      speaker = 'danna';
      break;
    case 'zh-CN':
      speaker = 'meimei';
      break;
    case 'ja':
      speaker = 'nnaomi';
      break;
    case 'zh-TW':
      speaker = 'chiahua';
      break;
    case 'es':
      speaker = 'carmen';
      break;
    default:
      console.log('지원하지 않는 언어입니다');
      return;
  }
  const options = {
    url: api_url,
    form: {
      speaker: speaker,
      volume: '0',
      speed: '0',
      pitch: '0',
      text: text,
      format: 'mp3',
    },
    headers: {
      'X-NCP-APIGW-API-KEY-ID': clova_client_id,
      'X-NCP-APIGW-API-KEY': clova_client_secret,
    },
  };

  const filePath = `clova/${crypto
    .createHash('sha512')
    .update(text)
    .digest('hex')}.mp3`;
  fs.open(filePath, 'r', function (err, file) {
    if (err) {
      // 파일이 없다면
      const writeStream = fs.createWriteStream(filePath);
      const _req = request.post(options).on('response', function (response) {
        console.log(response.statusCode); // 200
        console.log(response.headers['content-type']);
      });
      _req.pipe(writeStream); // file로 출력
      console.log('voice 파일 생성!');
    } else {
      console.log('Saved!');
    }
  });
  // _req.pipe(res); // 브라우저로 출력

  return filePath;
};
