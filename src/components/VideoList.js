import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import VideoListItem from './VideoListItem';
export default function VideoList({loading, videos, openPlayer}) {
  const VideoItems = videos.map(video => (
    <VideoListItem openPlayer={openPlayer} key={video.etag} video={video} />
  ));
  return (
    <ScrollView>
      <View style={styles.containerStyle}>
        {videos.length === 0 ? (
          <View style={styles.emptyStyles}>
            <Text style={styles.TextStyleEmpty}>
              Search Results Will Appear Here
            </Text>
          </View>
        ) : (
          <Text style={styles.TextStyle}>Search Results</Text>
        )}
        {loading && (
          <View style={styles.emptyStyles}>
            <Text style={styles.TextStyleEmpty}>Loading.......</Text>
          </View>
        )}
        {VideoItems}
      </View>
    </ScrollView>
  );
}

const styles = {
  containerStyle: {
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
  },
  rule: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    marginBottom: 2,
  },
  emptyStyles: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000',
  },
  TextStyleEmpty: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  TextStyle: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    borderBottomColor: 'red',
    borderBottomWidth: 2,
    marginBottom: 2,
  },
};
