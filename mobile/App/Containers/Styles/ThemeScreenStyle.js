// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  groupContainer: {
    ...ApplicationStyles.groupContainer
  },
  sectionHeaderContainer: {
    ...ApplicationStyles.darkLabelContainer
  },
  sectionHeader: {
    ...ApplicationStyles.darkLabel
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  backgroundContainer: {
    position: 'relative',
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: Colors.frost
  },
  backerImage: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    resizeMode: 'stretch'
  },
 photoContainer: {
    height: 130,
    padding: Metrics.smallMargin,
    marginBottom: Metrics.smallMargin
  },
  photoSquare: {
    width: 100,
    height: 100
  },
  photoName: {
    width: 100,
    height: Metrics.doubleBaseMargin,
    lineHeight: Metrics.doubleBaseMargin,
    color: Colors.charcoal,
    textAlign: 'center'
  },
  fontRow: {
    padding: Metrics.smallMargin,
    marginHorizontal: Metrics.smallMargin,
    color: Colors.snow
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
  scrollContainer: {
    marginBottom: 35,
  }
})
