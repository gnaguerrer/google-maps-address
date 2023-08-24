import React, { useMemo, useState } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'

type Props = {
	onClickMap: (coods: Coords) => void
	center?: Coords
}

export interface Coords {
	lat: number
	lng: number
}

// Default center
const MOCK_COORDS = { lat: 4.60971, lng: -74.08175 }

export const GoogleMapView = (props: Props) => {
	const { center, onClickMap } = props
	const [selected, setSelected] = useState<Coords | null>(MOCK_COORDS)

	const mapCenter = useMemo(() => center ?? MOCK_COORDS, [center])

	const onClick = (event: google.maps.MapMouseEvent) => {
		if (event.latLng?.lat) {
			const selectedCoords = {
				lat: event.latLng.lat(),
				lng: event.latLng?.lng()
			}
			onClickMap(selectedCoords)
			setSelected(selectedCoords)
		}
	}

	return (
		<GoogleMap
			zoom={center ? 9 : 6}
			center={mapCenter}
			mapContainerClassName="w-full h-screen"
			onClick={onClick}
		>
			{selected && <Marker position={selected} />}
		</GoogleMap>
	)
}
