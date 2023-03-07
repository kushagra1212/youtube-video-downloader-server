const express = require('express');
const router = express.Router();
const ytdl = require('ytdl-core');
const fs = require('fs');
const ytsr = require('../ytsr');

let body;

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

router.post('/download', (req, res) => {
  body = req.body.body;

  res.json({ message: 'Downloading video' });
});
router.get('/download2', async (req, res) => {
  const { videoquality, videourl } = body;
  console.log(videourl);

  const videoid = ytdl.getVideoID(videourl);

  const info = await ytdl.getInfo(videoid);

  if (info) {
    const format = ytdl.chooseFormat(info.formats, { quality: videoquality });

    res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');
    res.setHeader('Content-Length', format.contentLength);

    ytdl(videourl, { format: 'mp4' }).pipe(res);
  } else {
    res.json({ message: 'error', err: 'error', info: info });
  }
});

router.get('/search/:item/:limit', async (req, res) => {
  const x = req.params.item;

  try {
    //const result = await ytsr(x, { limit: parseInt(req.params.limit) });
    const result = await ytsr(x, { limit: 10 });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.json({ message: 'error', err: err });
  }
});
module.exports = router;
