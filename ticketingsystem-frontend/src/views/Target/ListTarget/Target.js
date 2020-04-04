import React, { Component } from 'react';
import ModalConfirm from "./ModalConfirm";
import UpdateTarget from './UpdateTarget'
import Stopwords from "./Stopwords";



class Target extends Component {
  constructor(props) {
    super(props);
    this.state= {
      stopwords:[],
      collapse: true

    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleShowClusters = this.handleShowClusters.bind(this);
  }
  handleShowClusters() {
    this.props.onShowClusters(this.props.target.id);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };



  handleDelete() {
    this.toggle();
    this.props.onDelete(this.props.target);
  }

  render() {
    let tableRows = this.props.showFields.map(attribute => {
        if(this.props.target["enabled"]===true){
          return (
            <td key={attribute} align="center">{this.props.target[attribute]}</td>
          );
        }
    });
    return(
      <React.Fragment>
        <ModalConfirm toggle={this.toggle} handleDelete={this.handleDelete} modal={this.state.modal}/>
        <tr>
          <td width="30px"><b>{this.props.index + 1}</b></td>
          {tableRows}
          <td align="center">
            <UpdateTarget target={this.props.target}
                          onUpdate={this.props.onUpdate}
                          typology={this.props.typology}
                          refreshList={this.props.refreshList}/>
          </td>
          <td align="center">
            <i style={{cursor:"pointer"}} onClick={this.handleShowClusters}  className="icon-chart fa-lg mt-1"/><br/>
          </td>
          <td align="center">
            <Stopwords target={this.props.target.id}  style={{cursor:"pointer"}} />
          </td>
          <td align="center">
            <i style={{cursor:"pointer"}} onClick={this.toggle}  className="fa fa-trash-o fa-lg mt-1 "/><br />
          </td>
        </tr>
      </React.Fragment>
    );
  }
}
export default Target;
