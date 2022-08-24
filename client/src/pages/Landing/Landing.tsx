import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Navbar from "../Navbar";
import { IProductCard } from "../../Types";
import ProductCard from "./CardView";
import Pagination from "./Pagination";

interface IProductsFetch {
	pages: number;
	products: IProductCard[];
}

const Landing = () => {
	const [cataloguePage, setCatPage] = useState(0);
	const [lastPage, setLastPage] = useState(1);

	const getProducts = async (page: number): Promise<IProductsFetch> => {
		const { data } = await axios.get(`api/products/${page}`);
		const pages = Math.ceil(data.data.itemCount / 20);
		const products = data.data.products.map(
			(product: {
				name: string;
				price: { current: { value: number } };
				brandName: string;
				id: number;
				imageUrl: string;
			}) => ({
				name: product.name,
				price: product.price.current.value,
				brand: product.brandName,
				id: product.id,
				image: product.imageUrl,
			})
		);
		return { pages, products };
	};

	const {
		isLoading,
		error,
		data: productPage,
	} = useQuery<IProductsFetch, Error>(
		["products", cataloguePage],
		() => getProducts(cataloguePage),
		{ staleTime: 600000 }
	);

	useEffect(() => {
		if (productPage) {
			setLastPage(productPage.pages);
		}
	}, [productPage]);

	return (
		<>
			<Navbar />
			{isLoading && <div>Loading product catalogue...</div>}
			{error && <div>Error fetching data</div>}
			{productPage && (
				<div className="flex flex-col items-center w-screen">
					<Pagination
						currentPage={cataloguePage + 1}
						lastPage={lastPage}
						setFetchPage={setCatPage}
					/>
					<div className="grid grid-cols-3 gap-10 w-8/12">
						{productPage.products.map((product) => (
							<ProductCard key={product.name} {...product} />
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default Landing;
