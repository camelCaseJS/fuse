import React, { Component, PropTypes } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import axios from 'axios';
import URL from '../Config/URL';
import { Images } from '../Themes';
import styles from './Styles/SceneStyle';
import UsersList from './UsersList';
import SearchBar from '../Components/SearchBar';

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
          this.setState({ searchResults: response.data});
          this.setState({ search: '' });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleAddUser(id) {
    console.log(`${URL.users}${id}`);
    axios.post(`${URL.users}${id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  searchButton() {

    //TODO Make list look like camra list
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
        <ScrollView>
          {this.searchButton()}
          <View>
          <UsersList
            onSelect={(user, index) => this.handleAddUser(user.id)}
            users={this.state.searchResults}
          />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Search;