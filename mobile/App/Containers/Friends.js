import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, Image, View } from 'react-native';
import { Images } from '../Themes';
import styles from './Styles/PresentationScreenStyle';
import UsersList from './UsersList';
import * as friendsActionCreators from '../Actions/FriendsActions';


class Friends extends Component {

  componentWillMount() {
    this.props.fetchFriends();
  }

  onFriendSelect(friend, index) {
    //   this.props.unselectAllFriends();
    //   this.props.selectFriend(friend, index);
    //   this.props.fetchPhotos(friend);
    //   this.context.router.push('/photos');
    // } else {
    //   this.props.selectFriend(friend, index);
    // }
  }

  onFriendsListMount() {
    this.props.fetchFriends();
    // console.log(this.props.allFriends);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <UsersList
            onSelect={() => this.onFriendSelect}
            listComponentWillMount={() => this.onFriendsListMount()}
            users={this.props.allFriends}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allFriends: state.friends.allFriends,
    lastSelectedFriend: state.friends.lastSelectedFriend,
  };
};

Friends.propTypes = {
  allFriends: PropTypes.array.isRequired,
  unselectAllFriends: PropTypes.func.isRequired,
  selectFriend: PropTypes.func.isRequired,
  // fetchPhotos: PropTypes.func.isRequired,
  fetchFriends: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, friendsActionCreators)(Friends);
