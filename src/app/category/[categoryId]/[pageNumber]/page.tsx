export default function CategoryPage({
	params,
}: {
	params: { categoryId: string; pageNumber: string };
}) {
	return <div>asd {params.categoryId}</div>;
}
