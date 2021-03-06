import React, { Component } from 'react' ;
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
// TODO: SEARCH HAS BEEN IMPORTED HERE TO PLACE IN FRONT OF
// INPUT BAR IF TIME ALLOWS (MATCH MOBILE STYLE)
import Search from 'material-ui/svg-icons/action/search';

import SearchedFriendsEntry from './searchedFriends-Entry';
import * as searchActionCreators from '../../actions/search-actions';
import * as userActionCreators from '../../actions/user-actions';
import * as socketActions from '../../sockets-client/sockets';

const combinedActionCreators = {
  ...searchActionCreators,
  ...userActionCreators,
};
const styles = {
  searchField: {
    padding: 25,
  },
  button: {
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
  },
  list: {
    margin: 10,
  },
  underlineStyle: {
    borderColor: '#666C7F',
  },
  underlineFocusStyle: {
    borderColor: '#DB0B00',
  },
};

class SearchFriends extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
  }

  componentWillMount() {
    this.props.getUserInfo();
  }

// this function updates the text value of the search button
  handleSearchChange(e) {
    this.setState({ search: e.target.value });
  }

// this function makes the request to the db with the current search value
// it also resets the search value to ''
  // searchFriends is the action creator that handles search to the db
  handleSearchSubmit() {
    // console.log('handleSearchSubmit ran!');
    this.props.searchFriends(this.state.search);
    this.setState({ search: '' });
  }

// this is the button that we will use to handle searches to the db
// will update with material-ui

  searchButton() {
    return (
      <div>
        <TextField
          hintStyle={styles.hintStyle}
          underlineStyle={styles.underlineStyle}
          underlineFocusStyle={styles.underlineFocusStyle}
          className="search-text"
          hintText="Find more friends!"
          value={this.state.search}
          onChange={this.handleSearchChange}
        />
        <div>
          <FlatButton
            icon={<Search />}
            style={styles.button}
            label="Search"
            onClick={this.handleSearchSubmit}
          />
        </div>
      </div>
    );
  }

// this function adds searched and selected friends to the user's friend list in the db.
// addFriendsToDB is an action creator that handles the post request to the db.
// need to talk to Will about how to format data for post request to db to work correctly
  handleAddUser() {
    this.props.searchedFriends.forEach((friend) => {
      if (friend.selected) {
        // console.log(this.props, 'THISTHSIHAF;SAFJDKS;FAJK;DLKS');
        this.props.addFriendRequestToDB(friend.id);
        socketActions.sendFriendRequest(this.props.userInfo.user, friend);
      }
    });
  }

// this is the button that we will use to add users to the db
// will update with material-ui
  addUserButton() {
    return (
      <div>
        <FlatButton
          style={styles.button}
          label="Submit"
          onClick={this.handleAddUser}
        />
      </div>
    );
  }

// this function will list out all friends in our searchedFriends array,
// which is the list of friends we've searched for in the db

// searchSelectFriend is a function to select friend from the searchFriends array
  listIt() {
    const { searchSelectFriend } = this.props;

    return this.props.searchedFriends.map((friend, index) => (
      <SearchedFriendsEntry
        key={friend.id}
        firstName={friend.firstName}
        lastName={friend.lastName}
        profilePictureURL={friend.profilePictureURL}
        selected={friend.selected}
        onSelect={() => {
          searchSelectFriend(friend, index);
          // console.log('in handleAddUser. this is state', this.props.searchedFriends);
        }}
      />
      ),
    );
  }

  render() {
  // console.log('this.props.searchedFriendSelected', this.props.searchedFriendSelected);
  // when land on the /friends/Add route,
  // the first display will only be the button to search for a user in the db

  // if searchedFriends is an empty array,
  // it must have an array length of zero, so we know that friends have not been searched yet
    if (this.props.searchedFriends.length === 0) {
    // console.log('searchedFriends ran!')
    // console.log('this.searchButton is',this.searchButton())

      return (
        <div>
          {this.searchButton()}
        </div>
      );
    } else if (this.props.searchedFriendSelected === false) {
  // when a user has searched for a friend, this returns the array of searched friends
      // console.log('searchedFriendSelected false ran!');
      return (
  // this will display the search button
        <div>
          <div>
            {this.searchButton()}
          </div>
          <List>
            {this.listIt()}
          </List>
        </div>
      );
    } else if (this.props.searchedFriendSelected === true) {
    // when a user has selected a friend from search to the db,
    // we will render the add user button to the db as a next step.

      // console.log('searchedFriendSelected true ran!');
      // console.log('in searchedFriendSelected true this is state', this.state);
      return (
        <div>
          <div>
            {this.searchButton()}
          </div>

          <List
            style={styles.list}
          >
            {this.listIt()}
          </List>
          <div>
            {this.addUserButton()}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => (
  // console.log('this is state', state);
  {
    searchedFriends: state.search.searchedFriends,
    selectedFriend: state.search.selectedFriend,
    searchedFriendSelected: state.search.searchedFriendSelected,
    lastSelectedFriend: state.friends.lastSelectedFriend,
    addFriendRequestToDB: state.search.addFriendRequestToDB,
    userInfo: state.user.userInfo,
  }
);

SearchFriends.propTypes = {
  searchedFriends: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  lastSelectedFriend: React.PropTypes.object.isRequired,
  searchFriends: React.PropTypes.func.isRequired,
  searchSelectFriend: React.PropTypes.func.isRequired,
  searchedFriendSelected: React.PropTypes.bool.isRequired,
  addFriendRequestToDB: React.PropTypes.func.isRequired,
  userInfo: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, combinedActionCreators)(SearchFriends);
