import { useAuth } from '../../context/AuthProvider';
import { useLoaderData, useNavigate } from 'react-router-dom';
import UserOrders from './UserOrders';
import ReturnButton from '../../components/ReturnButton';
import type Lift from '../../interfaces/Lift';
import UserInfoCard from '../../components/userInfoCard';
import { Col, Row } from 'react-bootstrap';

export default function UserPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { lifts, orders, orderItems } = useLoaderData() as {
        lifts: Lift[],
        orders: any[],
        orderItems: any[]
    };

    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <div className="page-container m-3 bg-body min-vh-100">
            <Row className="align-items-between mb-4">

                <Col xs="2" md="auto" className="mb-3 mb-md-0">
                    <ReturnButton />
                </Col>

                <Col xs="12" sm="10" md className="text-end mb-3 mb-md-0">
                    <UserInfoCard user={user} />
                </Col>
            </Row>
            <UserOrders orders={orders} orderItems={orderItems} lifts={lifts} />
        </div>
    );
}