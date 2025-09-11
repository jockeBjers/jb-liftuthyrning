import { useState, useEffect } from 'react';

export default function useLifts() {
    const [lifts, setLifts] = useState([]);
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5173/api/products');

            setLifts(await response.json());
        } catch (error) {
            console.error('Error fetching lifts:', error);
        }
    }

    useEffect(() => { fetchUsers(); }, []);
    return { lifts: lifts, fetchUsers};
}