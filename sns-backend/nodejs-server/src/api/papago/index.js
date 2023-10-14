import express from 'express';
import * as papaCtrl from './papago.ctrl';

const papago = express.Router();

// 언어 감지 후 번역 엔드포인트
papago.get('papago/translateAndDetectLang', papaCtrl.translateAndDetectLang);

export default papago;