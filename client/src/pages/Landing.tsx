import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Navbar from "./components/Navbar";
import { IProduct } from "../Types";
import ProductCard from "./components/ProductCard";
import Pagination from "./components/Pagination";

const Landing = () => {
	const [fetchPage, setFetchPage] = useState(0);
	const [totalPages, setTotalPages] = useState(1);
	const getProducts = async (page: number): Promise<IProduct[]> => {
		try {
			const { data } = await axios.get(`api/products/${fetchPage}`);
			setTotalPages(Math.ceil(data.data.itemCount / 20));
			const products = data.data.products.map(
				(product: {
					name: string;
					price: { current: { text: string; value: number } };
					brandName: string;
					id: number;
					imageUrl: string;
				}) => ({
					name: product.name,
					priceText: product.price.current.text,
					price: product.price.current.value,
					brand: product.brandName,
					id: product.id,
					image: product.imageUrl,
				})
			);
			return products;
		} catch (err: any) {
			throw new Error(err);
		}
	};

	const { isLoading, error, data } = useQuery<IProduct[], Error>(
		["products", fetchPage],
		() => getProducts(fetchPage),
		{ cacheTime: Infinity, staleTime: Infinity }
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error fetching data</div>;
	}

	return (
		<>
			<Navbar />
			{data === undefined ? (
				<div>No data found</div>
			) : (
				<div className="flex flex-col items-center w-screen">
					<Pagination fetchPage={fetchPage} totalPages={totalPages} setFetchPage={setFetchPage} />
					<div className="grid grid-cols-3 gap-10 w-8/12">
						{data.map((product) => (
							<ProductCard key={product.name} {...product} />
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default Landing;
