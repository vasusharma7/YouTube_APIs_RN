import React, {memo, useState, useEffect, Component} from 'react';
import {Text, Alert, PermissionsAndroid, TouchableOpacity} from 'react-native';
import Clipboard from '@react-native-community/clipboard';

import Background from '../components/Background';
import Logo from '../components/Logo';
import Button from '../components/Button';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import Paragraph from '../components/Paragraph';
import RNFetchBlob from 'rn-fetch-blob';
import YTSearch from 'youtube-api-search';
import axios from 'axios';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const API_KEY = 'AIzaSyBmxU0P0h6uQTANkaBKbmRdHjZZe4iRfXA';

const HomeScreen = ({navigation}) => {
  const [clip, setClip] = useState('');
  const [link, setLink] = useState({value: '', error: ''});
  const [ask, setAsk] = useState(true);
  async function clipF() {
    const clipboardContent = await Clipboard.getString();
    setClip(clipboardContent);
  }
  function validURL(str) {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    ); // fragment locator

    return !!pattern.test(str);
  }
  useEffect(() => {
    clipF();
  });
  function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : url;
  }

  const download = async () => {
    const {config, fs} = RNFetchBlob;
    let MovieDir = fs.dirs.MovieDir;
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission Required',
        message: 'Videos will be saved to' + String(MovieDir),
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      var videoId = youtube_parser(link.value);
      console.log(videoId);
      await axios
        .get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`,
        )
        .then(res => {
          if (res.data.pageInfo.totalResults) {
            var title = res.data.items['0'].snippet.title;
            var url = 'http://18.224.19.26:5000/api/utils/download';
            var ext = '.mp4';

            Alert.alert(title, 'Video Will be saved in ' + String(MovieDir));
            let options = {
              fileCache: true,
              addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: MovieDir,
                title,
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
                Alert.alert('Could Not Download Video', 'Some Error Occured');
              });
          } else {
            Alert.alert('No Video Found', 'Please Check URL');
          }
        })
        .catch(err => {
          console.log(err);
          Alert.alert('Some Error Occured', 'Please Try Again');
        });
    } else {
      Alert.alert('Storage  Permission Denied', "Can't Save Videos");
    }
  };
  return (
    <>
      <Background>
        {validURL(clip) &&
          ask &&
          Alert.alert('URL Detected  in Clipboard ', 'Do You Want to Paste', [
            {
              text: 'Confirm',
              onPress: () => {
                setAsk(false);
                setLink({value: clip});
              },
            },
            {
              text: 'Cancel',
              onPress: () => {
                setAsk(false);
              },
            },
          ])}
        <Header>YouTube Video Downloader</Header>
        <Logo />
        <Paragraph>Have The Video URL/Video Id ?</Paragraph>
        <TextInput
          label="Paste URL Here"
          theme={{colors: {primary: 'red'}}}
          returnKeyType="done"
          value={link.value}
          onChangeText={text => setLink({value: text, error: ''})}
          error={!!link.error}
          errorText={link.error}
        />
        <Button onPress={download} mode="contained" style={{color: '#ff0000'}}>
          Download
        </Button>
        <Paragraph>
          Don't Have The Link/Id ? Head to{' '}
          <Text style={{color: 'red'}}>Explore</Text>
        </Paragraph>
      </Background>
    </>
  );
};
export default memo(HomeScreen);
