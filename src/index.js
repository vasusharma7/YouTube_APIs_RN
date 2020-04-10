//This is an example of React Native Tab
import React from 'react';
//import react in our code.

//For React Navigation 3+
//import {
//  createStackNavigator,
//  createMaterialTopTabNavigator,
//  createAppContainer,
//} from 'react-navigation';

//For React Navigation 4+

import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
//Making TabNavigator which will be called in App StackNavigator
//we can directly export the TabNavigator also but header will not be visible
//as header comes only when we put anything into StackNavigator and then export

const TabScreen = createMaterialTopTabNavigator(
  {
    Download: {screen: HomeScreen},
    Explore: {screen: SearchScreen},
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#f00',
      style: {
        backgroundColor: '#000',
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: '#f00',
        borderBottomWidth: 2,
      },
    },
  },
);

//making a StackNavigator to export as default
const App = createStackNavigator(
  {
    TabScreen: {
      screen: TabScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#ff0000',
        },
        headerTintColor: '#000',
        title: 'YouTube APIs',
      },
    },
  },
  {headerLayoutPreset: 'center'},
);
export default createAppContainer(App);
