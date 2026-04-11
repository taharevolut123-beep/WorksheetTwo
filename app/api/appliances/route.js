import pool from '../../../lib/db';

// GET ALL
export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM appliances');
        return Response.json(rows);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

// CREATE
export async function POST(req) {
    try {
        const { UserID, appliance_type, brand, model_number, serial_number } = await req.json();
        const [result] = await pool.query(
            'INSERT INTO appliances (UserID, appliance_type, brand, model_number, serial_number) VALUES (?, ?, ?, ?, ?)',
            [UserID, appliance_type, brand, model_number, serial_number]
        );
        return Response.json({ id: result.insertId }, { status: 201 });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

// UPDATE
export async function PUT(req) {
    try {
        const { ApplianceID, brand, model_number } = await req.json();
        await pool.query(
            'UPDATE appliances SET brand = ?, model_number = ? WHERE ApplianceID = ?',
            [brand, model_number, ApplianceID]
        );
        return Response.json({ message: "Updated" });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

// DELETE
export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        await pool.query('DELETE FROM appliances WHERE ApplianceID = ?', [id]);
        return Response.json({ message: "Deleted" });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}