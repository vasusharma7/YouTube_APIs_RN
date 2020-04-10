const router = require('express').Router();
const ytdl = require('ytdl-core');
router.get('/download', (req, res) => {
  var URL = String(req.headers.query);
  // console.log(URL);
  // var URL = String(req.params.link);
  // URL = URL.substring(1);
  // console.log(URL);
  res.header('Content-Disposition', 'attachment; filename="video.mp4"');
  ytdl(URL, {
    format: 'mp4',
  }).pipe(res);
  console.log('done');
});

// router.post('/check', (req, res) => {
//   var URL = String(req.body.url);

//   ytdl(URL, {
//     format: 'mp4',
//   });
//   process.on('unhandledRejection', (reason, promise) => {
//     console.log('object');
//     res.status(400).json('No Video Id');
//     return;
//   });
//   res.status(200).json('all check');
// });

module.exports = router;
