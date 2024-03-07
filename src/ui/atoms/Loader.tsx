export const Loader = () => {
	return (
		<div
			className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-white/90"
			aria-busy="true"
		>
			<span className="h-10 w-10 rounded-full border border-t-0 border-blue-600 ">
				<span className="sr-only">Loading...</span>
			</span>
		</div>
	);
};
