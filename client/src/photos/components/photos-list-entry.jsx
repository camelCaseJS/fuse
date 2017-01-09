import React from 'react';
import { ListItem } from 'material-ui/List';
import {GridList, GridTile} from 'material-ui/GridList';

const PhotosListEntry = (props) => {
  return (
    <GridTile
      onTouchTap={props.onSelect}
    >
      <img src={props.photoEntry} />
    </GridTile>
  );
};

PhotosListEntry.propTypes = {
  photoEntry: React.PropTypes.string.isRequired,
  onSelect: React.PropTypes.func.isRequired,
};

export default PhotosListEntry;
