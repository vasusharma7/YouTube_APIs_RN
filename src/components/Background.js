import React, {memo} from 'react';
import {View} from 'react-native';
import {ImageBackground, StyleSheet, KeyboardAvoidingView} from 'react-native';

const Background = ({children}) => (
  <View style={styles.background}>
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {children}
    </KeyboardAvoidingView>
  </View>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000',
  },
  container: {
    flex: 0,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(Background);
