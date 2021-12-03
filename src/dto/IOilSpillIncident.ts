export interface IOilSpillIncident {
	id: number;
	firstDetectionDate: Date;
	detectionHistory: [
		{
			lastUpdate: Date;
			photo: string;
		},
	];
	coordinates: [[number, number][]];
	danger: {
		dangerClass: 'low' | 'medium' | 'high';
		landType: string;
		spillArea: string;
		dangerFactors: [
			{
				id: number;
				value: string;
			},
		];
	};
	status: 'unapproved' | 'inspection' | 'approved' | 'eliminated';
	pipeOwner: string;
	objectFrom: string;
	objectTo: string;
}
