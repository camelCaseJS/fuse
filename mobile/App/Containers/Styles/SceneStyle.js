// @flow

import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics, ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logo: {
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain',
  },
  centered: {
    alignItems: 'center',
  },
  mainSection: {
    flex: 1,
    margin: Metrics.section,
    padding: Metrics.baseMargin,
    borderTopColor: Colors.frost,
    borderTopWidth: 0.5,
    borderBottomColor: Colors.frost,
    borderBottomWidth: 1,
  },
  selectedText: {
    color: Colors.fire,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin,
  },

  // container: {
  //   flex: 1,
  //   marginTop: Metrics.navBarHeight,
  //   backgroundColor: Colors.background
  // },
});
