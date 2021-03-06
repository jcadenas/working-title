import * as APIUtil from '../util/api_util';
import { collapseCreateTeamModal, collapseEditTeamModal, expandCreateTeamModal } from './modal_actions';
import { fetchTeamChannels } from './channel_actions';

// REDUCER CONSTANTS -----------------------------

export const RECEIVE_ONE_TEAM = 'RECEIVE_ONE_TEAM';
export const RECEIVE_ALL_TEAMS = 'RECEIVE_ALL_TEAMS';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const DESTROYED_TEAM = 'DESTROYED_TEAM';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const UPDATED_ONE_TEAM = 'UPDATED_ONE_TEAM';




// OBJECT ACTION CREATORS -----------------------------


export const receiveOneTeam = (resp) => {
  return ({
    type: RECEIVE_ONE_TEAM,
    team: resp.team,
    user: resp.user,
    channel: resp.channel
  });
};

export const updatedOneTeam = (team) => {
  return ({
    type: UPDATED_ONE_TEAM,
    team
  });
};

export const destroyedOneTeam = (team) => {
  return ({
    type: DESTROYED_TEAM,
    team
  });
};

export const receiveAllTeams = (teams) => {
  return ({
    type: RECEIVE_ALL_TEAMS,
    teams
  });
};

export const receiveErrors = (errors) => {
  return ({
    type: RECEIVE_ERRORS,
    errors
  });
};

export const clearErrors = () => {
  return ({
    type: CLEAR_ERRORS,
    errors: []
  });
};




// ASYNC ACTION CREATORS -----------------------------

export const createTeam = (team) => (dispatch) => {
  return APIUtil.createTeam(team)
    .then(
      (resp) => dispatch(receiveOneTeam(resp)),
      (errors) => dispatch(receiveErrors(errors.responseJSON)))
    .then(
      () => dispatch(collapseCreateTeamModal())
    );
};

export const destroyTeam = (teamId) => (dispatch) => {
  return APIUtil.destroyTeam(teamId)
    .then(
      (resp) => dispatch(destroyedOneTeam(resp)),
      (errors) => dispatch(receiveErrors(errors.responseJSON)));
};

export const fetchOneTeam = (teamId) => (dispatch) => {
  return APIUtil.fetchOneTeam(teamId)
    .then(
      (resp) => dispatch(receiveOneTeam(resp)),
      (errors) => dispatch(receiveErrors(errors.responseJSON)));
};

export const fetchUserTeams = () => (dispatch) => {
  return APIUtil.fetchUserTeams()
    .then(
      (resp) => {
        if (Object.keys(resp).length > 0) {
          dispatch(receiveAllTeams(resp))
        } else {
          dispatch(expandCreateTeamModal())
        }
      },
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    );
};

export const updateOneTeam = (team) => (dispatch) => {
  return APIUtil.updateOneTeam(team)
    .then(
      (resp) => dispatch(updatedOneTeam(resp)),
      (errors) => dispatch(receiveErrors(errors.responseJSON)))
    .then(
      () => dispatch(collapseEditTeamModal())
    );
};





// End of File
