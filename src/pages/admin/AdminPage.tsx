
import { NavLink, Outlet } from "react-router-dom";

import { useAuth } from "../../context/AuthProvider";
import UserInfoCard from "../../components/userInfoCard";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useState } from "react";


export default function AdminPage() {

    const [expanded, setExpanded] = useState(false);
    const { user } = useAuth();
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="text-white mx-xs-1 mx-md-0 mt-0">

            <header className="bg-body sticky-top pe-lg-5 pe-0">

                <Navbar expanded={expanded} expand="lg" className="navbar p-0">
                    <Container fluid className="p-2">

                        <UserInfoCard user={user} />

                        <Navbar.Toggle
                            className="bg-primary border-0 m-2 rounded-0 p-1"
                            onClick={() => setExpanded(!expanded)}
                        />
                        <Navbar.Collapse className="navbar-collapse">
                            <Nav className="navbar-nav ms-auto">
                                <Nav.Item>
                                    <Nav.Link as={NavLink} to="/admin" end onClick={() => setExpanded(false)} className="px-lg-2 px-xl-4">
                                        Dashboard
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={NavLink} to="/admin/orders" onClick={() => setExpanded(false)} className="px-lg-2 px-xl-4">
                                        Ordrar
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={NavLink} to="/admin/customers" onClick={() => setExpanded(false)} className="px-lg-2 px-xl-4">
                                        Kunder
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={NavLink} to="/admin/lifts" onClick={() => setExpanded(false)} className="px-lg-2 px-xl-4">
                                        Liftar
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={NavLink} to="/admin/categories" onClick={() => setExpanded(false)} className="px-lg-2 px-xl-4">
                                        Bränsle & Kategorier
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={NavLink} to="/" onClick={() => setExpanded(false)} className="px-lg-2 px-xl-4">
                                        Hemsida
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

            </header>
            <div className="m-lg-5 m-md-4 m-sm-3 m-xs-2">
                <Outlet />
            </div>
        </div>
    );

}