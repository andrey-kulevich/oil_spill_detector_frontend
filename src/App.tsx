import React from 'react';
import './App.css';
import IncidentsTable from './components/IncidentsTable';
import { OilSpillsMap } from './components/OilSpillsMap';
import { Stack } from '@mui/material';
import SpillPhoto from './components/SpillPhotosCarousel';
import i1 from './img/sputnik/1.png';
import i2 from './img/sputnik/2.png';
import i3 from './img/sputnik/3.png';
import i4 from './img/sputnik/4.png';
import i5 from './img/sputnik/5.png';
import i6 from './img/sputnik/6.png';
import i7 from './img/sputnik/7.png';
import i8 from './img/sputnik/8.png';
import i9 from './img/sputnik/9.png';

export default function App(): JSX.Element {
	return (
		<>
			<Stack direction='row' sx={{ width: '100%' }}>
				<OilSpillsMap />
				<SpillPhoto
					photos={[
						{ lastUpdate: new Date(2021, 12, 4), photo: i1 },
						{ lastUpdate: new Date(2021, 12, 4), photo: i2 },
						{ lastUpdate: new Date(2021, 12, 4), photo: i3 },
						{ lastUpdate: new Date(2021, 12, 5), photo: i4 },
						{ lastUpdate: new Date(2021, 12, 5), photo: i5 },
						{ lastUpdate: new Date(2021, 12, 5), photo: i6 },
						{ lastUpdate: new Date(2021, 12, 6), photo: i7 },
						{ lastUpdate: new Date(2021, 12, 6), photo: i8 },
						{ lastUpdate: new Date(2021, 12, 6), photo: i9 },
					]}
				/>
			</Stack>
			<IncidentsTable />
		</>
	);
}
