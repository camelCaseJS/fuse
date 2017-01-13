import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { GridList, GridTile } from 'material-ui/GridList';
import PhotosListEntry from './photos-list-entry';
import * as photosActionCreators from '../../../actions/photos-actions';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    verticalAlign: 'bottom',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
};

class PhotosList extends Component {

  componentWillMount() {
    // this will fetchPhotos of selectFriend
    // this.props.fetchPhotos(this.props.lastSelectedFriend);
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
        <CardMedia>
          { this.selectedPhoto() }
        </CardMedia>
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
  }
);

PhotosList.propTypes = {
  selectedPhoto: React.PropTypes.object.isRequired,
  selectedUserPhotos: React.PropTypes.array.isRequired,
  selectPhoto: React.PropTypes.func.isRequired,
  fetchPhotos: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, photosActionCreators)(PhotosList);

