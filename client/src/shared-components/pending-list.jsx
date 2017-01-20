import React, { Component, PropTypes } from 'react';
import { List } from 'material-ui/List';
import PendingListEntry from './pending-list-entry';

const styles = { list:
  { margin: 10 },
};

class PendingList extends Component {

  onSelect(user, index) {
    this.props.onSelect(user, index);
  }

  renderPendingList() {
    // console.log(this.props.pendingFriends, 'pending friends');
    // console.log(this.props.deleteRequest);
    if (this.props.pendingFriends.length === 0 && this.props.componentForEmptyList !== null) {
      return this.props.componentForEmptyList;
    }
    return this.props.pendingFriends.map((pending, index) =>
      (
        <PendingListEntry
          key={pending.id}
          firstName={pending.firstName}
          lastName={pending.lastName}
          friendId={pending.id}
          profilePictureURL={pending.profilePictureURL}
          selected={pending.selected}
          deleteRequest={this.props.deleteRequest}
          completeRequest={this.props.completeRequest}
          updateLists={this.props.updateLists}
        />
      ),
    );
  }

  render() {
    return (
      <List
        style={styles.list}
      >
        {this.renderPendingList()}
      </List>
    );
  }
}

PendingList.propTypes = {
  pendingFriends: PropTypes.arrayOf(PropTypes.object).isRequired,
  componentForEmptyList: PropTypes.object,
  deleteRequest: PropTypes.func,
  completeRequest: PropTypes.func,
  updateLists: PropTypes.func,

};

PendingList.defaultProps = {
  listComponentWillMount: () => {},
  onSelect: () => {},
  componentForEmptyList: null,
};

export default PendingList;
