export interface IMapData {
	type: string;
	features: [
		{
			id: string;
			type: string;
			geometry: {
				type: string;
				coordinates: [[number, number]];
			};
			properties: {
				balloonContentHeader: string;
				balloonContentFooter: string;
				clusterCaption: string;
			};
			options: {
				hideIconOnBalloonOpen: boolean;
				iconLayout: string;
				iconImageHref: string;
				iconImageSize: [number, number];
				iconImageOffset: [number, number];
				draggable: boolean;
				strokeWidth: number;
				strokeColor: string;
				strokeStyle: string;
			};
		},
	];
}
