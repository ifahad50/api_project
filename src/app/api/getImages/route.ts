import { query } from '@/db'

export async function GET() {
	try {
		const result = await query('SELECT * FROM test')
		return new Response(JSON.stringify(result.rows))
	} catch (error) {
		console.error('Error:', error)
		return new Response('Error fetching images', { status: 500 })
	}
}
