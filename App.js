/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import CameraContainer from './CAmeraContainer';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import { Component, Fragment } from 'react';
// import { RNCamera } from 'react-native-camera';
import styles from './scanStyle'
import {
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';


const App = () => {

  return (
    <Fragment>
      <CameraContainer />
    </Fragment>
  );
};

export default App;
