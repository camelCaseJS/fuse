// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.panther,
  },
  row: {
    flex: 1,
    backgroundColor: Colors.fire,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center',
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.fire,
    textAlign: 'center',
    marginVertical: Metrics.smallMargin,
  },
  selected: {
    fontWeight: 'normal',
    color: Colors.fire,
    fontSize: Fonts.size.h6,
  },
  unselected: {
    fontWeight: 'normal',
    color: Colors.snow,
    fontSize: Fonts.size.regular,
  },
  label: {
    textAlign: 'center',
    color: Colors.snow,
    marginBottom: Metrics.smallMargin
  },
  listContent: {
    marginTop: Metrics.baseMargin
  },
  listContainer: {
    backgroundColor: Colors.coal,
  },
  contentViewContainer: {
    borderRadius: 5,
    // marginHorizontal: Metrics.section,
    // marginVertical: Metrics.baseMargin,
    // backgroundColor: Colors.frost,
    backgroundColor: Colors.charcoal,
    justifyContent: 'center',
  },

});
