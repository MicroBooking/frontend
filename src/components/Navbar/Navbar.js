import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  NavLabel,
} from './NavbarElements';
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
  
        <NavMenu>
          <NavLink to='/' activestyle = "true">
            Home
          </NavLink>
          <NavLink to='/create' activestyle = "true">
            Create listing
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavLabel>
          Signed in as user 1
        </NavLabel>
      </Nav>
    </>
  );
};
  
export default Navbar;