import pool from '../../../lib/db';

export async function GET() {
    try {
        const [users] = await pool.query('SELECT * FROM users');
        return Response.json(users);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { first_name, last_name, email, eircode } = await req.json();
        const [result] = await pool.query(
            "INSERT INTO users (first_name, last_name, email, eircode) VALUES (?, ?, ?, ?)",
            [first_name, last_name, email, eircode]
        );
        return Response.json({ UserID: result.insertId, first_name, email }, { status: 201 });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}