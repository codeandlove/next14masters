export const ProductCoverImage = ({ src, alt }: { src: string; alt: string }) => {
	return (
		<div className="border p-4">
			<img
				loading="lazy"
				src={src}
				alt={alt}
				width={320}
				height={320}
				className="aspect-square h-full w-full object-cover object-center"
			/>
		</div>
	);
};
