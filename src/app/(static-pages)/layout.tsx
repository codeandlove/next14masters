import { type ReactNode } from "react";

export default function StaticPagesLayout({ children }: { children: ReactNode }) {
	return (
		<div className="container mx-auto px-4">
			<div className="flex items-center justify-center">
				<div className="text-center">{children}</div>
			</div>
		</div>
	);
}
