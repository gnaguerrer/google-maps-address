'use client'
import { useLoadScript } from '@react-google-maps/api'
import { Coords, GoogleMapView } from '@/components'

export default function Home() {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
		libraries: ['geocoding']
	})

	const onClickMap = (selectedCoords: Coords) => {
		console.log('selectedCoords', selectedCoords)
	}

	return (
		<main className="flex items-center justify-center h-screen">
			{!isLoaded ? (
				<div>Loading...</div>
			) : (
				<GoogleMapView onClickMap={onClickMap} />
			)}
		</main>
	)
}
