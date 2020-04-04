import React from 'react';
import TeamList from "../../views/TeamManagement/TeamList/TeamList";
import {bindActionCreators} from "redux";
import { connect } from 'react-redux';
import { teamActions } from "../../_actions";
import ConfigurationFile from "../../util/ConfigurationFile";


//import '../../assets/css/loading-animation.css';

class TeamListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        internalRoles: ConfigurationFile.getInternalRoles(),
        teamNames: ConfigurationFile.getTeamNames()
    };

    /* Binding */
    this.readTeams = this.readTeams.bind(this);
	      this.refreshTeams = this.refreshTeams.bind(this);

  }


  /* CRUD OPERATIONS */


  // Read user list
  readTeams() {
    if (!this.props.isValid || !this.props.userIsValid) {
      this.props.actions.getAll();
    }
  }

  // Read user list
  refreshTeams() {
      this.props.actions.getAll();
  }

  componentWillMount() {
  this.readTeams(); // Read users list
  }
    //  {this.props.loading ? <div className="loading">Loading&#8230;</div> : null}
   //     {this.props.teams ?*/ <TeamList /*teams={this.props.teams}*//>  : <div />}

  render() {
    return(
      <React.Fragment>
             {this.props.loading ? <div className="loading">Loading</div> : null}
        {this.props.teams ? <TeamList teams={this.props.teams} refreshList={this.refreshTeams} internalRoles={this.state.internalRoles} teamNames={this.state.teamNames}/>  : <div />}

      </React.Fragment>
    );
  }
}


function mapStateToProps(state) {
  console.log(state.teams);

  return { teams: state.teams.teams, isValid: state.teams.isValid, loading: state.teams.loading, userIsValid : state.users.ext_team_isValid };
}


function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(teamActions, dispatch) }
}

export default connect(
  mapStateToProps,
 mapDispatchToProps
)(TeamListContainer);
