import React, { Component } from 'react';

import { Button } from 'reactstrap';
import TeamUpdateDialog from "../TeamUpdateDialog";

class Team extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.onDelete(this.props.team);
  }

  render() {
    var tableRows = this.props.teamFields.map(attribute => {
      if (attribute[4] == "show") {
        return (
          <td key={attribute[0]}>{this.props.team[attribute[0]]}</td>
        );
      }
    });

    return(
      <tr>
        {tableRows}
        <td>
          <TeamUpdateDialog team={this.props.team}
                        teamFields={this.props.teamFields}
                        onUpdate={this.props.onUpdate}
                      refreshList={this.props.refreshList}
	    		selectField={this.props.selectField}
	    /*
	    selectedRadio={this.props.selectedRadio}
                        handleOptionChange={this.props.handleOptionChange} toggleCheckbox={this.props.toggleCheckbox}
            handlerSelectedCheckboxes={this.props.handlerSelectedCheckboxes} handlerSelectedRadio={this.props.handlerSelectedRadioi}*/
	    />
        </td>
        <td>
         <i style={{cursor:"pointer"}} onClick={this.handleDelete} className="fa fa-trash-o fa-lg mt-1"></i><br/>
        </td>
      </tr>
    );
  }
}

/*
          <Button onClick={this.handleDelete}>Delete</Button>
          */
export default Team;
