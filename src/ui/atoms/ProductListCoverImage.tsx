import NextImage from "next/image";
export const ProductListCoverImage = ({ src, alt }: { src: string; alt: string }) => {
	return (
		<div className="border bg-slate-50 p-1">
			<div className="overflow-hidden">
				<NextImage
					loading="lazy"
					src={src}
					alt={alt}
					width={320}
					height={320}
					className="aspect-square h-full w-full scale-100 object-cover object-center transition-transform hover:scale-110"
				/>
			</div>
		</div>
	);
};
