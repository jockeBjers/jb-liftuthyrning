import { useState, useEffect } from 'react';

import type Lift from '../interfaces/Lift';
export default function useLifts(id?: number) {
    const [lifts, setLifts] = useState([]);
    const [lift, setLift] = useState<Lift | null>(null);

    /* get all lifts */
    const fetchLifts = async () => {
        try {
            const response = await fetch('http://localhost:5173/api/lifts');

            setLifts(await response.json());
        } catch (error) {
            console.error('Error fetching lifts:', error);
        }
    }
    useEffect(() => { fetchLifts(); }, []);

    /* get single lift */

    const fetchLiftById = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:5173/api/lifts/${id}`);
            setLift(await response.json());
        } catch (error) {
            console.error('Error fetching lift:', error);
        }
    };
    useEffect(() => {
        if (id) {
            fetchLiftById(id);
        }
    }, [id]);

    return { lifts, fetchLifts, lift, fetchLiftById };
}