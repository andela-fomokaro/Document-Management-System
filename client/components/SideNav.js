import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { SideNav, SideNavItem, Button } from 'react-materialize';


class SideNavLink extends React.Component {
  render() {
    return (
      <SideNav
        trigger={<Button floating large className="pulse blue-grey darken-4 right" waves="light" icon="menu" />}
        options={{ closeOnClick: true }}
      >
        <SideNavItem>My Profile</SideNavItem>
        <SideNavItem><Link to="/loadDocuments">Manage Document</Link></SideNavItem>
        <SideNavItem><Link to="/managerole">Create And Manage Roles</Link></SideNavItem>
        <SideNavItem>Create And Manage Users</SideNavItem>
        <SideNavItem divider />
        <SideNavItem>Log Out</SideNavItem>
        <SideNavItem>About DocStar</SideNavItem>
      </SideNav>
    );
  }
}


export default connect(null)(SideNavLink);
