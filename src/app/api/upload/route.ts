import { query } from '@/db'

export async function POST(req: Request) {
	try {
		const formData = await req.formData()
		const firstName = formData.get('firstName')
		const file = formData.get('file') as File

		// console.log(file)
		// console.log(firstName)

		// Convert file to buffer
		const bytes = await file.arrayBuffer()
		const buffer = Buffer.from(bytes)

		//insert into db
		const result = await query(
			'INSERT INTO test ("first_name", "image") VALUES ($1, $2)',
			[firstName, buffer]
		)

		console.log(result)
		return new Response('Uploaded successfully')
	} catch (error) {
		console.error('Error:', error)
		return new Response('Error uploading', { status: 500 })
	}
}
