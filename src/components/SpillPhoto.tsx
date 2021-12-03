import React from 'react';
import { Box, Paper } from '@mui/material';

export default function SpillPhoto({ photo }: { photo: any }): JSX.Element {
	return (
		<Box sx={{ width: '33.5%', m: 0.5, height: '50vh' }}>
			<Paper sx={{ width: '100%', height: '50vh' }} variant={'outlined'}>
				<img src={photo} alt={'spill'} style={{ width: '100%', height: '100%', borderRadius: '3px' }} />
			</Paper>
		</Box>
	);
}
