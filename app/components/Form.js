// "use client" tells Next.js that this component
// should run on the client side.
"use client";

// Import React hooks used by this component.
import { useState, useEffect } from "react";


export default function Form() {

    // Stores the list of users retrieved from the database.
    const [users, setUsers] = useState([]);

    // Stores the list of appliances retrieved from the database.
    const [appliances, setAppliances] = useState([]);


    // =========================
    // FORM STATES
    // =========================

    // Stores the name entered into the user form.
    const [firstName, setFirstName] = useState("");

    // Stores the email entered into the user form.
    const [email, setEmail] = useState("");

    // Stores the UserID selected from the dropdown.
    const [selectedUser, setSelectedUser] = useState("");

    // Stores the appliance type entered by the user.
    const [appType, setAppType] = useState("");

    // Stores the appliance brand entered by the user.
    const [brand, setBrand] = useState("");


    // =========================
    // LOAD DATA
    // =========================

    // useEffect runs when the component is first loaded.
    // It calls refreshData() to retrieve the current
    // users and appliances from the API.
    useEffect(() => {
        refreshData();
    }, []);


    // =========================
    // REFRESH DATA
    // =========================

    // Retrieves users and appliances from the API.
    const refreshData = async () => {

        // Request all users from the users API.
        const uRes = await fetch("/api/users");

        // Request all appliances from the appliances API.
        const aRes = await fetch("/api/appliances");

        // Convert the responses to JSON and store
        // them in the React state.
        setUsers(await uRes.json());
        setAppliances(await aRes.json());
    };


    // =========================
    // ADD USER
    // =========================

    // Handles the form submission for creating a user.
    const addUser = async (e) => {

        // Prevent the browser from refreshing the page
        // when the form is submitted.
        e.preventDefault();

        // Send the new user's information to the
        // users API using a POST request.
        await fetch("/api/users", {
            method: "POST",

            // Convert the JavaScript object into JSON.
            body: JSON.stringify({
                first_name: firstName,

                // A default last name is used in this form.
                last_name: "User",

                email: email,

                // A default Eircode is used in this form.
                eircode: "N/A"
            })
        });

        // Clear the name and email fields
        // after creating the user.
        setFirstName("");
        setEmail("");

        // Refresh the user and appliance lists
        // so the new user appears in the dropdown.
        refreshData();
    };


    // =========================
    // ADD APPLIANCE
    // =========================

    // Handles the form submission for adding
    // an appliance to a user.
    const addAppliance = async (e) => {

        // Prevent the page from refreshing.
        e.preventDefault();

        // Send the appliance information to the
        // appliances API using a POST request.
        await fetch("/api/appliances", {
            method: "POST",

            // Convert the appliance information
            // into JSON before sending it.
            body: JSON.stringify({
                UserID: selectedUser,
                appliance_type: appType,
                brand: brand
            })
        });

        // Refresh the data so the new appliance
        // appears in the inventory list.
        refreshData();
    };


    // =========================
    // DELETE APPLIANCE
    // =========================

    // Deletes an appliance using its ID.
    const deleteApp = async (id) => {

        // Send a DELETE request to the appliances API.
        // The appliance ID is included in the URL.
        await fetch(
            `/api/appliances?id=${id}`,
            {
                method: "DELETE"
            }
        );

        // Refresh the data after deleting the appliance.
        refreshData();
    };


    // =========================
    // FRONTEND / USER INTERFACE
    // =========================

    return (
        <div style={{ padding: "20px" }}>

            {/* Create Owner Section */}
            <h2>1. Create Owner</h2>

            <form onSubmit={addUser}>

                {/* Input for the user's name */}
                <input
                    placeholder="Name"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />

                {/* Input for the user's email */}
                <input
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                {/* Button for creating the user */}
                <button type="submit">
                    Save User
                </button>

            </form>


            {/* Link Appliance Section */}
            <h2>2. Link Appliance</h2>

            <form onSubmit={addAppliance}>

                {/* Dropdown containing the users retrieved
                    from the database */}
                <select
                    onChange={e => setSelectedUser(e.target.value)}
                >

                    <option>Select User</option>

                    {/* Create an option for each user */}
                    {users.map(u => (
                        <option
                            key={u.UserID}
                            value={u.UserID}
                        >
                            {u.first_name}
                        </option>
                    ))}

                </select>


                {/* Input for appliance type */}
                <input
                    placeholder="Appliance Type"
                    onChange={e => setAppType(e.target.value)}
                />


                {/* Input for appliance brand */}
                <input
                    placeholder="Brand"
                    onChange={e => setBrand(e.target.value)}
                />


                {/* Button for linking the appliance */}
                <button type="submit">
                    Link to User
                </button>

            </form>


            {/* Inventory Section */}
            <h2>3. Inventory (Delete/Update)</h2>

            <ul>

                {/* Display each appliance in the inventory */}
                {appliances.map(a => (

                    <li key={a.ApplianceID}>

                        {/* Display the appliance type and brand */}
                        {a.appliance_type} - {a.brand}

                        {/* Delete button for the appliance */}
                        <button
                            onClick={() =>
                                deleteApp(a.ApplianceID)
                            }
                            style={{ color: 'red' }}
                        >
                            X
                        </button>

                    </li>

                ))}

            </ul>

        </div>
    );
}