import React, { FC, ReactElement } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ContextProvider from "../../src/pages/context/cart/cartContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { screen, render, RenderOptions } from "@testing-library/react";

export const getByRoleName = (role: string, name: string): HTMLElement => {
	return screen.getByRole(role, { name: name });
};

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<ContextProvider>
				<Router>{children}</Router>
			</ContextProvider>
		</QueryClientProvider>
	);
};

export const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
	render(ui, { wrapper: AllTheProviders, ...options });
