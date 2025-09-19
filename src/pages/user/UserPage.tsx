import { Card } from 'react-bootstrap';

import { useAuth } from '../../context/AuthProvider';
import { useLoaderData, useNavigate } from 'react-router-dom';
import UserOrders from './UserOrders';
import ReturnButton from '../../components/ReturnButton';
import type Lift from '../../interfaces/Lift';

export default function UserPage() {
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();
    const { lifts, orders, orderItems } = useLoaderData() as { 
        lifts: Lift[], 
        orders: any[], 
        orderItems: any[] 
    };


    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };



    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <div className="page-container m-3 bg-body min-vh-100">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 mx-3">
                <div>
                    <ReturnButton />
                </div>
                <Card className="px-4 py-2 border-0 mx-3 ">
                    <div className="fw-bold text-white-50">
                        <span className="text-primary">Namn:</span> {user.firstName} {user.lastName}
                    </div>
                    <div className="text-white-50">
                        <span className="text-primary">E-post:</span> {user.email}
                    </div>
                    <div className=" text-white-50">
                        <span className="text-primary">Telefon:</span> {user.phone || '—'}
                    </div>
                </Card>
                <div className="d-none d-md-block">
                    <button
                        className="btn btn-outline-primary border-1 shadow py-2 px-4 "
                        onClick={handleLogout}
                        type="button"
                    >
                        Logga ut
                    </button>
                </div>
            </div>
            <div className="d-block d-md-none mb-4">
                <button
                    className="btn btn-outline-primary border-1 shadow py-2 px-4 w-100"
                    onClick={handleLogout}
                    type="button"
                >
                    Logga ut
                </button>
            </div>
             <UserOrders orders={orders} orderItems={orderItems} lifts={lifts} />
      </div>
    );
}