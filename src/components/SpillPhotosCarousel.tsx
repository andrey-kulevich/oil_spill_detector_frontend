import React from 'react';
import { Box, Paper } from '@mui/material';
import '../App.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { dateToString } from '../helpers/utils';

export default function SpillPhotosCarousel({ photos }: { photos: { lastUpdate: Date; photo: any }[] }): JSX.Element {
	return (
		<Box sx={{ width: '33.5%', m: 0.5, height: '50vh' }}>
			<Carousel>
				{photos.map((elem, index) => (
					<div key={index}>
						<img
							src={elem.photo}
							alt={'spill'}
							style={{ width: '100%', height: '100%', borderRadius: '3px' }}
						/>
						<p className='legend'>{dateToString(elem.lastUpdate)}</p>
					</div>
				))}
			</Carousel>
		</Box>
	);
}
