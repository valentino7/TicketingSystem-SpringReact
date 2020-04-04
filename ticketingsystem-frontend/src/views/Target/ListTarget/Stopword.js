import React, { Component } from 'react';
import ModalConfirm from "./ModalConfirm";



class Stopword extends Component {
  constructor(props) {
    super(props);
    this.state={
    };
    this.toggle= this.toggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }


  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleDelete(){
    this.toggle();
    this.props.onDelete(this.props.value);
  }



  render() {

    return(
      <React.Fragment>
         <ModalConfirm toggle={this.toggle} handleDelete={this.handleDelete} modal={this.state.modal}/>


          <tr>
            <td width="5px" ><b>{this.props.index + 1}</b></td>

            <td align="center" key="value"> {this.props.value}</td>
            <td align="center">
              <i style={{cursor:"pointer"}} onClick={this.toggle}  className="fa fa-trash-o fa-lg mt-1 "/><br/>
            </td>

          </tr>
      </React.Fragment>
    );
  }
}
export default Stopword;
