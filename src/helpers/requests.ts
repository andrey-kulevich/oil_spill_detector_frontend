import { Method } from 'axios';

export interface IRequestParams {
	url: any;
	method: Method;
}

export const requests: Record<string, IRequestParams> = {
	getAllIncidents: {
		url: (patientId: number): string => `users/patients/patient/${patientId}`,
		method: 'GET',
	},
	getPatients: {
		url: 'users/patients',
		method: 'GET',
	},
};
