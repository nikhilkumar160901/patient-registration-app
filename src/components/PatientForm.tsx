import { useState } from 'react';
import { db } from '../db/initDB';

export default function PatientForm({ onRegister }: { onRegister: () => void }) {
    const [form, setForm] = useState({ name: '', age: '', gender: '', contact: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, age, gender, contact } = form;
        await db.exec(
            `INSERT INTO patients (name, age, gender, contact) VALUES ('${name}', ${age}, '${gender}', '${contact}')`
        );

        onRegister();
        setForm({ name: '', age: '', gender: '', contact: '' });

        const channel = new BroadcastChannel('patient_updates');
        channel.postMessage('refresh');
        console.log('[BroadcastChannel] Sent: refresh');
        channel.close();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
            <input name="age" value={form.age} onChange={handleChange} placeholder="Age" type="number" required />
            <select name="gender" value={form.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            <input name="contact" value={form.contact} maxLength={10} minLength={10} onChange={handleChange} placeholder="Contact" />
            <button type="submit">Register</button>
        </form>
        
    );
}
