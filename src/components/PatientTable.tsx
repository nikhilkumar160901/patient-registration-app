import { useEffect, useState } from 'react';
import { db } from '../db/initDB';
import { PGlite } from '@electric-sql/pglite';

export default function PatientTable({ refresh }: { refresh: boolean }) {
    const [patients, setPatients] = useState<any[]>([]);

    const fetchPatients = async (forceReload = false) => {
        let activeDb = db;

        if (forceReload) {
            activeDb = new PGlite('idb://patients-db');
            await activeDb.ready;
        }

        const result = await activeDb.query('SELECT * FROM patients');
        console.log('[PatientTable] Fetched:', result.rows);
        setPatients(result.rows);
    };


    useEffect(() => {
        fetchPatients();
    }, [refresh]);

    useEffect(() => {
        const channel = new BroadcastChannel('patient_updates');
        channel.onmessage = (event) => {
            console.log('[BroadcastChannel] Received:', event.data);
            if (event.data == 'refresh') {
                fetchPatients(true);
            }
        };

        return () => {
            channel.close();
        };
    }, []);

    return (
        <table>
            <thead>
                <tr><th>ID</th><th>Name</th><th>Age</th><th>Gender</th><th>Contact</th></tr>
            </thead>
            <tbody>
                {patients.map(p => (
                    <tr key={p.id}>
                        <td>{p.id}</td><td>{p.name}</td><td>{p.age}</td><td>{p.gender}</td><td>{p.contact}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}