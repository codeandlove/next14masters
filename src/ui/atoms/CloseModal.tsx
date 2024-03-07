"use client";

import { useRouter } from "next/navigation";

export const CloseModal = () => {
	const router = useRouter();

	return (
		<button className="absolute right-0 top-0 m-2 p-2 text-2xl" onClick={() => router.back()}>
			&times;
		</button>
	);
};
