import React from 'react';
import { Link } from 'react-router';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { SideNav, SideNavItem, Button } from 'react-materialize';


class SideNavLink extends React.Component {
  render() {
    return (
          <SideNav
            trigger={<Button floating large className="blue-grey darken-4 right" waves="light" icon="menu" />}
            options={{ closeOnClick: true }}
          >
            <SideNavItem href="#!icon">About DocStar</SideNavItem>
            <SideNavItem><Link to="/loadDocuments">View All Document</Link></SideNavItem>
            <SideNavItem href="#!second">Find Document</SideNavItem>
            <SideNavItem href="#!second">Create Role</SideNavItem>
            <SideNavItem divider />
            <SideNavItem subheader>Log Out</SideNavItem>
          </SideNav>
    );
  }
}


export default connect(null)(SideNavLink);
