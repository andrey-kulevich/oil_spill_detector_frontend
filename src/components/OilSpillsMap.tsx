import React, { useEffect, useRef, useState } from 'react';
import { YMaps, Map, Polyline, Placemark } from 'react-yandex-maps';
import { IMapData } from '../dto/IMapData';
import mapData from '../helpers/mapData.json';
import { Box, Paper } from '@mui/material';

export const OilSpillsMap = (): JSX.Element => {
	const data = mapData as unknown as IMapData;
	const map = useRef(null);

	const mapState = {
		center: [55.751574, 37.573856],
		zoom: 9,
		behaviors: ['default', 'scrollZoom'],
	};

	return (
		<Box sx={{ width: '65%', m: 0.5 }}>
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
					</Map>
				</YMaps>
			</Paper>
		</Box>
	);
};
