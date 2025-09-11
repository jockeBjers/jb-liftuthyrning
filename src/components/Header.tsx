import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import routes from "../routes";

export default function Header() {
    return (
        <header className="bg-secondary">
            <Navbar expand="lg" className="navbar p-0">
                <Container fluid className="container px-0">
                    <Navbar.Brand as={Link} to="/" className="ms-2">
                        <h1 className=" text-black">Appstopher</h1>
                    </Navbar.Brand>
                    <Navbar.Toggle className="me-2" />
                    <Navbar.Collapse className="navbar-collapse">
                        <Nav className="navbar-nav ms-auto">
                            {routes.filter(x => x.menuLabel).map(({ menuLabel, path }, i) =>
                                <Nav.Link
                                    key={i}
                                    as={NavLink}
                                    to={path}
                                    className="nav-link px-lg-5" 
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