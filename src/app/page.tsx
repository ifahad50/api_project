'use client'
import { useEffect, useState } from 'react'

interface ImageData {
	id: number
	first_name: string
	image: Buffer
}

export default function Home() {
	const [images, setImages] = useState<ImageData[]>([])

	useEffect(() => {
		const fetchImages = async () => {
			const response = await fetch('/api/getImages', { cache: 'no-cache' })
			const data = await response.json()
			// console.log(data)
			setImages(data)
		}
		fetchImages()
	}, [])

	return (
		<div className='p-4'>
			<h1 className='text-2xl mb-4'>Uploaded Images</h1>
			<div className='grid grid-cols-3 gap-4'>
				{images.map((item) => (
					<div key={item.id} className='border p-4 rounded'>
						<p className='mb-2'>Name: {item.first_name}</p>
						{item.image && (
							<img
								src={`data:image/jpeg;base64,${Buffer.from(
									item.image.data
								).toString('base64')}`}
								alt={item.first_name}
								className='w-full h-auto'
							/>
						)}
					</div>
				))}
			</div>
		</div>
	)
}
