const express = require('express');
const router = express.Router();
const ytdl = require('ytdl-core');
const ytsr = require('../ytsr');

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

router.get('/download/:videoquality/:videourl', async (req, res) => {
  let { videoquality, videourl } = req.params;
  videourl = decodeURIComponent(videourl);
  console.log(videourl, videoquality);
  const videoid = ytdl.getVideoID(videourl);

  const info = await ytdl.getInfo(videoid);

  if (info) {
    const format = ytdl.chooseFormat(info.formats, { quality: videoquality });

    res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');
    res.setHeader('Content-Length', format.contentLength);

    ytdl(videourl, { filter: (format) => format.container === 'mp4' }).pipe(
      res
    );
  } else {
    console.log(info);
    res.json({ message: 'error', err: 'error', info: info });
  }
});

router.get('/search/:item/:limit', async (req, res) => {
  const x = req.params.item;

  try {
    const result = await ytsr(x, { limit: parseInt(req.params.limit) });

    res.json(result);
  } catch (err) {
    console.log(err);
    res.json({ message: 'error', err: err });
  }
});
module.exports = router;
