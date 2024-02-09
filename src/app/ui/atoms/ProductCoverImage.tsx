export const ProductCoverImage = ({ src, alt }: { src: string; alt: string }) => {
	return (
		<div className="aspect-square rounded-md border bg-slate-50 p-4 ">
			<div className="overflow-hidden">
				<img
					loading="lazy"
					src={src}
					alt={alt}
					width={320}
					height={320}
					className="h-full w-full scale-100 object-cover object-center transition-transform hover:scale-110"
				/>
			</div>
		</div>
	);
};
