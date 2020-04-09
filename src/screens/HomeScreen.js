import React, {memo, useState} from 'react';
import {Alert} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Button from '../components/Button';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import Paragraph from '../components/Paragraph';
import RNFetchBlob from 'rn-fetch-blob';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// var axios = require('axios');
const HomeScreen = ({navigation}) => {
  const [link, setLink] = useState({value: '', error: ''});
  const download = () => {
    var date = new Date();
    var url = 'http://121e27e9.ngrok.io/api/utils/download';
    var ext = '.mp4';
    const {config, fs} = RNFetchBlob;
    let MovieDir = fs.dirs.MovieDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          MovieDir +
          '/ytVideo_' +
          String(date.getHours()) +
          '-' +
          String(date.getMinutes()) +
          '-' +
          String(date.getSeconds()),
        ext,
        description: 'Video',
      },
    };
    config(options)
      .fetch('GET', url, {
        query: link.value,
      })
      .then(res => {
        console.log('Success Downloaded');
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Video URL Invalid', 'Enter Proper Video URL');
      });
  };

  return (
    <>
      <Background>
        <Header>YouTube Video Downloader</Header>
        <Logo />
        <Paragraph>Have The Video Link ?</Paragraph>
        <TextInput
          label="Enter URL Here"
          returnKeyType="done"
          value={link.value}
          onChangeText={text => setLink({value: text, error: ''})}
          error={!!link.error}
          errorText={link.error}
        />
        <Button onPress={download} mode="contained" style={{color: '#ff0000'}}>
          Download
        </Button>
      </Background>
    </>
  );
};
export default memo(HomeScreen);
