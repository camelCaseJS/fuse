import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import PhotosListEntry from './photos-list-entry';

class PhotosList extends Component {

  listPhotos() {
    return this.props.selectedUserPhotos.map(photo => (
      <PhotosListEntry
        photoEntry={photo.photoEntry}
      />
      ),
    );
  }

  render() {
    return (
      <List>
        {this.listPhotos()}
      </List>
    );
  }
}

const mapStateToProps = state => (
  {
    selectedPhoto: state.photos.selectedPhoto,
    selectedUserPhotos: state.photos.selectedUserPhotos,
  }
);

PhotosList.propTypes = {
  selectedPhoto: React.PropTypes.array.isRequired,
  selectedUserPhotos: React.PropTypes.array.isRequired,
  selectPhoto: React.PropTypes.func.isRequired,
  fetchPhotos: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(PhotosList);

