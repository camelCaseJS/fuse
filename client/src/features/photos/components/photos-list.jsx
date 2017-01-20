import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { GridList, GridTile } from 'material-ui/GridList';
import Popover from 'material-ui/Popover';
import PhotosListEntry from './photos-list-entry';
import * as photosActionCreators from '../../../actions/photos-actions';
import * as userActionCreators from '../../../actions/user-actions';

const combinedActionCreators = {
  ...photosActionCreators,
  ...userActionCreators,
};

const styles = {
   root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 600,
    height: 600,
    overflowY: 'auto',
  },
};

class PhotosList extends Component {

  componentWillMount() {
    const myPhotoConnection = io('/photoSocket');
    // this.props.fetchPhotos(this.props.lastSelectedFriend);

    this.props.getUserInfo()
    .then((userInfo) => {
      const userFBId = userInfo.payload.user.facebookId;
      myPhotoConnection.emit('join photo room', { roomId: userFBId });
    });

    myPhotoConnection.on('photo room connected', (photoRoomInfo) => {
      console.log(photoRoomInfo);
    });

    myPhotoConnection.on('send to photos test', (photoSignal) => {
      alert(photoSignal);
      this.props.fetchPhotos();
    });
  }

  listPhotos() {
    const { selectPhoto } = this.props;

    return this.props.selectedUserPhotos.map(photo => (
      <GridTile key={photo.link} >
        <PhotosListEntry
          onSelect={() => selectPhoto(photo)}
          photoEntry={photo.link}
        />
      </GridTile>
      ),
    );
  }

  selectedPhoto() {
    if (this.props.selectedPhoto.link !== undefined) {
      return (
        <img src={this.props.selectedPhoto.link} alt="selected" />
      );
    }
    return (
      <div className="placeholder" />
    );
  }

  render() {
    return (
      <div>
        <div style={styles.root}>
          <GridList style={styles.gridList} cols={2.2}>
            { this.listPhotos() }
          </GridList>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    selectedPhoto: state.photos.selectedPhoto,
    selectedUserPhotos: state.photos.selectedUserPhotos,
    lastSelectedFriend: state.friends.lastSelectedFriend,
    getUserInfo: state.user.getUserInfo,
  }
);

PhotosList.propTypes = {
  selectedPhoto: React.PropTypes.object.isRequired,
  selectedUserPhotos: React.PropTypes.array.isRequired,
  selectPhoto: React.PropTypes.func.isRequired,
  fetchPhotos: React.PropTypes.func.isRequired,
  getUserInfo: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, combinedActionCreators)(PhotosList);

