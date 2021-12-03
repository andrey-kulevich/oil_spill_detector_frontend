import React, { useEffect, useRef, useState } from 'react';
import { YMaps, Map, Polyline, Placemark, Polygon } from 'react-yandex-maps';
import { IMapData } from '../dto/IMapData';
import mapData from '../helpers/mapData.json';
import { Box, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const OilSpillsMap = (): JSX.Element => {
	const data = mapData as unknown as IMapData;
	const map = useRef(null);
	const { incidents } = useSelector((state: RootState) => state);

	const mapState = {
		center: incidents.currentIncidentCoordinates[0][0],
		zoom: 14,
		behaviors: ['default', 'scrollZoom'],
	};

	return (
		<Box sx={{ width: '77.5%', m: 0.5 }}>
			<Paper sx={{ width: '100%' }} variant={'outlined'}>
				<YMaps>
					<Map state={mapState} height='50vh' width='100%'>
						{data.features.map((elem, index) =>
							elem.geometry.type === 'LineString' ? (
								<Polyline
									key={index}
									defaultGeometry={elem.geometry.coordinates}
									options={elem.options}
									properties={elem.properties}
									modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
								/>
							) : (
								<Placemark
									geometry={elem.geometry.coordinates as unknown as [number, number]}
									options={elem.options}
									properties={elem.properties}
								/>
							),
						)}
						<Polygon
							geometry={incidents.currentIncidentCoordinates}
							options={{
								fillColor: '#da5b5b',
								strokeColor: '#ff0000',
								opacity: 0.4,
								strokeWidth: 4,
							}}
						/>
					</Map>
				</YMaps>
			</Paper>
		</Box>
	);
};
