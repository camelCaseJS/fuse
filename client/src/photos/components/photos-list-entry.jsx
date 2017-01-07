import React from 'react';
import { ListItem } from 'material-ui/List';

const PhotosListEntry = (props) => {
  return (
    <ListItem
      primaryText={props.photoEntry}
    />
  );
};

PhotosListEntry.propTypes = {
  photoEntry: React.PropTypes.string.isRequired,
};

export default PhotosListEntry;
