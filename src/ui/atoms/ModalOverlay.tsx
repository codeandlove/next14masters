"use client";

import { useRouter } from "next/navigation";

export const ModalOverlay = () => {
	const router = useRouter();
	return <div onClick={() => router.back()} className="fixed inset-0 z-20 bg-black/50"></div>;
};
