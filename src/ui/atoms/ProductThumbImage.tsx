import NextImage from "next/image";
export const ProductThumbImage = ({ src, alt }: { src: string; alt: string }) => {
	return (
		<div className="aspect-square h-20 w-20 border p-1">
			<NextImage
				loading="lazy"
				src={src}
				alt={alt}
				width={60}
				height={60}
				className="aspect-square h-full w-full object-cover object-center"
			/>
		</div>
	);
};
