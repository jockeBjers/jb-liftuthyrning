import { Link, NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown, ButtonGroup } from "react-bootstrap";
import routes from "../routes";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import CartCanvas from "../checkoutCart/CartCanvas";

export default function Header() {
    const [expanded, setExpanded] = useState(false);
    const { user } = useAuth();
    const { logoutUser } = useAuth();
    const navigate = useNavigate();
    const [showCart, setShowCart] = useState(false);

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    };

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
                                expanded ? (
                                    <>
                                        <Nav.Link
                                            as={NavLink}
                                            to="/profile"
                                            className="nav-link px-lg-5"
                                            onClick={() => setTimeout(() => setExpanded(false), 200)}
                                        >
                                            Profil
                                        </Nav.Link>

                                        {user.role === "admin" && (
                                            <Nav.Link
                                                as={NavLink}
                                                to="/admin"
                                                className="nav-link px-lg-5"
                                                onClick={() => setTimeout(() => setExpanded(false), 200)}
                                            >
                                                Admin
                                            </Nav.Link>
                                        )}

                                        <Nav.Link
                                            onClick={() => {
                                                handleLogout();
                                                setExpanded(false);
                                            }}
                                            className="nav-link px-lg-5"
                                        >
                                            Logga ut
                                        </Nav.Link>
                                        <Nav.Link
                                            onClick={() => {
                                                setShowCart(true);
                                                setExpanded(false);
                                            }}
                                            className="nav-link px-lg-5"
                                        >
                                            Kundvagn
                                        </Nav.Link>
                                    </>
                                ) : (

                                    <Dropdown as={ButtonGroup}>
                                        <Dropdown.Toggle
                                            variant="link"
                                            className="nav-link px-lg-5 fw-bold text-decoration-none"
                                        >
                                            {user.firstName} {user.lastName.slice(0, 1)}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item as={NavLink} to="/profile" className="nav-link px-lg-5">
                                                Profil
                                            </Dropdown.Item>

                                            {user.role === "admin" && (
                                                <Dropdown.Item as={NavLink} to="/admin" className="nav-link px-lg-5">
                                                    Admin
                                                </Dropdown.Item>
                                            )}

                                            <Dropdown.Item onClick={handleLogout} className="nav-link px-lg-5">
                                                Logga ut
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => setShowCart(true)} className="nav-link px-lg-5">
                                                Kundvagn
                                                <CartCanvas show={showCart} onHide={() => setShowCart(false)} />
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                )
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
                            <CartCanvas show={showCart} onHide={() => setShowCart(false)} />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
