'use client'
import { useLoadScript } from '@react-google-maps/api'
import { Coords, CustomDialog, GoogleMapView } from '@/components'
import { GeocoderTypes, getGecode } from '@/services'
import { useEffect, useState } from 'react'

export default function Home() {
	let [isOpen, setIsOpen] = useState(false)
	const [selectedAddres, setSelectedAddres] = useState<string>('')
	const [selectedCoods, setselectedCoods] = useState<Coords | undefined>()
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
		libraries: ['geocoding']
	})

	useEffect(() => {
		geCurrentLocation()
	}, [])

	const geCurrentLocation = (): void => {
		if (navigator?.geolocation) {
			navigator.geolocation.getCurrentPosition(data => {
				if (data) {
					const coords = {
						lat: data.coords.latitude,
						lng: data.coords.longitude
					}
					setselectedCoods(coords)
					onClickMap(coords)
				}
			})
		}
	}

	const onClickMap = async (selectedCoords: Coords) => {
		try {
			const geoCodeResponse = await getGecode(
				selectedCoords.lat,
				selectedCoords.lng
			)
			setselectedCoods({
				lat: selectedCoords.lat,
				lng: selectedCoords.lng
			})
			const accurateAddress = geoCodeResponse?.results[0]
			const adminArea = geoCodeResponse?.results.find(result =>
				result.types.includes(
					GeocoderTypes.administrative_area_level_2 ||
						GeocoderTypes.administrative_area_level_1
				)
			)
			const city = adminArea?.address_components[0].long_name
			const state = adminArea?.address_components[1].long_name
			setSelectedAddres(accurateAddress?.formatted_address ?? '')
			console.log('address is: ', accurateAddress?.formatted_address)
			console.log('city is: ', city)
			console.log('state is: ', state)
		} catch (error) {
			console.error('There was an error getting address', error)
		}
	}

	return (
		<main className="flex flex-col items-center justify-center h-screen">
			<button
				type="button"
				className="inline-flex justify-center rounded-md border border-transparent bg-violet-900 px-4 py-2 text-sm font-medium text-violet-100 hover:bg-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
				onClick={() => setIsOpen(true)}
			>
				Select an address
			</button>
			<span className="text-lg font-medium text-gray-100 mt-5">
				{selectedAddres}
			</span>
			<CustomDialog
				isOpen={isOpen}
				closeModal={() => setIsOpen(false)}
				footer={
					<div className="flex items-center justify-between">
						<span className="text-sm font-medium  text-gray-900">
							{selectedAddres}
						</span>
						<button
							type="button"
							className="inline-flex justify-center rounded-md border border-transparent bg-violet-900 px-4 py-2 text-sm font-medium text-violet-100 hover:bg-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
							onClick={() => setIsOpen(false)}
						>
							Save
						</button>
					</div>
				}
			>
				{!isLoaded ? (
					<div>Loading...</div>
				) : (
					<GoogleMapView onClickMap={onClickMap} center={selectedCoods} />
				)}
			</CustomDialog>
		</main>
	)
}
