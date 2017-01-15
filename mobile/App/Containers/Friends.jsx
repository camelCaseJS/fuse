import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UsersList from './UsersList';
// import * as friendsActionCreators from '../../../actions/friends-actions';
// import * as photosActionCreators from '../../../actions/photos-actions';
import { ListItem } from 'material-ui/List';
import ActionFace from 'material-ui/svg-icons/action/face';

// const combinedActionCreators = {
//   ...photosActionCreators, ...friendsActionCreators,
// };

const dataObjects = [
      { id:1,
        firstName:Philip,
        lastName:Fry,
        profilePictureURL:'http://vignette2.wikia.nocookie.net/en.futurama/images/d/da/Fry_Looking_Squint.jpg'
      },
      { id:2,
        firstName:Bender,
        lastName:Rodriguez,
        profilePictureURL:'https://upload.wikimedia.org/wikipedia/en/a/a6/Bender_Rodriguez.png'
      },
      { id: 3,
        firstName:Prof,
        lastName:Fransworth,
        profilePictureURL:'http://orig04.deviantart.net/a01d/f/2015/099/8/0/farnsworth_first_draw_by_luigibroz-d8p0tzz.png'
      },
    ];

const emptyListMessage = () => (
  <p>Click the <ActionFace /> to search for friends</p>
  );

class Friends extends Component {

  onFriendSelect(friend, index) {
    if (this.props.router.pathname !== '/camera') {
      this.props.unselectAllFriends();
      this.props.selectFriend(friend, index);
      this.props.fetchPhotos(friend);
      this.context.router.push('/photos');
    } else {
      this.props.selectFriend(friend, index);
    }
  }

  onFriendsListMount() {
    this.props.fetchFriends();
  }

  render() {
    return (
      <UsersList
        onSelect={() => this.onFriendSelect}
        componentWillMount={() => this.onFriendsListMount}
        users={this.props.allFriends}
        componentForEmptyList={<ListItem
          primaryText={emptyListMessage()}
          disabled={true}
        />}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allFriends: state.friends.allFriends,
    lastSelectedFriend: state.friends.lastSelectedFriend,
    router: state.router,
  };
};

Friends.propTypes = {
  allFriends: PropTypes.arrayOf(PropTypes.array, PropTypes.object),
  router: PropTypes.object,
  unselectAllFriends: PropTypes.func.isRequired,
  selectFriend: PropTypes.func.isRequired,
  fetchPhotos: PropTypes.func.isRequired,
  fetchFriends: PropTypes.func.isRequired,
};

Friends.contextTypes = {
  router: PropTypes.object };

export default connect(mapStateToProps, combinedActionCreators)(Friends);
