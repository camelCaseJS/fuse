import React from 'react' ;
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import SearchedFriendsEntry from './searchedFriends-Entry';
import * as searchFriendsActionCreators from '../actions/actions';

class SearchFriends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search : ""
    };
  }

//this function updates the text value of the search button
handleSeachChange (e){
    this.setState({search:e.target.value})
 }

//this function makes the request to the db with the current search value
//it also resets the search value to ''
  //searchFriends is the action creator that handles search to the db
handleSeachSubmit (){

    this.props.searchFriends(this.state.search)
    this.setState({search:""})
 }

//this is the button that we will use to handle searches to the db
//will update with material-ui
searchButton () {
  return (
    <div>
     <input type="text" value={this.state.search} onChange={this.handleSeachChange()} />
     <button onClick={this.handleSearchSubmit()}>Submit.</button>
    </div>
  )
 }

//this function adds searched and selected friends to the user's friend list in the db.
//addFriendsToDB is an action creator that handles the post request to the db.
  //need to talk to Will about how to format data for post request to db to work correctly
handleAddUser (){
  this.props.addFriendsToDB()
}

//this is the button that we will use to add users to the db
//will update with material-ui
addUserButton () {
  return (
    <div>
     <button onClick={this.handleAddUser()}>Submit.</button>
    </div>
  )
 }

//this function will list out all friends in our searchedFriends array, which is the list of friends we've searched for in the db
//searchSelectFriend is a function to select friend from the searchFriends array
listIt() {

    const { searchSelectFriend } = this.props;

    return this.props.searchedFriends.map((friend, index) => {
      return (
        <SearchedFriendsEntry
          key={friend.id}
          firstName={friend.firstName}
          lastName={friend.lastName}
          profilePictureURL={friend.profilePictureURL}
          selected={friend.selected}
          onSelect={() => searchSelectFriend(friend, index)}
        />
      );
    },
    );
}

render() {

  //when land on the /friends/Add route, the first display will only be the button to search for a user in the db
  //if searchedFriends is an empty array, it must have an array length of zero, so we know that friends have not been searched yet
  if (this.props.searchedFriends.length === 0){
    return (
       {this.searchButton()}
    )
  }

  //when a user has searched for a friend, this returns the array of searched friends
  if (this.props.searchedFriendSelected===false) {
  return (

      //this will display the search button
      <div>
       {this.searchButton()}
      </div>

      //this will display the list of friends searched in db
      <List>
        {this.listIt()}
      </List>
    )
  }

  //when a user has selected a friend from search to the db, we will render the add user button to the db as a next step.
  if (this.props.searchedFriendSelected===true) {
    return (

      //this will display the search button
      <div>
       {this.searchButton()}
      </div>

      //this will display the list of friends searched in db and a selected friend
      <List>
        {this.listIt()}
      </List>

      //this will display the add user to db button
      <div>
        {this.addUserButton()}
      </div>
    )
  }
 }
}

const mapStateToProps = (state) => {
  return {
  searchedFriends: state.friendAdd.searchedFriends,
  selectedFriend: state.friendAdd.selectedFriend
  searchedFriendSelected: state.friendsAdd.searchedFriendSelected
  };
};

SearchFriends.propTypes = {
  searchedFriends: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  selectedFriend: React.PropTypes.object.isRequired,
  searchFriends: React.PropTypes.func.isRequired,
  searchSelectFriend: React.PropTypes.func.isRequired,
  searchedFriendSelected: React.PropTypes.bool.isRequired,
  addFriendsToDB: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, searchFriendsActionCreators)(SearchFriends);
