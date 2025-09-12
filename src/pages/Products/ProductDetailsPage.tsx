import { useParams } from "react-router-dom";
import useLifts from "../../hooks/useLifts";
import { useEffect } from "react";


export default function ProductDetailsPage() {
    const { id } = useParams();
    const { lift: product, fetchLiftById } = useLifts();

    useEffect(() => {
        if (id) fetchLiftById(Number(id));
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="container my-5 vh-100">
            <img  src={`/images/products/${product.id}.jpg`} alt={product.name} style={{ maxWidth: '300px' }} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
        </div>
    );
}