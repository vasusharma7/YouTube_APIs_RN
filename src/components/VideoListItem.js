import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

const VideoListItem = ({video, openPlayer}) => {
  const {
    title,
    channelTitle,
    description,
    thumbnails: {
      medium: {url},
    },
  } = video.snippet;
  return (
    <>
      <TouchableOpacity onPress={() => openPlayer(video.id.videoId)}>
        <View style={styles.containerStyle}>
          <Image style={styles.ImageStyle} source={{uri: url}} />

          <View style={styles.InfoStyle}>
            <Text style={styles.TextStyle}>{title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  ImageStyle: {width: 160, alignSelf: 'center', height: 80, margin: 5},
  TextStyle: {color: 'white'},
  containerStyle: {
    flexDirection: 'row',
    marginBottom: 10,
    marginRight: 5,
    marginLeft: 5,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#888',
    borderRadius: 10,
    // backgroundColor: '#333',
  },
  InfoStyle: {
    borderLeftColor: 'white',
    borderLeftWidth: 0.5,
    marginBottom: 2,
    paddingLeft: 5,
    width: 0,
    flex: 1,
    flexGrow: 1,
  },
  rule: {
    borderLeftColor: 'white',
    borderLeftWidth: 2,
    marginBottom: 2,
  },
});

export default VideoListItem;
