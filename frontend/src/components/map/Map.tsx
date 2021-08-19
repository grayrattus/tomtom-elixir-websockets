import React, {useEffect, useRef} from 'react';

import TomTom from '@tomtom-international/web-sdk-maps';
import {useBackendApi} from '../../hooks/useBackendApi';

export const Map = () => {
	const mapRef = useRef<TomTom.Map>();
	const mapDivRef = useRef<any>();
	const markerRef = useRef<TomTom.Marker>();

	const { incommingMessageCallback, sendMessageCallback  } = useBackendApi();

	incommingMessageCallback.current = (e: any) => {
		const lngLat = e.data.match(/(-*[0-9]+\.[0-9]+), (-*[0-9]+\.[0-9]+)/);
		if (lngLat) {
			const lng = Number.parseFloat(lngLat[1]);
			const lat = Number.parseFloat(lngLat[2]);
			if (mapRef.current && markerRef.current && lat && lng) {
				markerRef.current?.setLngLat({lat, lng});
			}
		}
	};

	console.log(process.env.REACT_APP_TOMTOM_KEY);

	useEffect(() => {
		mapRef.current = TomTom.map({
			key: process.env.REACT_APP_TOMTOM_KEY || '',
			container: mapDivRef.current
		})
		mapRef.current.on('click', (e) => {
			sendMessageCallback.current(e.lngLat.toString());
		});
		markerRef.current = new TomTom.Marker();
		markerRef.current.setLngLat({lat: 0, lng: 0 }).addTo(mapRef.current);
	}, []);

	return <div style={{height: '100vh'}} ref={mapDivRef} />
}
