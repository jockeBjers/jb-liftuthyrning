import { Card } from "react-bootstrap";

export default function UserInfoCard({ user }: {
    user: {
        firstName: string;
        lastName: string;
        email: string;
        phone?: string | null
    }
}) {
    return (<Card className="px-4 py-2 border-0 mx-3 ">
        <div className="fw-bold text-white-50">
            <span className="text-primary">Namn:</span> {user.firstName} {user.lastName}
        </div>
        <div className="text-white-50">
            <span className="text-primary">E-post:</span> {user.email}
        </div>
        <div className=" text-white-50">
            <span className="text-primary">Telefon:</span> {user.phone || '—'}
        </div>
    </Card>);
}