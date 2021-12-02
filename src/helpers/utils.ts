export function dateToString(date: Date): string {
	return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
}
