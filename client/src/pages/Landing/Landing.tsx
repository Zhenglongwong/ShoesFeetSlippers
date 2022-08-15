import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Navbar from "../Navbar";
import { ICard } from "../../Types";
import ProductCard from "./CardView";
import Pagination from "./Pagination";

const Landing = () => {
	const [cataloguePage, setCatPage] = useState(0);
	const [lastPage, setLastPage] = useState(1);

	const getProducts = async (page: number): Promise<ICard[]> => {
		try {
			const { data } = await axios.get(`api/products/${page}`);
			setLastPage(Math.ceil(data.data.itemCount / 20));
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
			return products;
		} catch (err: any) {
			throw new Error(err);
		}
	};

	const { isLoading, error, data } = useQuery<ICard[], Error>(
		["products", cataloguePage],
		() => getProducts(cataloguePage),
		{ cacheTime: 600000, staleTime: 600000 }
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error || !data) {
		return <div>Error fetching data</div>;
	}

	return (
		<>
			<Navbar />
			<div className="flex flex-col items-center w-screen">
				<Pagination currentPage={cataloguePage + 1} lastPage={lastPage} setFetchPage={setCatPage} />
				<div className="grid grid-cols-3 gap-10 w-8/12">
					{data.map((product) => (
						<ProductCard key={product.name} {...product} />
					))}
				</div>
			</div>
		</>
	);
};

export default Landing;
