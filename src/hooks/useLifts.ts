import { useState, useEffect } from 'react';

import type Lift from '../interfaces/lifts';

export default function useLifts() {
    const [lifts, setLifts] = useState([]);
    const [lift, setLift] = useState<Lift | null>(null);
    const fetchLifts = async () => {
        try {
            const response = await fetch('http://localhost:5173/api/lifts');

            setLifts(await response.json());
        } catch (error) {
            console.error('Error fetching lifts:', error);
        }
    }

    const fetchLiftById = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:5173/api/lifts/${id}`);
            setLift(await response.json());
        } catch (error) {
            console.error('Error fetching lift:', error);
        }
    };


    useEffect(() => { fetchLifts(); }, []);
    return { lifts: lifts, fetchLifts, lift, fetchLiftById };
}