import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { httpHelper } from '../helpers/httpHelper';
import { requests } from '../helpers/requests';
import { IOilSpillIncident } from '../dto/IOilSpillIncident';

interface IIncidentsState {
	incidents: IOilSpillIncident[];
	currentIncidentCoordinates: [[number, number][]];
	status: string;
}

export const getIncidents = createAsyncThunk<{ incidents: IOilSpillIncident[]; status: string }>(
	'incidents/getAll',
	async (_, { rejectWithValue }) => {
		try {
			const res = await httpHelper(requests.getAllIncidents.url, requests.getAllIncidents.method, null);
			return {
				incidents: res.data,
				status: res.status as unknown as string,
			};
		} catch (err: any) {
			return rejectWithValue({
				incidents: [] as IOilSpillIncident[],
				token: null,
				status: err.response.status as unknown as string,
			});
		}
	},
);

const initState: IIncidentsState = {
	currentIncidentCoordinates: [
		[
			[55.75, 37.8],
			[55.8, 37.9],
			[55.75, 38.0],
			[55.7, 38.0],
			[55.7, 37.8],
		],
	],
	incidents: [
		{
			id: 1,
			firstDetectionDate: new Date(2021, 11, 1),
			lastUpdate: new Date(2021, 11, 2),
			coordinates: [
				[
					[55.75, 37.8],
					[55.8, 37.9],
					[55.75, 38.0],
					[55.7, 38.0],
					[55.7, 37.8],
				],
			],
			danger: {
				dangerClass: 'medium',
				spillArea: '...',
				dangerFactors: [{ id: 1, value: 'Близость от водных объектов' }],
			},
			status: 'unapproved',
			pipeOwner: 'Big Daddy',
			objectFrom: 'aaaaa',
			objectTo: 'bbbbb',
			spillPhoto: '',
		},
		{
			id: 2,
			firstDetectionDate: new Date(2021, 11, 1),
			lastUpdate: new Date(2021, 11, 2),
			coordinates: [
				[
					[56.75, 38.8],
					[55.8, 37.9],
					[55.75, 36.0],
					[55.7, 38.0],
					[52.7, 37.8],
				],
			],
			danger: {
				dangerClass: 'medium',
				spillArea: '...',
				dangerFactors: [{ id: 1, value: 'Близость от водных объектов' }],
			},
			status: 'inspection',
			pipeOwner: 'Big Daddy',
			objectFrom: 'aaaaa',
			objectTo: 'bbbbb',
			spillPhoto: '',
		},
		{
			id: 3,
			firstDetectionDate: new Date(2021, 11, 1),
			lastUpdate: new Date(2021, 11, 2),
			coordinates: [
				[
					[46.75, 28.8],
					[45.8, 27.9],
					[45.75, 26.0],
					[45.7, 28.0],
					[42.7, 27.8],
				],
			],
			danger: {
				dangerClass: 'medium',
				spillArea: '...',
				dangerFactors: [{ id: 1, value: 'Близость от водных объектов' }],
			},
			status: 'approved',
			pipeOwner: 'Big Daddy',
			objectFrom: 'aaaaa',
			objectTo: 'bbbbb',
			spillPhoto: '',
		},
		{
			id: 4,
			firstDetectionDate: new Date(2021, 11, 1),
			lastUpdate: new Date(2021, 11, 2),
			coordinates: [
				[
					[56.75, 38.8],
					[55.8, 37.9],
					[55.75, 36.0],
					[55.7, 38.0],
					[52.7, 37.8],
				],
			],
			danger: {
				dangerClass: 'medium',
				spillArea: '...',
				dangerFactors: [{ id: 1, value: 'Близость от водных объектов' }],
			},
			status: 'eliminated',
			pipeOwner: 'Big Daddy',
			objectFrom: 'aaaaa',
			objectTo: 'bbbbb',
			spillPhoto: '',
		},
		{
			id: 5,
			firstDetectionDate: new Date(2021, 11, 1),
			lastUpdate: new Date(2021, 11, 2),
			coordinates: [
				[
					[56.75, 38.8],
					[55.8, 37.9],
					[55.75, 36.0],
					[55.7, 38.0],
					[52.7, 37.8],
				],
			],
			danger: {
				dangerClass: 'medium',
				spillArea: '...',
				dangerFactors: [{ id: 1, value: 'Близость от водных объектов' }],
			},
			status: 'unapproved',
			pipeOwner: 'Big Daddy',
			objectFrom: 'Верхнежопинск',
			objectTo: 'Мухосранск',
			spillPhoto: '',
		},
		{
			id: 6,
			firstDetectionDate: new Date(2021, 11, 1),
			lastUpdate: new Date(2021, 11, 2),
			coordinates: [
				[
					[56.75, 38.8],
					[55.8, 37.9],
					[55.75, 36.0],
					[55.7, 38.0],
					[52.7, 37.8],
				],
			],
			danger: {
				dangerClass: 'medium',
				spillArea: '...',
				dangerFactors: [{ id: 1, value: 'Близость от водных объектов' }],
			},
			status: 'unapproved',
			pipeOwner: 'Big Daddy',
			objectFrom: 'aaaaa',
			objectTo: 'bbbbb',
			spillPhoto: '',
		},
		{
			id: 7,
			firstDetectionDate: new Date(2021, 11, 1),
			lastUpdate: new Date(2021, 11, 2),
			coordinates: [
				[
					[56.75, 38.8],
					[55.8, 37.9],
					[55.75, 36.0],
					[55.7, 38.0],
					[52.7, 37.8],
				],
			],
			danger: {
				dangerClass: 'medium',
				spillArea: '...',
				dangerFactors: [{ id: 1, value: 'Близость от водных объектов' }],
			},
			status: 'unapproved',
			pipeOwner: 'Big Daddy',
			objectFrom: 'aaaaa',
			objectTo: 'bbbbb',
			spillPhoto: '',
		},
	],
	status: '200',
};

export const incidentsSlice = createSlice({
	name: 'incidents',
	initialState: initState,
	extraReducers: (builder) => {
		builder.addCase(getIncidents.pending, (state) => {
			state.status = 'loading';
		});
		builder.addCase(getIncidents.fulfilled, (state, action) => {
			state.status = action.payload.status;
			state.incidents = action.payload.incidents;
		});
		builder.addCase(getIncidents.rejected, (state, action) => {
			state.status = (<IIncidentsState>action.payload).status;
			state.incidents = (<IIncidentsState>action.payload).incidents;
		});
	},
	reducers: {
		setCurrentIncidentCoordinates: (state, action) => {
			state.currentIncidentCoordinates = action.payload;
		},
	},
});

export const { setCurrentIncidentCoordinates } = incidentsSlice.actions;
export default incidentsSlice.reducer;
