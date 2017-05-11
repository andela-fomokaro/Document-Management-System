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
            <SideNavItem><Link to="/loadDocuments">Documents</Link></SideNavItem>
            <SideNavItem href="#!second">Document Types</SideNavItem>
            <SideNavItem href="#!second">My Profile</SideNavItem>
             <SideNavItem href="#!second">Admininistrator</SideNavItem>
            <SideNavItem divider />
            <SideNavItem subheader>Log Out</SideNavItem>
          </SideNav>
    );
  }
}


export default connect(null)(SideNavLink);
