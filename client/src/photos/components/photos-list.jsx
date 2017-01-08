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
    return this.props.selectedUserPhotos.map(photo => (
      <PhotosListEntry
        photoEntry={photo.link}
        onSelect={() => selectPhoto(photo)}
      />
      ),
    );
  }

  render() {
    return (
      <div>
      <CardMedia>
        <img src={this.selectedPhoto.link} />
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

