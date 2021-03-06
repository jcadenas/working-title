import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import TeamReducer from './team_reducer';
import ModalReducer from './modal_reducer';
import ChannelReducer from './channel_reducer';
import MessageReducer from './message_reducer';


const RootReducer = combineReducers({
  session: SessionReducer,
  modals: ModalReducer,
  teams: TeamReducer,
  channels: ChannelReducer,
  messages: MessageReducer
});

export default RootReducer;
