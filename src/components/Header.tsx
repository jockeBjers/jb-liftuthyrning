import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import routes from "../routes";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

export default function Header() {
    const [expanded, setExpanded] = useState(false);
    const { user } = useAuth();

    return (
        <header className="bg-secondary sticky-top">
            <Navbar expanded={expanded} expand="lg" className="navbar p-0">
                <Container fluid className="p-2">
                    <Navbar.Brand as={Link} to="/" className="ms-2 text-decoration-none">
                        <h1 className="fs-1">JB-Liftuthyrning</h1>
                    </Navbar.Brand>

                    <Navbar.Toggle
                        className="bg-primary border-0 m-2 rounded-0 p-1"
                        onClick={() => setExpanded(!expanded)}
                    />
                    <Navbar.Collapse className="navbar-collapse">
                        <Nav className="navbar-nav ms-auto">
                            {routes
                                .filter(route => route.menuLabel)
                                .filter(route => {
                                    const path = route.path.toLowerCase();

                                    // hide login/profile/admin
                                    if (["/login", "/profile"].includes(path)) return false;
                                    if (path === "/admin" && (!user || user.role !== "admin")) return false;

                                    return true;
                                })
                                .map(({ menuLabel, path }, i) => (
                                    <Nav.Link
                                        key={i}
                                        as={NavLink}
                                        to={path}
                                        className="nav-link px-lg-5"
                                        onClick={() => setTimeout(() => setExpanded(false), 200)}
                                    >
                                        {menuLabel}
                                    </Nav.Link>
                                ))}

                            {user ? (
                                <>
                                    <Nav.Link
                                        as={NavLink}
                                        to="/profile"
                                        className="nav-link px-lg-5"
                                        onClick={() => setTimeout(() => setExpanded(false), 200)}
                                    >
                                        Min sida
                                    </Nav.Link>
                                </>
                            ) : (
                                <Nav.Link
                                    as={NavLink}
                                    to="/login"
                                    className="nav-link px-lg-5"
                                    onClick={() => setTimeout(() => setExpanded(false), 200)}
                                >
                                    Logga in
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
