import React, { Component } from 'react';

import { Button } from 'reactstrap';
import Checkbox from './Checkbox';
import Radiobox from './Radiobox';
//import UserUpdateDialog from "../UserUpdateDialog";

class User extends Component {
  constructor(props) {
    super(props);
   // this.handleDelete = this.handleDelete.bind(this);
   // this.props.index = this.props.index.bind(this);
  }
/*
  handleDelete() {
    this.props.onDelete(this.props.user);
  }
*/


  render() {
	//         console.log(this.props.selectedRadio);
        //console.log(this.props.index);

    var tableRows = this.props.fields.map(attribute => {
      if (attribute[4] == "show") {
        return (
 
          <td key={attribute[0]}>
		{this.props.user[attribute[0]]}	
		</td>
	
        );
      }
    });

/* <input type="radio" value={ this.props.user.id }
                     defaultChecked={ this.props.selectedRadio == this.props.user.id }
                      onChange={this.props.handleOptionChange} name = {"radioeditteam"}/>*/


    return(

      <tr>
	    {tableRows}
        <td style={{textAlign:"center"}}>
	   <Radiobox key={this.props.user.id} data={this.props.user.id} handleRadioboxCheck={this.props.checkRadiobox}  
	    callbackToHandler={this.props.callbackToHandler} handleRadioboxChange={this.props.toggleRadiobox} />

	</td>  	   
	<td style={{textAlign:"center"}}>
           <Checkbox key={this.props.user.id} data={this.props.user.id} handleCheckboxCheck={this.props.checkCheckbox}  handleCheckboxChange={this.props.toggleCheckbox} />
	    </td>
      </tr>
    );
  }
}

/*
          <Button onClick={this.handleDelete}>Delete</Button>
          */
export default User;
