require('dotenv').config();
import Chat from '../../schemas/chat';

const request = require('request');

const client_id = process.env.NAVER_PAPAGO_CLIENT_ID;
const client_secret = process.env.NAVER_PAPAGO_CLIENT_SECRET;

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

                const translatedChatLog = await Chat.findByIdAndUpdate(
                  chatLog._id,
                  {
                    $set: {
                      [`translated.${targetLanguage}`]: translatedText,
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
