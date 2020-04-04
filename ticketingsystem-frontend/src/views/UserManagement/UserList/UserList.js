import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Table } from 'reactstrap';
import UserRegistrationDialog from "../UserRegistrationDialog";
import User from "../User";
import {DEBUG_USERLIST_LIFECYCLE} from "../../../_constants/debugConstants";
import CustomPagination from "../../CustomPagination/CustomPagination";
import { RESULTS_PER_PAGE_USERLIST } from '../../../_constants/configurationConstants';


/* CONSTANTS */

/* Fields that are visible and editable in the form */

const fields = [
  /* ID, field name, Type, Placeholder */
  ["name", "Name", "text", "Enter Name.."],
  ["surname", "Surname", "text", "Enter Surname.."],
  ["username", "Username", "text", "Enter Username.."],
  ["email", "Email", "email", "Enter Email.."],
  ["password", "Password", "password", "Enter Password.."]
];

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1
    };

    this.selectPage = this.selectPage.bind(this);
    this.selectLastPage = this.selectLastPage.bind(this);
  }

  selectPage(page) {
    this.setState({
      currentPage: page
    });
  }

  selectLastPage() {
    this.setState({
      currentPage: Math.ceil(this.props.users.length / RESULTS_PER_PAGE_USERLIST)
    });
  }


  /* Render the component */
  render() {

    /* Render users list table header */
    let tableHeader = fields.map(field =>
        <th width="100%" key={field[0]}>{field[1]}</th>
    );

    const indexOfFirstUser = RESULTS_PER_PAGE_USERLIST * (this.state.currentPage - 1);
    const indexOfLastUser = RESULTS_PER_PAGE_USERLIST * (this.state.currentPage);

    /* Render users list table body */
    let currentTableBody;
    if (!this.props.users || !this.props.internalRoles || !this.props.externalRoles) {
        currentTableBody = <td colspan={fields.length + 3} style={{textAlign: "center"}}><b><i>No users were found</i></b></td>
    } else {
        let tableBody = this.props.users.map((user, index) =>
            <User index={index} key={user.id} id={user.id} user={user} fields={fields}
                  internalRoles={this.props.internalRoles} externalRoles={this.props.externalRoles}
                  updateUser={this.props.updateUser} deleteUser={this.props.deleteUser}/>
        );

        // Shows results only for the current page
        currentTableBody = tableBody.slice(indexOfFirstUser, indexOfLastUser);
    }


    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify" /> User List
          </CardHeader>
          <CardBody>
            <Table style={{tableLayout:"fixed"}} responsive striped size="sm">
              <thead bgcolor="#ADD8E6">
                <tr>
                  <th width="25%"><b>#</b></th>
                  {tableHeader}
                  <th width="100%">Roles</th>
                  <th width="25%"/>
                  <th width="25%"/>
                </tr>
              </thead>
              <tbody>
                {currentTableBody}
                <UserRegistrationDialog fields={fields} internalRoles={this.props.internalRoles} externalRoles={this.props.externalRoles} createUser={this.props.createUser} tableHeader={tableHeader} selectLastPage={this.selectLastPage}/>
              </tbody>
            </Table>
            <div align="center">
              <div style={{display:"inline-block"}}>
                <CustomPagination numPages={Math.ceil(this.props.users.length / RESULTS_PER_PAGE_USERLIST)} selectPage={this.selectPage} currentPage={this.state.currentPage}/>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default UserList;
