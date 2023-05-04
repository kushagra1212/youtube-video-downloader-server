const express = require('express');
const router = express.Router();
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
require('dotenv').config();
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

router.get('/download/:videoquality/:videourl', async (req, res) => {
  let { videoquality, videourl } = req.params;
  videourl = decodeURIComponent(videourl);
  const videoid = ytdl.getVideoID(videourl);

  const info = await ytdl.getInfo(videoid);

  if (info) {
    const format = ytdl.chooseFormat(info.formats, { quality: videoquality });

    res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');
    res.setHeader('Content-Length', format.contentLength);

    // Set highWaterMark to 1MB or any other suitable value
    const streamOptions = { highWaterMark: 1024 * 1024 };

    console.log(streamOptions)
    // Pipe the output of ytdl() function to the response object in smaller chunks
    ytdl(videourl, { filter: (format) => format.container === 'mp4' })
      .on('error', (err) => {
        console.error(err);
        res.status(500).send({ error: 'An error occurred' });
      })
      .pipe(res, streamOptions);
  } else {
    console.log(info);
    res.json({ message: 'error', err: 'error', info: info });
  }
});

router.get('/search/:item/:limit', async (req, res) => {
  const x = req.params.item;

  //console.log(x);

  const limit = req.params.limit;
  try {
    const result = await ytsr(x, { limit });

    res.json(result);
  } catch (err) {
    console.log(err);
    res.json({ message: 'error', err: err });
  }
});
module.exports = router;
