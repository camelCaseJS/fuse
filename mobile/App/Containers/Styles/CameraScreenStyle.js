// @flow

import { StyleSheet } from 'react-native';
import { Colors, Metrics, ApplicationStyles } from '../../Themes/';

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
  centerIcon: {
    color: Colors.snow,
    alignItems: 'center',
  },
  leftIcon: {
    color: Colors.snow,
    alignItems: 'flex-start',
  },
  rightIcon: {
    color: Colors.snow,
    alignItems: 'flex-end',
  },
  bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin,
    }
});
