// const handleDownload = () => {
//   axios
//     .get(`http://232453d6.ngrok.io/api/utils/download`, {
//       headers: { url: link.value },
//     })
//     .then(res => {})
//     .catch(err => console.log(err));
// };
// const handleDownload = async () => {
//   const fileUri = FileSystem.documentDirectory + 'new.mp4';
//   const url = 'http://232453d6.ngrok.io/api/utils/download:weZFfrjF-k4';
//   const downloadResumable = FileSystem.createDownloadResumable(
//     url,
//     fileUri,
//     {},
//     res => console.log(res)
//   );
//   const { uri } = await downloadResumable.downloadAsync();
//   console.log(uri);
// };
// const saveFile = async fileUri => {
//   console.log('object');
//   // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//   // if (status === 'granted') {
//   const asset = await MediaLibrary.createAssetAsync(fileUri);
//   await MediaLibrary.createAlbumAsync('Download', asset, false);
//   // }
// };
// const handleDownload = async () => {
//   const uri = 'http://232453d6.ngrok.io/api/utils/download:weZFfrjF-k4';
//   let fileUri = FileSystem.documentDirectory + 'small.mp4';
//   FileSystem.downloadAsync(uri, fileUri)
//     .then(({ uri }) => {
//       console.log(uri);
//       saveFile(uri);
//     })
//     .catch(error => {
//       console.error(error);
//     });
// };
