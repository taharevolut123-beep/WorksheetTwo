// Import the MySQL connection pool.
// This allows the API route to communicate with the database.
import pool from '../../../lib/db';


// =========================
// GET ALL USERS
// =========================

// GET is used to retrieve all users from the database.
export async function GET() {
    try {

        // Run a SQL query to retrieve all users
        // from the users table.
        const [users] = await pool.query(
            'SELECT * FROM users'
        );

        // Return the users as a JSON response.
        return Response.json(users);

    } catch (error) {

        // If the database query fails, return
        // the error message with status 500.
        return Response.json(
            { error: error.message },
            { status: 500 }
        );
    }
}


// =========================
// CREATE USER
// =========================

// POST is used to create a new user.
export async function POST(req) {
    try {

        // Read the user information sent
        // from the frontend.
        const {
            first_name,
            last_name,
            email,
            eircode
        } = await req.json();

        // Insert the new user into the users table.
        // The ? placeholders are replaced with the
        // values in the array below.
        const [result] = await pool.query(
            'INSERT INTO users ' +
            '(first_name, last_name, email, eircode) ' +
            'VALUES (?, ?, ?, ?)',

            [
                first_name,
                last_name,
                email,
                eircode
            ]
        );

        // Return information about the newly created user.
        // result.insertId contains the generated UserID.
        return Response.json(
            {
                UserID: result.insertId,
                first_name,
                email
            },
            { status: 201 }
        );

    } catch (error) {

        // Return an error if creating the user fails.
        return Response.json(
            { error: error.message },
            { status: 500 }
        );
    }
}