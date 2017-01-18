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
    // const onSelect = this.onSelect.bind(this);
    // console.log(this.props.pendingFriends, 'props');

    if (this.props.pendingFriends.length === 0 && this.props.componentForEmptyList !== null) {
      return this.props.componentForEmptyList;
    }
    return this.props.pendingFriends.map((pending, index) =>
      (
        <PendingListEntry
          key={pending.id}
          firstName={pending.firstName}
          lastName={pending.lastName}
          profilePictureURL={pending.profilePictureURL}
          // selected={pending.selected}
          // onSelect={() => onSelect(user, index)}
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
  listComponentWillMount: PropTypes.func,
  onSelect: PropTypes.func,
  componentForEmptyList: PropTypes.object,
};

PendingList.defaultProps = {
  listComponentWillMount: () => {},
  onSelect: () => {},
  componentForEmptyList: null,
};

export default PendingList;
