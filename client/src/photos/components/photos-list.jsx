import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import PhotosListEntry from './photos-list-entry';
import * as photosActionCreators from '../actions/actions';

class PhotosList extends Component {

  componentWillMount() {
    //this will fetchPhotos of selectFriend
    this.props.fetchPhotos();
  }

  listPhotos() {
    const { selectPhoto } = this.props;

    return this.props.selectedUserPhotos.map(photo => (
      <PhotosListEntry
        key={photo.link}
        photoEntry={photo.link}
        onSelect={() => selectPhoto(photo)}
      />
      ),
    );
  }

  selectedPhoto() {
    if (this.selectedPhoto) {
      return (
        <img src={this.props.selectedPhoto.link} alt="selected" />
      );
    }
    return (
      <div />
    );
  }

  render() {
    return (
      <div>
        <CardMedia>
          { this.selectedPhoto() }
        </CardMedia>
        <GridList>
          {this.listPhotos()}
        </GridList>
      </div>
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
  selectedPhoto: React.PropTypes.object.isRequired,
  selectedUserPhotos: React.PropTypes.array.isRequired,
  selectPhoto: React.PropTypes.func.isRequired,
  fetchPhotos: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, photosActionCreators)(PhotosList);

