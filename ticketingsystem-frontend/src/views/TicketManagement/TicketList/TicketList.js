import React, { Component } from 'react';
import { Button, Input, Card, CardBody, CardHeader, Table } from 'reactstrap';
import Ticket from "../Ticket";
import CustomPagination from "../../CustomPagination/CustomPagination";
import {RESULTS_PER_PAGE_TICKETLIST, URL_GET_ALL_TARGETS} from '../../../_constants/configurationConstants';
import { ticketService } from '../../../_services/ticketService';
import {URL_TOTALPAGES_TICKETS} from "../../../_constants";

/* CONSTANTS */

/* Fields that are visible and editable in the form */

const fields = [
  /* ID, field name, Type */
  ["object", "Object", "text"],
  ["state", "State", "text"],
  ["customerPriority", "CustomerPriority", "text"],
  ["category","Category","text"],
];


class TicketList extends Component {
  constructor(props) {
    super(props);

    this.state={
      target:''
    };
    this.onChange = this.onChange.bind(this);
    this.handleclick = this.handleclick.bind(this);
  }

  onChange(evt){
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleclick(){
    //console.log("target", this.state.target);

    this.props.search(1,this.state.target);

  }

  /* Render the component */
  render() {

    /* Render tickets list table header */
    let tableHeader = fields.map(field =>
        <th width="80%" key={field[0]}>{field[1]}</th>
    );

    //const indexOfFirstTicket = RESULTS_PER_PAGE_TICKETLIST * (this.state.currentPage - 1);
    //const indexOfLastTicket = RESULTS_PER_PAGE_TICKETLIST * (this.state.currentPage);

    /* Render tickets list table body */
    let tableBody = this.props.tickets.map((ticket, index) =>
      <Ticket index={10*(this.props.currentPage-1)+index} key={ticket.id} id={ticket.id} ticket={ticket} fields={fields} />
    );

    // Shows results only for the current page
    //const currentTableBody = tableBody.slice(indexOfFirstTicket, indexOfLastTicket);

    //alert(tableBody);

    let table = this.props.mod !== 2 && (
      <Table>
        <tbody>
        <tr>
          <td><i className="fa fa-align-justify"/> Ticket List</td>
          <td><Input type="text" name="target" id="target" placeholder="Insert a target"
                     onChange={this.onChange}/></td>
          <td><Button onClick={this.handleclick} type="search" size="md" color="primary">Search</Button></td>
        </tr>
        </tbody>
      </Table> );


    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            {table}


          </CardHeader>
          <CardBody>
            <Table style={{tableLayout:"fixed"}} responsive striped size="sm">
              <thead bgcolor="#ADD8E6">
                <tr>
                  <th width="25%"><b>#</b></th>
                  {tableHeader}
                  <th width="25%"></th>
                </tr>
              </thead>
              <tbody>
                {tableBody}
              </tbody>
            </Table>
            <div align="center">
              <div style={{display:"inline-block"}}>
                  <CustomPagination numPages={this.props.numPages} selectPage={this.props.selectPage} currentPage={this.props.currentPage}/>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

//<CustomPagination numPages={Math.ceil(this.props.tickets.length / RESULTS_PER_PAGE_TICKETLIST)} selectPage={this.props.selectPage} currentPage={this.state.currentPage}/>

export default TicketList;
