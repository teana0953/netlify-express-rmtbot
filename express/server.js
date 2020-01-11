'use strict';

var linebot = require('linebot');

var bot = linebot({
  channelId: '1653758960',
  channelSecret: '57cd2a383c80c1671152b32944c19973',
  channelAccessToken: '6q4bzy5ffvKHQe0xke5Ung3B0y4tlKKN5JvhEOGGcAltxFWE8YPUxyChX+6bt+9H7pLKTEuwCYqoyocO8UeY6lpE17090poMHWVnRDkep8b2tGlT+qbBhHnMgZFcFYTSToqlCzUh8EBw1faJ4dHVnwdB04t89/1O/w1cDnyilFU='
});

//這一段的程式是專門處理當有人傳送文字訊息給LineBot時，我們的處理回應
bot.on('message', function (event) {
  if (event.message.type = 'text') {
    var msg = event.message.text;
    //收到文字訊息時，直接把收到的訊息傳回去
    event.reply(msg).then(function (data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(msg);
    }).catch(function (error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：' + error);
    });
  }
});

const linebotParser = bot.parser();
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!TEST!!!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => {
  console.log('test!!!!');
  return res.json({ postBody: req.body });
});
router.post('/linewebhook', linebotParser);

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
