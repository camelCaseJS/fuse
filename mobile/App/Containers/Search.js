import React, { Component, PropTypes } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import axios from 'axios';
import URL from '../Config/URL';
import { Images } from '../Themes';
import styles from './Styles/SceneStyle';
import UsersList from './UsersList';
import SearchBar from '../Components/SearchBar';
import RoundedButton from '../Components/RoundedButton';

const addUserReuqest = (id) => {
  console.log(`${URL.users}${id}`);
  axios.post(`${URL.users}${id}`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

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
    axios.get(`${URL.search}${this.state.search}`)
      .then((response) => {
        console.log(response.data);
        // if not authenitcated, response will not be a useable array
        if (response.data && Array.isArray(response.data)) {
          const results = response.data.map((user) => {
            return { ...user, selected:false };
          });
          this.setState({
            searchResults: results,
            search: '',
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleAddUser() {
    this.state.searchResults.forEach((user) => {
      if (user.selected) {
        addUserReuqest(user.id);
      }
    });
    this.setState({
      searchResults: [],
      search: '',
    });
  }

  handleUserSelect(user, index) {
    const newResults = [...this.state.searchResults];
    newResults[index].selected = !newResults[index].selected;
    this.setState({ searchResults: newResults });
  }

  searchButton() {
    return (
      <View style={styles.container}>
          <SearchBar
            onSearch={() => { this.handleSearchSubmit(); }}
            onCancel={() => { this.setState({ search: '' }); }}
            searchTerm={this.state.search}
            onChange={(e) => { this.handleSearchChange(e); }}
          />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background5} style={styles.backgroundImage} resizeMode="stretch" />
        <View style={styles.mainSection}>
          <ScrollView style={styles.scrollContainer}>
            {this.searchButton()}
            <UsersList
              onSelect={(user, index) => this.handleUserSelect(user, index)}
              users={this.state.searchResults}
            />
          </ScrollView>
          { // If any users in search Result are selected, render Send button
          this.state.searchResults.reduce((accumulator, currentUser) => {
            return accumulator || currentUser.selected;
          }, false) ?
            <RoundedButton
              onPress={() => { this.handleAddUser(); }}
            >
              Send
            </RoundedButton> : [] }
        </View>
      </View>
    );
  }
}

export default Search;