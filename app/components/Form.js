"use client";
import { useState, useEffect } from "react";

export default function Form() {
    const [users, setUsers] = useState([]);
    const [appliances, setAppliances] = useState([]);
    
    // Form States
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [appType, setAppType] = useState("");
    const [brand, setBrand] = useState("");

    useEffect(() => { refreshData(); }, []);

    const refreshData = async () => {
        const uRes = await fetch("/api/users");
        const aRes = await fetch("/api/appliances");
        setUsers(await uRes.json());
        setAppliances(await aRes.json());
    };

    const addUser = async (e) => {
        e.preventDefault();
        await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ first_name: firstName, last_name: "User", email: email, eircode: "N/A" })
        });
        setFirstName(""); setEmail("");
        refreshData();
    };

    const addAppliance = async (e) => {
        e.preventDefault();
        await fetch("/api/appliances", {
            method: "POST",
            body: JSON.stringify({ UserID: selectedUser, appliance_type: appType, brand: brand })
        });
        refreshData();
    };

    const deleteApp = async (id) => {
        await fetch(`/api/appliances?id=${id}`, { method: "DELETE" });
        refreshData();
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>1. Create Owner</h2>
            <form onSubmit={addUser}>
                <input placeholder="Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <button type="submit">Save User</button>
            </form>

            <h2>2. Link Appliance</h2>
            <form onSubmit={addAppliance}>
                <select onChange={e => setSelectedUser(e.target.value)}>
                    <option>Select User</option>
                    {users.map(u => <option key={u.UserID} value={u.UserID}>{u.first_name}</option>)}
                </select>
                <input placeholder="Appliance Type" onChange={e => setAppType(e.target.value)} />
                <input placeholder="Brand" onChange={e => setBrand(e.target.value)} />
                <button type="submit">Link to User</button>
            </form>

            <h2>3. Inventory (Delete/Update)</h2>
            <ul>
                {appliances.map(a => (
                    <li key={a.ApplianceID}>
                        {a.appliance_type} - {a.brand} 
                        <button onClick={() => deleteApp(a.ApplianceID)} style={{color: 'red'}}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}