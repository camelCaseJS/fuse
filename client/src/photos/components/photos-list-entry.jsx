import React from 'react';
import { ListItem } from 'material-ui/List';
import {GridList, GridTile} from 'material-ui/GridList';

const PhotosListEntry = (props) => {
  return (
    <GridTile
      img src={props.photoEntry}
      onTouchTap={props.onSelect}
    />
  );
};

PhotosListEntry.propTypes = {
  photoEntry: React.PropTypes.string.isRequired,
  onSelect: React.PropTypes.func.isRequired,
};

export default PhotosListEntry;
