import React, { Component } from 'react';
import {  DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppHeaderDropdown,  AppSidebarToggler } from '@coreui/react';

import logo from '../../assets/img/ticket.svg';
import {history} from "../../_helpers";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
    this.handleEditUserProfile = this.handleEditUserProfile.bind(this);
  }

  handleLogout(event) {
    event.preventDefault();

    this.props.logout();
  }

  handleEditUserProfile(event) {
    event.preventDefault();

    history.push('/editprofile');
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>

        <AppSidebarToggler className="d-lg-none" display="lg" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 106, height: 106 }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        {/*<Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="/">Ticketing System</NavLink>
          </NavItem>
        </Nav>*/}
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav align="center">
              <Nav className="d-md-down-none" navbar>
                <NavItem className="px-3">
                  <b>ACCOUNT</b>
                </NavItem>
              </Nav>


            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem onClick={this.handleEditUserProfile}><i className="fa fa-user"/> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"/> Settings</DropdownItem>
              <DropdownItem onClick={this.handleLogout}><i className="fa fa-lock"/> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
