import React from 'react';
import './App.css';
import IncidentsTable from './components/IncidentsTable';
import { OilSpillsMap } from './components/OilSpillsMap';
import { Stack } from '@mui/material';
import SpillPhoto from './components/SpillPhoto';

export default function App(): JSX.Element {
	return (
		<>
			<Stack direction='row' sx={{ width: '100%' }}>
				<OilSpillsMap />
				<SpillPhoto />
			</Stack>
			<IncidentsTable />
		</>
	);
}
