import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ListItem } from 'material-ui/List';
import Search from 'material-ui/svg-icons/action/search';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';


import UsersList from '../../../shared-components/users-list';
import PendingList from '../../../shared-components/pending-list';

import * as friendsActionCreators from '../../../actions/friends-actions';
import * as photosActionCreators from '../../../actions/photos-actions';

// import { connectToFriendsNamespace, connectToPhotosNamespace } from '../../../sockets-client/sockets';

import { connectToNamespaces } from '../../../sockets-client/sockets';

const combinedActionCreators = {
  ...photosActionCreators, ...friendsActionCreators,
};

const emptyListMessage = () => (
  <p>Click the <Search /> to search for friends</p>
  );

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
  inkBarStyle: {
    background: '#FFFFFF',
  },
};

class Friends extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.WHATTHEFUCKISGOINGON = this.WHATTHEFUCKISGOINGON.bind(this);
  }

  componentWillMount() {
    this.props.fetchFriends();
    this.props.getUserInfo()
    .then((userInfo) => {
      connectToNamespaces(userInfo.payload.user.facebookId);
    });
    this.props.fetchPendingFriends();
  }

  // componentDidMount() {
  //   // console.log(this.props.userInfo, 'DID');
  //   // if (this.props.userInfo.user !== undefined) {
  //   //   const userFBId = this.props.userInfo.user.facebookId;
  //   //   // connectToPhotosNamespace(userFBId);
  //   //   // connectToFriendsNamespace(userFBId);
  //   //   connectToNamespaces(userFBId);
  //   // }
  // }

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

  handleChange(value) {
    // console.log(value);
    this.props.handleTabSwitch(value);
  }

  WHATTHEFUCKISGOINGON() {
    console.log(this.props);
  }

  render() {
    // console.log(this.props.userInfo);
    return (
      <div>
        <Tabs
          inkBarStyle={{ background: '#DB0B00' }}
          tabItemContainerStyle={{ backgroundColor: '#666C7F' }}
          onChange={this.handleChange}
          value={this.props.slideIndex}
        >
          <Tab label="Friends" value={0} />
          <Tab label="Requests" value={1} />
        </Tabs>
        <SwipeableViews
          index={this.props.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            <UsersList
              style={styles}
              onSelect={(user, index) => this.onFriendSelect(user, index)}
              users={this.props.allFriends}
              componentForEmptyList={<ListItem
                primaryText={emptyListMessage()}
                disabled={true}
              />}
            />
          </div>
          <div>
            <button onClick={this.props.fetchPendingFriends}>pending</button>
            <button onClick={this.WHATTHEFUCKISGOINGON}>check</button>
            <PendingList
              style={styles}
              onSelect={(user, index) => this.onFriendSelect(user, index)}
              pendingFriends={this.props.pendingFriends}
              componentForEmptyList={<ListItem
                primaryText={emptyListMessage()}
                disabled={true}
              />}
            />
          </div>
        </SwipeableViews>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    allFriends: state.friends.allFriends,
    pendingFriends: state.friends.pendingFriends,
    lastSelectedFriend: state.friends.lastSelectedFriend,
    userInfo: state.friends.userInfo,
    slideIndex: state.friends.slideIndex,
    router: state.router,
  };
};

Friends.propTypes = {
  allFriends: PropTypes.arrayOf(PropTypes.object),
  pendingFriends: PropTypes.arrayOf(PropTypes.object),
  router: PropTypes.objectOf(PropTypes.string),
  unselectAllFriends: PropTypes.func.isRequired,
  selectFriend: PropTypes.func.isRequired,
  fetchPhotos: PropTypes.func.isRequired,
  fetchFriends: PropTypes.func.isRequired,
  fetchPendingFriends: PropTypes.func.isRequired,
  getUserInfo: React.PropTypes.func.isRequired,
  handleTabSwitch: React.PropTypes.func.isRequired,
  slideIndex: React.PropTypes.number.isRequired,
  userInfo: PropTypes.objectOf(PropTypes.object),
};

Friends.contextTypes = {
  router: PropTypes.object };

export default connect(mapStateToProps, combinedActionCreators)(Friends);
