import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as routerActionCreator from './actions/actions';

class App extends Component {

  componentWillMount() {
    this.props.updateRoute(this.props.location.pathname);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.router.location !== nextProps.router.location && nextProps.location.pathname !== '')  {
  //     this.props.updateRoute(nextProps.location.pathname);
  //   }
  // }

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }

}

const mapStateToProps = ({ router }) => {
  console.log(router);
  return { router };
}

export default connect(mapStateToProps, routerActionCreator)(App);
