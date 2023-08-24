'use client'
import { useLoadScript } from '@react-google-maps/api'
import { Coords, GoogleMapView } from '@/components'
import { GeocoderTypes, getGecode } from '@/services'

export default function Home() {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
		libraries: ['geocoding']
	})

	const onClickMap = async (selectedCoords: Coords) => {
		try {
			const geoCodeResponse = await getGecode(
				selectedCoords.lat,
				selectedCoords.lng
			)
			const accurateAddress = geoCodeResponse?.results[0]
			const adminArea = geoCodeResponse?.results.find(result =>
				result.types.includes(
					GeocoderTypes.administrative_area_level_2 ||
						GeocoderTypes.administrative_area_level_1
				)
			)
			const city = adminArea?.address_components[0].long_name
			const state = adminArea?.address_components[1].long_name
			console.log('address is: ', accurateAddress?.formatted_address)
			console.log('city is: ', city)
			console.log('state is: ', state)
		} catch (error) {
			console.error('There was an error getting address', error)
		}
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
