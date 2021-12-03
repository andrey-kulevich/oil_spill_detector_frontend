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
			[69.45397814, 87.92092548],
			[69.45397814, 87.93225358],
			[69.4598923, 87.93225358],
			[69.4598923, 87.92092548],
		],
	],
	incidents: [
		{
			id: 1,
			firstDetectionDate: new Date(2018, 9, 1),
			detectionHistory: [
				{
					lastUpdate: new Date(2020, 12, 3),
					photo: '',
				},
			],
			coordinates: [
				[
					[60.28704292, 72.28433595],
					[60.28704292, 72.29566405],
					[60.29295708, 72.29566405],
					[60.29295708, 72.28433595],
				],
			],
			danger: {
				dangerClass: 'low',
				landType: 'Земли лесного фонда',
				spillArea: '0,0508',
				dangerFactors: [{ id: 1, value: 'Вне специальных зон' }],
			},
			status: 'approved',
			pipeOwner: 'ООО «РН-Юганскнефтегаз»',
			objectFrom: 'aaaaa',
			objectTo: 'bbbbb',
		},
		{
			id: 2,
			firstDetectionDate: new Date(2018, 9, 17),
			detectionHistory: [
				{
					lastUpdate: new Date(2019, 12, 3),
					photo: '',
				},
			],
			coordinates: [
				[
					[60.2570429, 72.09433595],
					[60.2570429, 72.1056641],
					[60.2629571, 72.1056641],
					[60.2629571, 72.09433595],
				],
			],
			danger: {
				dangerClass: 'high',
				landType: 'Земли лесного фонда',
				spillArea: '12,06',
				dangerFactors: [{ id: 1, value: 'Вне специальных зон' }],
			},
			status: 'inspection',
			pipeOwner: 'ООО «РН-Юганскнефтегаз»',
			objectFrom: 'aaaaa',
			objectTo: 'bbbbb',
		},
		{
			id: 3,
			firstDetectionDate: new Date(2018, 12, 27),
			detectionHistory: [
				{
					lastUpdate: new Date(2020, 12, 3),
					photo: '',
				},
			],
			coordinates: [
				[
					[61.3070429, 76.54433595],
					[61.3070429, 76.5556641],
					[61.3129571, 76.5556641],
					[61.3129571, 76.54433595],
				],
			],
			danger: {
				dangerClass: 'high',
				landType: 'Земли лесного фонда',
				spillArea: '11',
				dangerFactors: [{ id: 1, value: 'Вне специальных зон' }],
			},
			status: 'approved',
			pipeOwner: 'АО «Самотлорнефтегаз»',
			objectFrom: 'aaaaa',
			objectTo: 'bbbbb',
		},
		{
			id: 4,
			firstDetectionDate: new Date(2020, 4, 22),
			detectionHistory: [
				{
					lastUpdate: new Date(2020, 9, 3),
					photo: '',
				},
			],
			coordinates: [
				[
					[61.2770429, 66.13433595],
					[61.2770429, 66.1456641],
					[61.2829571, 66.1456641],
					[61.2829571, 66.13433595],
				],
			],
			danger: {
				dangerClass: 'high',
				landType: 'Земли лесного фонда',
				spillArea: '16,3085',
				dangerFactors: [{ id: 1, value: 'Вне специальных зон' }],
			},
			status: 'approved',
			pipeOwner: 'АО "РН-Няганьнефтегаз"',
			objectFrom: 'aaaaa',
			objectTo: 'bbbbb',
		},
		{
			id: 5,
			firstDetectionDate: new Date(2020, 11, 23),
			detectionHistory: [
				{
					lastUpdate: new Date(2020, 12, 13),
					photo: '',
				},
			],
			coordinates: [
				[
					[61.1870429, 77.73433595],
					[61.1870429, 77.7456641],
					[61.1929571, 77.7456641],
					[61.1929571, 77.73433595],
				],
			],
			danger: {
				dangerClass: 'high',
				landType: 'Земли лесного фонда',
				spillArea: '12,3',
				dangerFactors: [{ id: 1, value: 'Вне специальных зон' }],
			},
			status: 'approved',
			pipeOwner: 'ООО "Тарховское"',
			objectFrom: 'aaaaa',
			objectTo: 'bbbbb',
		},
		{
			id: 6,
			firstDetectionDate: new Date(2019, 8, 20),
			detectionHistory: [
				{
					lastUpdate: new Date(2020, 10, 3),
					photo: '',
				},
			],
			coordinates: [
				[
					[60.9670429, 77.03433595],
					[60.9670429, 77.0456641],
					[60.9729571, 77.0456641],
					[60.9729571, 77.03433595],
				],
			],
			danger: {
				dangerClass: 'high',
				landType: 'Земли лесного фонда, земли промышленности',
				spillArea: '11,0923',
				dangerFactors: [{ id: 1, value: 'Вне специальных зон' }],
			},
			status: 'unapproved',
			pipeOwner: 'АО "Томскнефть" ВНК',
			objectFrom: 'aaaaa',
			objectTo: 'bbbbb',
		},
		{
			id: 7,
			firstDetectionDate: new Date(2018, 4, 3),
			detectionHistory: [
				{
					lastUpdate: new Date(2020, 11, 2),
					photo: '',
				},
			],
			coordinates: [
				[
					[60.8470429, 76.80433595],
					[60.8470429, 76.8156641],
					[60.8529571, 76.8156641],
					[60.8529571, 76.80433595],
				],
			],
			danger: {
				dangerClass: 'medium',
				landType: 'Земли лесного фонда',
				spillArea: '2,75',
				dangerFactors: [{ id: 1, value: 'Вне специальных зон' }],
			},
			status: 'inspection',
			pipeOwner: 'АО "Томскнефть" ВНК',
			objectFrom: 'aaaaa',
			objectTo: 'bbbbb',
		},
		{
			id: 8,

			firstDetectionDate: new Date(2018, 12, 27),
			detectionHistory: [
				{
					lastUpdate: new Date(2020, 7, 3),
					photo: '',
				},
			],
			coordinates: [
				[
					[61.3070429, 76.54433595],
					[61.3070429, 76.5556641],
					[61.3129571, 76.5556641],
					[61.3129571, 76.54433595],
				],
			],
			danger: {
				dangerClass: 'high',
				landType: 'Земли лесного фонда',
				spillArea: '19,12',
				dangerFactors: [{ id: 1, value: 'Вне специальных зон' }],
			},
			status: 'approved',
			pipeOwner: 'АО «Самотлорнефтегаз»',
			objectFrom: 'aaaaa',
			objectTo: 'bbbbb',
		},
		{
			id: 9,
			firstDetectionDate: new Date(2018, 1, 9),
			detectionHistory: [
				{
					lastUpdate: new Date(2020, 11, 2),
					photo: '',
				},
			],
			coordinates: [
				[
					[61.1870429, 76.61433595],
					[61.1870429, 76.6256641],
					[61.1929571, 76.6256641],
					[61.1929571, 76.61433595],
				],
			],
			danger: {
				dangerClass: 'high',
				landType: 'Земли лесного фонда',
				spillArea: '20,84',
				dangerFactors: [{ id: 1, value: 'Вне специальных зон' }],
			},
			status: 'approved',
			pipeOwner: 'АО «Самотлорнефтегаз»',
			objectFrom: 'aaaaa',
			objectTo: 'bbbbb',
		},
		{
			id: 10,
			firstDetectionDate: new Date(2018, 2, 9),
			detectionHistory: [
				{
					lastUpdate: new Date(2019, 12, 4),
					photo: '',
				},
			],
			coordinates: [
				[
					[61.0270429, 76.40433595],
					[61.0270429, 76.4156641],
					[61.0329571, 76.4156641],
					[61.0329571, 76.40433595],
				],
			],
			danger: {
				dangerClass: 'high',
				landType: 'Земли лесного фонда',
				spillArea: '15,63',
				dangerFactors: [{ id: 1, value: 'Вне специальных зон' }],
			},
			status: 'approved',
			pipeOwner: 'АО «Самотлорнефтегаз»',
			objectFrom: 'aaaaa',
			objectTo: 'bbbbb',
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
