import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import routes from "../routes";
import { useState } from "react";

export default function Header() {
const [expanded, setExpanded] = useState(false);

    return (
         <header className="bg-secondary sticky-top ">
            <Navbar expanded={expanded} expand="lg" className="navbar p-0">
                <Container fluid className="p-2">
                    <Navbar.Brand as={Link} to="/" className="ms-2 text-decoration-none">
                        <h1 className="fs-1 ">JB-Liftuthyrning</h1>
                    </Navbar.Brand>
                    <Navbar.Toggle className="bg-primary border-0 m-2 rounded-0 p-1" onClick={() => setExpanded(!expanded)} />
                    <Navbar.Collapse className="navbar-collapse">
                        <Nav className="navbar-nav ms-auto">
                            {routes.filter(x => x.menuLabel).map(({ menuLabel, path }, i) =>
                                <Nav.Link
                                    key={i}
                                    as={NavLink}
                                    to={path}
                                    className="nav-link px-lg-5"
                                    onClick={() => setTimeout(() => setExpanded(false), 200)}
                                >
                                    {menuLabel}
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}