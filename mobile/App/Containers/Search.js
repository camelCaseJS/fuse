import React, { Component, PropTypes } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import axios from 'axios';
import URL from '../Config/URL';
import { Images } from '../Themes';
import styles from './Styles/ListviewExampleStyle';
import UsersList from './UsersList';
import SearchBar from '../Components/SearchBar';
// import * as friendsActionCreators from '../Actions/FriendsActions';

class Search extends Component {

 constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      search: '',
    };
  }

  handleSearchChange(string) {
    this.setState({ search: string });
    console.log(this.state.search);
  }

  handleSearchSubmit() {
    console.log('handlesearchsumbit');
    axios.get(`${URL.users}${this.state.search}`)
      .then((response) => {
        console.log(response.data);
        this.setState({ searchResults: response.data});
        this.setState({ search: '' });
      });
  }

  handleAddUser(id) {
    axios.post(`${URL.users}${id}`)
      .then((response) => {
        console.log(response.data);
    });
  }
  searchButton() {
    return (
      <View style={styles.container}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView>
          <SearchBar
            onSearch={()=> {this.handleSearchSubmit()}}
            onCancel={()=> {this.handleSearchSubmit()}}
            searchTerm={this.state.search}
            onChange={(e)=> {this.handleSearchChange(e)}}
          />
        </ScrollView>
      </View>
    );
  }

  render() {
    return (
      <View>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView>
          {this.searchButton()}
          <View>
          <UsersList
            onSelect={(user, index) => this.onFriendSelect(user, index)}
            users={this.state.searchResults}
          />
          </View>
        </ScrollView>
      </View>
    );
  }
}

// Friends.propTypes = {
//   allFriends: PropTypes.array.isRequired,
//   unselectAllFriends: PropTypes.func.isRequired,
//   selectFriend: PropTypes.func.isRequired,
//   // fetchPhotos: PropTypes.func.isRequired,
//   fetchFriends: PropTypes.func.isRequired,
// };


export default Search;