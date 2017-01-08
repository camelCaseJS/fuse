import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as routerActionCreator from './actions/actions';

class App extends Component {

  componentWillMount() {
    this.props.updateRoute(this.props.location);
  }

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}

const mapStateToProps = ({ router }) => {
  return { router };
}

export default connect(mapStateToProps, routerActionCreator)(App);
