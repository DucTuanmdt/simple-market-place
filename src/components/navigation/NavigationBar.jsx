import React, { useState } from "react";
import { Drawer, IconButton, Nav, Navbar, Sidenav } from "rsuite";

import {
  MdOutlineShoppingCart,
  MdOutlineNotificationsNone,
  MdOutlineHome,
  MdOutlineStarBorder,
  MdOutlineInfo,
} from "react-icons/md";
import MenuIcon from "@rsuite/icons/Menu";
import SearchIcon from "@rsuite/icons/Search";

import UserInfo from "./UserInfo";
import useToggle from "../../hooks/useToggle";

function NavigationBar() {
  const [showMobileMenu, toggleShowMobileMenu] = useToggle(false);
  const [activeKey, setActiveKey] = useState("catalog");

  const userInfo = {
    name: "John Smith",
    email: "johnsmith@gmail.com",
    avataSrc: "/images/user-avatar.jpg",
  };

  const renderNavItems = (className = "", showIcon) => {
    return (
      <Nav className={className} onSelect={setActiveKey} activeKey={activeKey}>
        <Nav.Item eventKey="home" icon={showIcon && <MdOutlineHome />}>
          Home
        </Nav.Item>
        <Nav.Item eventKey="news" icon={showIcon && <MdOutlineStarBorder />}>
          News
        </Nav.Item>
        <Nav.Item eventKey="catalog" icon={<SearchIcon />}>
          Catalog
        </Nav.Item>
        <Nav.Menu title="About" icon={showIcon && <MdOutlineInfo />}>
          <Nav.Item eventKey="company">Company</Nav.Item>
          <Nav.Item eventKey="team">Team</Nav.Item>
          <Nav.Item eventKey="contact">Contact</Nav.Item>
        </Nav.Menu>
        <Nav.Item
          className="d-lg-none"
          eventKey="catalog"
          icon={<MdOutlineShoppingCart />}
        >
          Cart
        </Nav.Item>
        <Nav.Item
          className="d-lg-none"
          eventKey="catalog"
          icon={<MdOutlineNotificationsNone />}
        >
          Notification
        </Nav.Item>
      </Nav>
    );
  };

  const renderMobileDrawer = () => {
    return (
      <Drawer
        open={showMobileMenu}
        onClose={toggleShowMobileMenu}
        size="xs"
        className="navigation-drawer-container"
        backdropClassName="navigation-drawer-backdrop"
        placement="left"
      >
        <Drawer.Body className="bg-light">
          <div>
            <Sidenav>
              <Sidenav.Body>
                {renderNavItems("d-flex flex-column w-100", true)}
              </Sidenav.Body>
            </Sidenav>
          </div>
        </Drawer.Body>
      </Drawer>
    );
  };

  return (
    <Navbar className="shadow-sm navigation-wrapper" appearance="subtle">
      <div className="container">
        <Nav className="d-inline d-lg-none">
          <Nav.Item onClick={toggleShowMobileMenu}>
            <MenuIcon style={{ top: "2px", position: "relative" }} />
          </Nav.Item>
        </Nav>
        <Navbar.Brand href="#" className="fw-500">
          <span className="text-black fw-700 ">D</span>RONEY
        </Navbar.Brand>

        {renderNavItems("d-none d-lg-block")}

        <Nav pullRight>
          <div className="nav-actions gap-3">
            <IconButton
              className="d-none d-lg-inline"
              icon={<MdOutlineShoppingCart />}
            />
            <IconButton
              className="d-none d-lg-inline"
              icon={<MdOutlineNotificationsNone />}
            />
            <UserInfo
              className="ms-2"
              {...userInfo}
              infoClassName="d-none d-lg-block"
            />
          </div>
        </Nav>
      </div>
      {renderMobileDrawer()}
    </Navbar>
  );
}

export default NavigationBar;
