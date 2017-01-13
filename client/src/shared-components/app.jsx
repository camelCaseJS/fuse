import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as routerActionCreator from '../actions/shared-components-actions';

class App extends Component {

  componentWillMount() {
    this.props.updateRoute(this.props.location);
  }

  componentWillReceiveProps(nextProps) {
    this.props.updateRoute(nextProps.location);
  }

  render() {
    // console.log('this.props.location');
    // console.log(this.props.location);
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
