import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { dateToString } from '../helpers/utils';
import { Button } from '@mui/material';
import { RootState, useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';
import { setCurrentIncidentCoordinates } from '../store/incidents';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LoopIcon from '@mui/icons-material/Loop';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import '../App.css';
import { useRef, useState } from 'react';
import { IOilSpillIncident } from '../dto/IOilSpillIncident';
import IncidentModal from './IncidentModal';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
	disablePadding: boolean;
	id: string;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: 'status',
		numeric: false,
		disablePadding: true,
		label: 'Статус',
	},
	{
		id: 'dangerClass',
		numeric: true,
		disablePadding: false,
		label: 'Опасность',
	},
	{
		id: 'firstDetectionDate',
		numeric: true,
		disablePadding: false,
		label: 'Дата обнаружения',
	},
	{
		id: 'lastUpdate',
		numeric: true,
		disablePadding: false,
		label: 'Последнее обновление',
	},
	{
		id: 'pipeOwner',
		numeric: true,
		disablePadding: false,
		label: 'Владелец',
	},
	{
		id: 'objects',
		numeric: true,
		disablePadding: false,
		label: 'Связываемые объекты',
	},
	{
		id: 'desc',
		numeric: true,
		disablePadding: false,
		label: '',
	},
	{
		id: 'location',
		numeric: true,
		disablePadding: false,
		label: 'Координаты',
	},
];

interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

export function EnhancedTableHead(props: EnhancedTableProps): JSX.Element {
	const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
	const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding='checkbox'>
					<Checkbox
						color='primary'
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							'aria-label': 'select all rows',
						}}
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component='span' sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

interface EnhancedTableToolbarProps {
	numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
	const { numSelected } = props;

	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected > 0 && {
					bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
				}),
			}}
		>
			{numSelected > 0 ? (
				<Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
					{numSelected} выбрано
				</Typography>
			) : (
				<Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
					Обнаруженные нефтеразливы
				</Typography>
			)}
			{numSelected > 0 ? (
				<Tooltip title='Удалить'>
					<IconButton>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title='Фильтры'>
					<IconButton>
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	);
};

export default function IncidentsTable(): JSX.Element {
	const [order, setOrder] = React.useState<Order>('asc');
	const [orderBy, setOrderBy] = React.useState<string>('calories');
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const dispatch = useAppDispatch();
	const { incidents } = useSelector((state: RootState) => state);
	const [open, setOpen] = useState<boolean>(false);
	const [currentIncident, setCurrentIncident] = useState<IOilSpillIncident>({} as IOilSpillIncident);
	const rowRef = useRef(null);

	const handleOpenModal = (incident: IOilSpillIncident, e: any) => {
		setCurrentIncident(incident);
		dispatch(setCurrentIncidentCoordinates(incident.coordinates));
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		if (rowRef.current && rowRef.current !== e.target) setOpen(true);
	};

	const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - incidents.incidents.length) : 0;

	const getStatusIcon = (status: 'unapproved' | 'inspection' | 'approved' | 'eliminated') => {
		switch (status) {
			case 'unapproved':
				return <FiberNewIcon color={'secondary'} />;
			case 'approved':
				return <NewReleasesIcon color={'error'} />;
			case 'inspection':
				return <LoopIcon color={'primary'} className={'rotation'} />;
			case 'eliminated':
				return <CheckCircleIcon color={'success'} />;
		}
	};

	return (
		<Box sx={{ width: '99%', m: 0.5 }}>
			<Paper sx={{ width: '100%' }} variant={'outlined'}>
				<TableContainer sx={{ maxHeight: '47vh' }}>
					<Table stickyHeader sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={'small'}>
						<EnhancedTableHead
							numSelected={0}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={() => {
								console.log('...');
							}}
							onRequestSort={handleRequestSort}
							rowCount={incidents.incidents.length}
						/>
						<TableBody>
							{incidents.incidents.map((row, index) => (
								<TableRow hover tabIndex={-1} key={index} sx={{ cursor: 'pointer' }}>
									<TableCell align='right'></TableCell>
									<TableCell component='th' scope='row' padding='none' width={'3%'}>
										{getStatusIcon(row.status)}
									</TableCell>
									<TableCell
										align='right'
										width={'3%'}
										sx={{
											color:
												row.danger.dangerClass === 'medium'
													? 'rgb(255,190,0)'
													: row.danger.dangerClass === 'high'
													? 'rgb(248,3,3)'
													: '#000000',
										}}
									>
										{row.danger.dangerClass}
									</TableCell>
									<TableCell align='right' width={'13%'}>
										{dateToString(row.firstDetectionDate)}
									</TableCell>
									<TableCell align='right' width={'18%'}>
										{dateToString(row.detectionHistory[row.detectionHistory.length - 1].lastUpdate)}
									</TableCell>
									<TableCell align='right'>{row.pipeOwner}</TableCell>
									<TableCell align='right'>
										{row.objectFrom} - {row.objectTo}
									</TableCell>
									<TableCell align='right' width={'1%'}>
										<IconButton ref={rowRef} onClick={(e) => handleOpenModal(row, e)}>
											<MoreVertIcon />
										</IconButton>
									</TableCell>
									<TableCell align='right' width={'3%'}>
										<Button
											variant={'outlined'}
											size={'small'}
											ref={rowRef}
											onClick={() => dispatch(setCurrentIncidentCoordinates(row.coordinates))}
										>
											на карте
										</Button>
									</TableCell>
								</TableRow>
							))}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: 33 * emptyRows,
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
			<IncidentModal open={open} setOpen={setOpen} incident={currentIncident} />
		</Box>
	);
}
