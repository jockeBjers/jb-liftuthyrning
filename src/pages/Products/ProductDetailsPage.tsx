import { useParams } from "react-router-dom";
import useLifts from "../../hooks/useLifts";
import { useEffect } from "react";

type Lift = {
    id: number;
    name: string;
    description: string;
};
export default function ProductDetailsPage() {
    const { id } = useParams();
    const { lift: product, fetchLiftById } = useLifts();

    useEffect(() => {
        if (id) fetchLiftById(Number(id));
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
        </div>
    );
}