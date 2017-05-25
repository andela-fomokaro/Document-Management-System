import React from 'react';
import { SideNav, SideNavItem, Button } from 'react-materialize';
import { hasAdmin } from '../utils/helpers';


const SideNavLink = () =>

     (
       <SideNav
         trigger={<Button
           floating large
           className="blue-grey darken-4 right tooltipped"
           data-position="left" data-delay="10" data-tooltip="Contains navigation links"
            waves="light" icon="menu"
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


export default SideNavLink;
