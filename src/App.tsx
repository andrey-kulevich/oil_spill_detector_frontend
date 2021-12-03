import React from 'react';
import './App.css';
import IncidentsTable from './components/IncidentsTable';
import { OilSpillsMap } from './components/OilSpillsMap';
import { Stack } from '@mui/material';
import SpillPhoto from './components/SpillPhotosCarousel';
import photo from './img/NOvorossiisk-oil-spill.jpeg';

export default function App(): JSX.Element {
	return (
		<>
			<Stack direction='row' sx={{ width: '100%' }}>
				<OilSpillsMap />
				<SpillPhoto
					photos={[1, 2, 3].map((elem) => {
						return { lastUpdate: new Date(2021, 11, 1), photo: photo };
					})}
				/>
			</Stack>
			<IncidentsTable />
		</>
	);
}
