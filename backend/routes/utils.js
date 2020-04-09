const router = require('express').Router();
const ytdl = require('ytdl-core');
router.get('/download', (req, res) => {
  var URL = String(req.headers.query);
  console.log(URL);
  // var URL = String(req.params.link);
  // URL = URL.substring(1);
  // console.log(URL);
  res.header('Content-Disposition', 'attachment; filename="video.mp4"');
  ytdl(URL, {
    format: 'mp4',
  }).pipe(res);
  console.log('done');
});
module.exports = router;
