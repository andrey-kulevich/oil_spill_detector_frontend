import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IOilSpillIncident } from '../dto/IOilSpillIncident';
import { Button, List, ListItem, ListItemIcon, ListItemText, Stack } from '@mui/material';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import CropFreeOutlinedIcon from '@mui/icons-material/CropFreeOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import LocalGasStationOutlinedIcon from '@mui/icons-material/LocalGasStationOutlined';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import { dateToString } from '../helpers/utils';

const style = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 2,
	borderRadius: '7px',
};

export default function IncidentModal({
	open,
	setOpen,
	incident,
}: {
	open: boolean;
	setOpen: any;
	incident: IOilSpillIncident;
}): JSX.Element {
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						Информация об инциденте
					</Typography>
					{incident.detectionHistory && (
						<List dense>
							<ListItem>
								<ListItemIcon>
									<ReportOutlinedIcon />
								</ListItemIcon>
								<ListItemText primary={'Статус'} secondary={incident.status} />
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<CalendarTodayOutlinedIcon />
								</ListItemIcon>
								<ListItemText
									primary={'Дата обнаружения'}
									secondary={dateToString(incident.firstDetectionDate)}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<CalendarTodayOutlinedIcon />
								</ListItemIcon>
								<ListItemText
									primary={'Последнее обновление'}
									secondary={dateToString(
										incident.detectionHistory[incident.detectionHistory.length - 1].lastUpdate,
									)}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<ReportProblemOutlinedIcon />
								</ListItemIcon>
								<ListItemText primary={'Класс опасности'} secondary={incident.danger.dangerClass} />
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<CropFreeOutlinedIcon />
								</ListItemIcon>
								<ListItemText primary={'Площадь загрязнения'} secondary={incident.danger.spillArea} />
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<ImageOutlinedIcon />
								</ListItemIcon>
								<ListItemText primary={'Тип земли'} secondary={incident.danger.landType} />
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<LocalGasStationOutlinedIcon />
								</ListItemIcon>
								<ListItemText primary={'Владелец трубопровода'} secondary={incident.pipeOwner} />
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<FactoryOutlinedIcon />
								</ListItemIcon>
								<ListItemText
									primary={'Связанные объекты'}
									secondary={incident.objectFrom + ' - ' + incident.objectTo}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<FeedOutlinedIcon />
								</ListItemIcon>
								<ListItemText
									primary={'Дополнительные сведения'}
									secondary={incident.danger.dangerFactors[0].value}
								/>
							</ListItem>
						</List>
					)}
					<Stack direction={'row'} spacing={1}>
						<Button onClick={handleClose} variant={'outlined'}>
							Отмена
						</Button>
						<Button onClick={handleClose} variant={'outlined'}>
							Изменить
						</Button>
						<Button onClick={handleClose} variant={'outlined'}>
							Создать задание
						</Button>
					</Stack>
				</Box>
			</Modal>
		</div>
	);
}
