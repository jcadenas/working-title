import React from 'react';
import { connect } from 'react-redux';
import { userTeamChannels } from '../../../../selectors/selectors';
import ChannelNavigationListItem from './channel_navigation_list_item';

class ChannelNavigationList extends React.Component {

  listItems () {
    if (this.props.userTeamChannels[Object.keys(this.props.userTeamChannels)[0]]){
      const switchChannels = [];
      let sortedUserTeamChannels = this.props.userTeamChannels.sort(this.compare);
      sortedUserTeamChannels.forEach((channelId) => {
        switchChannels.push(
          <ChannelNavigationListItem key={channelId} teamId={this.props.match.params.team_id} listChannelId={channelId} baseCurrentChannelId={this.props.match.params.channel_id} />
        );
      });
      return switchChannels;
    } else {
      return undefined;
    }
  }

  compare(a,b) {
  if (a.name > b.name)
    return -1;
  if (a.name < b.name)
    return 1;
  return 0;
  }

  render() {
    return (
        <ul className='channel-navigation-list'>
          {this.listItems()}
        </ul>
    );

  }
}

const mapStateToProps = (state, ownProps) => {
  return({
    userTeamChannels: userTeamChannels(state, ownProps)
  });
};

export default connect(
  mapStateToProps,
  null
)(ChannelNavigationList);
