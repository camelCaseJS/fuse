import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as routerActionCreators from '../actions/shared-components-actions';
import * as userActionCreators from '../actions/user-actions';

const combinedActionCreators = {
  ...routerActionCreators,
  ...userActionCreators,
};

class App extends Component {

  componentWillMount() {
    this.props.updateRoute(this.props.location);
    // console.log('GET INSIDE APP');
    // this.props.getUserInfo();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.router.pathname !== nextProps.location.pathname) {
      this.props.updateRoute(nextProps.location);
    }
    // console.log(this.props);
  }

  render() {
    // this.props.getUserInfo();
    // console.log('this.props.location');
    // console.log(this.props.location);
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.friends.userInfo,
    router: state.router,
  };
};

export default connect(mapStateToProps, combinedActionCreators)(App);
