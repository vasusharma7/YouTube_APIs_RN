import React, {Component} from 'react';
import {View, StyleSheet, TextInput, Image} from 'react-native';
import {Button} from 'react-native-elements';
import SearchButton from './SearchButton.js';
class SearchBar extends Component {
  state = {
    term: '',
  };
  render() {
    return (
      // <View style={styles.searchStyle}>
      //   <TextInput
      //     mode="outlined"
      //     value={this.state.term}
      //     onChangeText={term => {
      //       this.setState({term});
      //     }}
      //     style={styles.searchTextStyle}
      //     placeholder="Type In Here"
      //     placeholderTextColor="#fff"
      //   />
      //   <Button
      //     style={styles.searchButtonStyle}
      //     title={this.props.loading ? 'Loading...' : 'Search'}
      //     onPress={() => this.props.onPressSearch(this.state.term)}
      //   />
      // </View>
      <View style={styles.searchBox}>
        <View style={{flex: 4}}>
          <TextInput
            onChangeText={textEntry => {
              this.setState({term: textEntry});
            }}
            placeholderTextColor="white"
            placeholder="Search Here"
            style={styles.searchText}
            onSubmitEditing={() => {
              this.props.onPressSearch(this.state.term);
            }}
            value={this.state.term}
          />
        </View>
        <View style={{flex: 0.6}}>
          <SearchButton
            onPress={() => this.props.onPressSearch(this.state.term)}>
            <Image
              source={require('../assets/search.png')}
              style={{width: 50, height: 50}}
            />
          </SearchButton>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  searchText: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 15,
  },
  searchBox: {
    flexDirection: 'row',
    width: window.width,
    margin: 10,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#888',
    borderRadius: 10,
    backgroundColor: '#333',
  },
  searchStyle: {
    flexDirection: 'row',
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  searchTextStyle: {
    flex: 1,
    color: 'white',
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    borderColor: 'white',
  },
  searchbuttonStyle: {
    height: 25,
    marginBottom: 8,
  },
});
export default SearchBar;
