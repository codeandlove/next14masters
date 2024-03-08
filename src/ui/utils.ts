export const formatPrice = (price: number) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "PLN",
	}).format(price / 100);
};

export function sortByKey<T extends { [key: string]: number | string | object }>(
	array: T[],
	key: string,
): T[] {
	if (array.length === 0) return array;

	return array.sort((a: T, b: T) => {
		const x = a[key];
		const y = b[key];
		if (
			(typeof x === "string" && typeof y === "string") ||
			(typeof x === "number" && typeof y === "number")
		) {
			return x < y ? -1 : x > y ? 1 : 0;
		}

		return 0;
	});
}
