
import ProductTab from "./ProductTab";
import type Lift from "../../interfaces/Lift";
import { useLoaderData } from "react-router-dom";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserTab from "./UserTab";
import type User from "../../interfaces/User";
import OrderTab from "./OrderTab";
import { useAuth } from "../../context/AuthProvider";
import UserInfoCard from "../../components/userInfoCard";
import CategoryTab from "./categories/CategoryTab";

interface Fuel {
    id: number;
    name: string;
}
interface Category {
    id: number;
    name: string;
}


export default function AdminPage() {
    const { user } = useAuth();
    const { lifts, fuels, liftCategories, users, customerWithOrders, orders, orderItems, liftDetails } = useLoaderData() as {
        lifts: Lift[];
        fuels: Fuel[];
        liftCategories: Category[];
        users: User[];
        customerWithOrders: any[];
        orders: any[],
        orderItems: any[]
        liftDetails: any[]
    };
    if (!user) {
        return <div>Loading...</div>;
    }

    return <div className="text-white m-xs-1 m-md-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 mx-3">
            <h1 className="text-primary mb-5">JB-Lift Admin </h1>
            <UserInfoCard user={user} />
        </div>

        <Tabs
            defaultActiveKey="dashboard"
            id="uncontrolled-tab-example"
            className="mb-2 admin-tabs "
        >
            <Tab eventKey="dashboard" title="Dashboard">
                <h2 className="text-primary text-center my-5">Dashboard</h2>
                <p className="text-center">Välkommen till adminpanelen. Välj en flik för att hantera ordrar, kunder, liftar eller kategorier.</p>
            </Tab>

            <Tab eventKey="orders" title="Ordrar">

                <OrderTab users={users} orders={orders} orderItems={orderItems} lifts={lifts} />
            </Tab>
            <Tab eventKey="customers" title="Kunder">
                <UserTab customerWithOrders={customerWithOrders} users={users} />
            </Tab>
            <Tab eventKey="lifts" title="Liftar">
                <ProductTab liftDetails={liftDetails} />
            </Tab>
            <Tab eventKey="categories" title="Bränsle och Kategorier">
                <CategoryTab fuels={fuels} liftCategories={liftCategories} />
            </Tab>
        </Tabs>

    </div>;
}