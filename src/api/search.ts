"use server";

import { redirect } from "next/navigation";

export const searchAction = (formData: FormData) => {
	"use server";

	const phrase = formData.get("search") as string;

	redirect(`/search/?query=${phrase}`);
};
