import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SwitchTeams from './switch_teams';


const mapStateToProps = (state) => {
  return ({
    teams: state.teams.entities
  });
}

export default withRouter(connect(
  mapStateToProps,
  null
)(SwitchTeams));
