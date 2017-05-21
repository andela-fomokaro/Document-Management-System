import React from 'react';
import { connect } from 'react-redux';
import { SideNav, SideNavItem, Button } from 'react-materialize';
import { hasAdmin } from '../utils/helpers';


/**
 * 
 * 
 * @class SideNavLink
 * @extends {React.Component}
 */
class SideNavLink extends React.Component {

  /**
   * 
   * 
   * @returns 
   * 
   * @memberOf SideNavLink
   */
  render() {
    return (
      <SideNav
        trigger={<Button
          floating large
          className="pulse blue-grey darken-4 right" waves="light" icon="menu"
        />}
        options={{ closeOnClick: true }}
      >
        <SideNavItem href="myprofile">My Profile</SideNavItem>
        <SideNavItem href="/loadDocuments" className="linkColor">Create
        And Manage Document</SideNavItem>
        {hasAdmin() ? <SideNavItem href="/managerole" className="linkColor">Create And Manage Roles</SideNavItem> : ''}
        {hasAdmin() ? <SideNavItem href="manageusers" className="linkColor">Create And Manage Users</SideNavItem> : ''}
        <SideNavItem divider />
        <SideNavItem>Log Out</SideNavItem>
        <SideNavItem>Delete Account</SideNavItem>
        <SideNavItem>About DocStar</SideNavItem>
      </SideNav>
    );
  }
}


export default connect(null)(SideNavLink);
