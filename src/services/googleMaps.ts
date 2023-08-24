import axios from 'axios'
import { GeoDecoderResponse } from './types'

export const getGecode = async (
	lat: number,
	lng: number
): Promise<GeoDecoderResponse | null> => {
	try {
		const response = await axios.get(
			'https://maps.googleapis.com/maps/api/geocode/json',
			{
				params: {
					latlng: `${lat},${lng}`,
					key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
				}
			}
		)
		if (response.data.status === 'OK') {
			return response.data as GeoDecoderResponse
		}
		return null
	} catch (error) {
		console.error('Error at getGecode', error)
		return null
	}
}
