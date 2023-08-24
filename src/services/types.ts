export interface GeoDecoderResponse {
	results: GeocoderResult[]
	status:
		| 'OK'
		| 'ZERO_RESULTS'
		| 'OVER_QUERY_LIMIT'
		| 'REQUEST_DENIED'
		| 'INVALID_REQUEST'
		| 'UNKNOWN_ERROR'
		| 'ERROR'
}

export interface GeocoderResult {
	types: GeocoderTypes[]
	formatted_address: string
	address_components: GeocoderAddressComponent[]
	partial_match: boolean
	place_id: string
	postcode_localities: string[]
	geometry: GeocoderGeometry
}

// https://developers.google.com/maps/documentation/javascript/geocoding?hl=es-419#GeocodingAddressTypes
export enum GeocoderTypes {
	country = 'country',
	political = 'political',

	// States
	administrative_area_level_1 = 'administrative_area_level_1',
	administrative_area_level_2 = 'administrative_area_level_2',

	// Points
	establishment = 'establishment',
	point_of_interest = 'point_of_interest',
	route = 'route',
	street_address = 'street_address'
}

export interface GeocoderAddressComponent {
	short_name: string
	long_name: string
	postcode_localities?: string[]
	types: GeocoderTypes[]
}

export interface GeocoderGeometry {
	location: number
	location_type: GeocoderLocationType
	viewport: number
	bounds: {
		northeast: { lat: number; lng: number }
		southwest: { lat: number; lng: number }
	}
}

export enum GeocoderLocationType {
	ROOFTOP = 'ROOFTOP',
	RANGE_INTERPOLATED = 'RANGE_INTERPOLATED',
	GEOMETRIC_CENTER = 'GEOMETRIC_CENTER',
	APPROXIMATE = 'APPROXIMATE'
}
