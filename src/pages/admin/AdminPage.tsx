
import { NavLink, Outlet } from "react-router-dom";

import { useAuth } from "../../context/AuthProvider";
import UserInfoCard from "../../components/userInfoCard";
import { Container, Nav, Navbar } from "react-bootstrap";


export default function AdminPage() {
    const { user } = useAuth();
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="text-white mx-xs-1 mx-md-0 mt-0">

            <header className="bg-body sticky-top pe-5">
                <Navbar expand="lg" className="navbar p-0">
                    <Container fluid className="p-2">
                        <UserInfoCard user={user} />
                        <Navbar.Collapse className="navbar-collapse">
                            <Nav className="navbar-nav ms-auto">
                                <Nav.Item>
                                    <Nav.Link as={NavLink} to="/admin" end>Dashboard</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={NavLink} to="/admin/orders">Ordrar</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={NavLink} to="/admin/customers">Kunder</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={NavLink} to="/admin/lifts">Liftar</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={NavLink} to="/admin/categories">Bränsle & Kategorier</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={NavLink} to="/">Hemsida</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>

            <div className="mt-3 m-5">
                <Outlet />
            </div>
        </div>
    );

}