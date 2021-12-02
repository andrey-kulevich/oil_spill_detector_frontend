import React from 'react';
import { Box, Paper } from '@mui/material';

export default function SpillPhoto(): JSX.Element {
	return (
		<Box sx={{ width: '33.5%', m: 0.5, height: '50vh' }}>
			<Paper sx={{ width: '100%', height: '50vh', backgroundColor: '#eaeaea' }} variant={'outlined'}></Paper>
		</Box>
	);
}
