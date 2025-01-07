import { Pool } from 'pg'

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: parseInt(process.env.DB_PORT || '5432'),
})

export async function query(text: string, params?: unknown[]) {
	try {
		const result = await pool.query(text, params)
		return result
	} catch (error) {
		console.error('Database query error:', error)
		throw error
	}
}

export default pool
