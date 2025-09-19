
import ProductTab from "./ProductTab";
import type Lift from "../../interfaces/Lift";
import { useLoaderData } from "react-router-dom";
import { Col, Row, Table } from "react-bootstrap";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserTab from "./UserTab";
import type User from "../../interfaces/User";

interface Fuel {
    id: number;
    name: string;
}
interface Category {
    id: number;
    name: string;
}


export default function AdminPage() {
    const { lifts, fuels, liftCategories, users, customerWithOrders } = useLoaderData() as {
        lifts: Lift[];
        fuels: Fuel[];
        liftCategories: Category[];
        users: User[];
        customerWithOrders: any[];
    };

    return <div className="text-white m-xs-1 m-md-5">

        <h1 className="text-primary mb-5">JB-Lift Admin </h1>

        <Tabs
            defaultActiveKey="lifts"
            id="uncontrolled-tab-example"
            className="mb-4 admin-tabs "
                        
        >
            <Tab eventKey="lifts" title="Liftar">
                <ProductTab lifts={lifts} />

            </Tab>
            <Tab eventKey="categories" title="Bränsle och Kategorier">

                <Row className="m-0 g-4">

                    <Col xs="12" md="6" className="p-2 " >
                        <Table striped bordered hover>
                            <thead >
                                <tr>
                                    <th>#</th>
                                    <th>Typ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fuels.map((fuel) => (
                                    <tr key={fuel.id}>
                                        <td>{fuel.id}</td>
                                        <td>{fuel.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                    <Col xs="12" md="6" className="p-2">
                        <Table striped bordered hover >
                            <thead >
                                <tr>
                                    <th>#</th>
                                    <th>Kategori</th>
                                </tr>
                            </thead>
                            <tbody>
                                {liftCategories.map((category) => (
                                    <tr key={category.id}>
                                        <td>{category.id}</td>
                                        <td>{category.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Tab>
            <Tab eventKey="customers" title="Kunder">
               
               <UserTab customerWithOrders={customerWithOrders} users={users} />
            </Tab>
        </Tabs>

    </div>;
}