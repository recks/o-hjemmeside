import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import {Link} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export type MenuData = Array<MenuItemData>;
type MenuItemData = {
    titel: string;
    indhold: string | MenuData;
}

function MenuItem(menuitem : MenuItemData, level : number) {
    //console.log("MI: " + menuitem.titel + ", " + menuitem.indhold + " [" + (typeof menuitem.indhold) + "] -- level=" + level)
    if (typeof menuitem.indhold === "string") {
        if (menuitem.indhold === "") {
            return "";
        }
        if (level === 1) {
            //console.log("Nav-link " + menuitem.titel + ", " + menuitem.indhold)
            //return menuitem.indhold.includes(".") ? <Nav.Link href={menuitem.indhold} download key={menuitem.indhold}>{menuitem.titel}</Nav.Link> :  <Nav.Link as={Link} to={menuitem.indhold} key={menuitem.indhold} state={{ "titel": menuitem.titel }}>{menuitem.titel}</Nav.Link>;
            return menuitem.indhold.includes (".") ? 
                <a className="dropdown-item" href={menuitem.indhold}>{menuitem.titel}</a> :
                <Nav.Link as={Link} to={menuitem.indhold} key={menuitem.indhold} state={{ "titel": menuitem.titel }}>{menuitem.titel}</Nav.Link>;
        } else {
            //console.log("NavDropdown " + menuitem.titel + ", " + menuitem.indhold)
            return menuitem.indhold === "---" ? 
                <NavDropdown.Divider key="---"/> :
                //menuitem.indhold.includes(".") ? <NavDropdown.Item key={menuitem.indhold} href={menuitem.indhold} download>{menuitem.titel}</NavDropdown.Item> : <NavDropdown.Item key={menuitem.indhold} as={Link} to={menuitem.indhold} state={{ "titel": menuitem.titel }}>{menuitem.titel}</NavDropdown.Item>;
                menuitem.indhold.includes(".") ?
                    <a className="dropdown-item" href={menuitem.indhold}>{menuitem.titel}</a> :
                    <NavDropdown.Item key={menuitem.indhold} as={Link} to={menuitem.indhold} state={{ "titel": menuitem.titel }}>{menuitem.titel}</NavDropdown.Item>;
        }
    } else {
        // undermenu
        return (
            <NavDropdown key={menuitem.titel} title={menuitem.titel}>
                {MenuContent(menuitem.indhold, "", level+1)}
            </NavDropdown>
        )
    }
}

function MenuContent(md: MenuData, facebook : string, level : number) {
    //console.log("MD: " + md + ", level=" + level);
    let items = md.map(function (item,  index) {return MenuItem(item, level)});
    let fb = facebook === "" ? "" : <Nav.Link href={facebook} key="facebook-link"><Image src="facebook.svg" style={{height:"1em"}}/></Nav.Link>
    return (level === 1) ? (
        <Nav key="menu-nav" className="me-auto">
            {items}
            {fb}
        </Nav>
    ) : <>{items}</>
};

interface MenuProps {
    navn: string;
    logo: string;
    facebook: string;
    menu: MenuData;
}

class Menu extends Component<MenuProps> {
    render() {
        const {navn, logo, facebook, menu} = this.props;
        let logohtml = logo === "" ? "" : <Navbar.Brand key="navbar-container-brand" href="./"><Image src={logo}/> {navn}</Navbar.Brand>
        return (
        <Navbar key="navbar" expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
            <Container key="navbar-container">
                {logohtml}
                <Navbar.Toggle key="navbar-container-toggle" aria-controls="basic-navbar-nav" />
                <Navbar.Collapse key="basic-navbar-nav">
                    {MenuContent(menu, facebook, 1)}
                </Navbar.Collapse>
            </Container>
        </Navbar>
        );
    }
}

export default Menu;
