import { screen } from "@testing-library/react";

export const getByRoleName = (role: string, name: string): HTMLElement => {
		return screen.getByRole(role, { name: name });
	};