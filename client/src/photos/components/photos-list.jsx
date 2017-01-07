import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import PhotosListEntry from './photos-list-entry';

class PhotosList extends Component {

  listPhotos() {
    return this.props.photos.map((photo) => {
      return (
      <PhotosListEntry
        photoEntry={photo.photoEntry}
      />
    )
  })
}

  render() {
    return (
      <List>
        {this.listPhotos()}
      </List>
    );
  }
}

const mapStateToProps = (state) => {
  return { photos: state.photos.photos };
};

PhotosList.propTypes = {
  photos: React.PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(PhotosList);

