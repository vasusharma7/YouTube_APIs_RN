import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
  Platform,
  TextInput,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import YTSearch from 'youtube-api-search';
import YouTube, {
  YouTubeStandaloneIOS,
  YouTubeStandaloneAndroid,
} from 'react-native-youtube';
import RNFetchBlob from 'rn-fetch-blob';
import Button from '../components/Button.js';
import SearchBar from '../components/SearchBar.js';
import VideoList from '../components/VideoList.js';
const API_KEY = 'AIzaSyBmxU0P0h6uQTANkaBKbmRdHjZZe4iRfXA';
import axios from 'axios';
export default class SearchScreen extends React.Component {
  state = {
    loading: false,
    isReady: false,
    status: null,
    quality: null,
    error: null,
    nowPlaying: '',
    isPlaying: true,
    isLooping: false,
    duration: 0,
    currentTime: 0,
    fullscreen: false,
    containerMounted: false,
    containerWidth: null,
    videos: [],
  };
  searchYT = term => {
    this.setState({loading: true});
    YTSearch({key: API_KEY, term}, videos => {
      this.setState({loading: false, videos: videos});
    });
  };
  onPressSearch = term => {
    this.searchYT(term);
  };
  openPlayer = key => {
    this.setState({nowPlaying: key});
    this.setState({containerMounted: true});
  };
  download = async () => {
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
      await axios
        .get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${
            this.state.nowPlaying
          }&key=${API_KEY}`,
        )
        .then(res => {
          console.log(this.state.nowPlaying);
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
                path: String(MovieDir) + '/' + String(title) + ext,
                description: 'Video',
              },
            };
            config(options)
              .fetch('GET', url, {
                query: this.state.nowPlaying,
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
  render() {
    return (
      <ScrollView
        style={styles.container}
        onLayout={({
          nativeEvent: {
            layout: {width},
          },
        }) => {
          //   if (!this.state.containerMounted)
          //     this.setState({containerMounted: true});
          if (this.state.containerWidth !== width)
            this.setState({containerWidth: width});
        }}>
        <SearchBar onPressSearch={this.onPressSearch} />
        {this.state.containerMounted && (
          <>
            <View style={styles.videoStyle}>
              <YouTube
                ref={component => {
                  this._youTubeRef = component;
                }}
                apiKey="AIzaSyBmxU0P0h6uQTANkaBKbmRdHjZZe4iRfXA"
                videoId={
                  this.state.nowPlaying === ''
                    ? '668nUCeBHyY'
                    : this.state.nowPlaying
                }
                play={this.state.isPlaying}
                loop={this.state.isLooping}
                fullscreen={this.state.fullscreen}
                controls={1}
                style={[
                  {
                    height: PixelRatio.roundToNearestPixel(
                      this.state.containerWidth / (18 / 9),
                    ),
                  },
                  styles.player,
                ]}
                onError={e => this.setState({error: e.error})}
                onReady={e => this.setState({isReady: true})}
                onChangeState={e => this.setState({status: e.state})}
                onChangeQuality={e => this.setState({quality: e.quality})}
                onChangeFullscreen={e =>
                  this.setState({fullscreen: e.isFullscreen})
                }
                onProgress={e =>
                  this.setState({
                    duration: e.duration,
                    currentTime: e.currentTime,
                  })
                }
              />
            </View>
            <View style={styles.utilsStyle}>
              <Button
                onPress={this.download}
                mode="contained"
                style={styles.buttonStyles}>
                <Text style={{fontSize: 17.5}}>Download</Text>
              </Button>
              {/* <Button
                onPress={() => {
                  YouTubeStandaloneAndroid.playVideo({
                    apiKey: API_KEY,
                    videoId: '668nUCeBHyY',
                    autoplay: true,
                    lightboxMode: false,
                    // startTime: 124.5,
                  });
                }}
                mode="contained"
                style={styles.buttonStyles}>
                StandAlone`
              </Button> */}
            </View>
          </>
        )}

        <VideoList
          loading={this.state.loading}
          openPlayer={this.openPlayer}
          videos={this.state.videos}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  videoStyle: {
    flexDirection: 'column',
    padding: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    borderWidth: 0.2,
    borderColor: 'white',
    borderRadius: 5,
    backgroundColor: 'black',
  },
  utilsStyle: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttonStyles: {color: '#ff0000', flex: 0.45, margin: 15},
  //   welcome: {
  //     fontSize: 20,
  //     textAlign: 'center',
  //     margin: 10,
  //   },
  //   buttonGroup: {
  //     flexDirection: 'row',
  //     alignSelf: 'center',
  //   },
  //   button: {
  //     paddingVertical: 4,
  //     paddingHorizontal: 8,
  //     alignSelf: 'center',
  //   },
  //   buttonText: {
  //     fontSize: 18,
  //     color: 'blue',
  //   },
  //   buttonTextSmall: {
  //     fontSize: 15,
  //   },
  //   instructions: {
  //     textAlign: 'center',
  //     color: '#333333',
  //     marginBottom: 5,
  //   },
  player: {
    alignSelf: 'stretch',
    // marginVertical: 10,
    flex: 0.8,
  },
});
