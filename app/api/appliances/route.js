// Import the MySQL connection pool from db.js.
// This allows this API route to communicate with the database.
import pool from '../../../lib/db';


// =========================
// GET ALL APPLIANCES
// =========================

// GET is used to retrieve all appliances from the database.
export async function GET() {
    try {

        // Run a SQL query to retrieve every appliance
        // from the appliances table.
        const [rows] = await pool.query(
            'SELECT * FROM appliances'
        );

        // Return the appliances as a JSON response.
        return Response.json(rows);

    } catch (error) {

        // If the database query fails, return the error
        // message with HTTP status code 500.
        return Response.json(
            { error: error.message },
            { status: 500 }
        );
    }
}


// =========================
// CREATE APPLIANCE
// =========================

// POST is used to create a new appliance.
export async function POST(req) {
    try {

        // Read the information sent from the frontend.
        const {
            UserID,
            appliance_type,
            brand,
            model_number,
            serial_number
        } = await req.json();

        // Insert the new appliance into the database.
        // The ? placeholders are replaced with the values
        // in the array below.
        const [result] = await pool.query(
            'INSERT INTO appliances ' +
            '(UserID, appliance_type, brand, model_number, serial_number) ' +
            'VALUES (?, ?, ?, ?, ?)',

            [
                UserID,
                appliance_type,
                brand,
                model_number,
                serial_number
            ]
        );

        // Return the ID of the newly created appliance.
        // Status 201 means the resource was successfully created.
        return Response.json(
            { id: result.insertId },
            { status: 201 }
        );

    } catch (error) {

        // Return an error if the INSERT operation fails.
        return Response.json(
            { error: error.message },
            { status: 500 }
        );
    }
}


// =========================
// UPDATE APPLIANCE
// =========================

// PUT is used to update an existing appliance.
export async function PUT(req) {
    try {

        // Read the appliance ID and the new information
        // sent from the frontend.
        const {
            ApplianceID,
            brand,
            model_number
        } = await req.json();

        // Update the brand and model number for the
        // appliance with the matching ApplianceID.
        await pool.query(
            'UPDATE appliances ' +
            'SET brand = ?, model_number = ? ' +
            'WHERE ApplianceID = ?',

            [
                brand,
                model_number,
                ApplianceID
            ]
        );

        // Tell the frontend that the update was successful.
        return Response.json({
            message: "Updated"
        });

    } catch (error) {

        // Return an error if the UPDATE operation fails.
        return Response.json(
            { error: error.message },
            { status: 500 }
        );
    }
}


// =========================
// DELETE APPLIANCE
// =========================

// DELETE is used to remove an appliance from the database.
export async function DELETE(req) {
    try {

        // Get the URL of the current request.
        const { searchParams } = new URL(req.url);

        // Read the appliance ID from the URL.
        // Example: /api/appliances?id=5
        const id = searchParams.get('id');

        // Delete the appliance with the matching ApplianceID.
        await pool.query(
            'DELETE FROM appliances WHERE ApplianceID = ?',
            [id]
        );

        // Return a message confirming that the appliance
        // was successfully deleted.
        return Response.json({
            message: "Deleted"
        });

    } catch (error) {

        // Return an error if the DELETE operation fails.
        return Response.json(
            { error: error.message },
            { status: 500 }
        );
    }
}