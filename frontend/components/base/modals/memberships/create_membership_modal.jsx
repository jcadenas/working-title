import React from 'react';


class CreateMembershipModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      team_id: this.props.match.params.team_id
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const membership = this.state;
    return this.props.createMembership(membership);
  }

  handleChange(field) {
    return e => {
        e.stopPropagation();
        this.setState({
        [field]: e.currentTarget.value
      });
    };
  }

  handleCancel(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.collapseCreateMembershipModal();
  }

  currentTeamName () {
    return this.props.teams[this.props.match.params.team_id].name;
  }

  renderErrors() {
    // TODO Error Handling
    if(this.props.teamErrors){
      return(
        <ul>
          {this.props.teamErrors.map((error, i) => (
            <li key={`error-${i}`} className='session-error-item'>
              {error}
            </li>
          ))}
        </ul>
      );
    }
  }

  render() {
    return (
      <div className='form-modal'>
        <div className="form-container">
          <form onSubmit={this.handleSubmit} className="form-box">
            <br/>
            <h3 className='form-header'>Add User to <span className='add-user-to-this-team'>{this.currentTeamName()}</span></h3>
            <p className='form-blerb'>Add a new user & start chattin!</p>
            {this.renderErrors()}
            <div className="form">
              <br/>
              <label htmlFor='name' className='form-label'>Add by Username</label>
              <input type="text"
                id='name'
                value={this.state.username}
                onChange={this.handleChange('username')}
                className="form-input"
                ></input>
              <br/>
              <div className='form-buttons'>
                <button className='form-submit'>Add User</button>
                <button onClick={this.handleCancel} className='form-cancel'>Cancel</button>
              </div>
              <br/>
            </div>
          </form>
        </div>
      </div>
    );
  }


}

export default CreateMembershipModal;
