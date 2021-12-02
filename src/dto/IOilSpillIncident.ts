export interface IOilSpillIncident {
	id: number;
	firstDetectionDate: Date;
	lastUpdate: Date;
	coordinates: [number, number][];
	danger: IDanger;
	status: 'unapproved' | 'inspection' | 'approved' | 'eliminated';
	pipeOwner: string;
	objectFrom: string;
	objectTo: string;
	spillPhoto: string;
}

export interface IDanger {
	dangerClass: 'low' | 'medium' | 'high';
	spillArea: string;
	dangerFactors: [
		{
			id: number;
			value: string;
		},
	];
}
