import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useContext } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import { CartContext } from "./context/cart/cartContext";
import type { ICartContext } from "../Types";
import DetailsView from "./components/DetailsView";

interface IDetails {
	name: string;
	description: string;
	inStock: boolean;
	gender: string;
	brand: string;
	sizeArr: string[];
	imagesArr: string[];
	priceText: string;
	price: number;
	id: string;
}

const ProductDetails = () => {
	const { id } = useParams();
	const { cart, dispatchCart } = useContext(CartContext) as ICartContext;

	const fetchDetails = async (productId: string | undefined): Promise<IDetails> => {
		if (productId === undefined) {
			throw new Error("Product ID is undefined");
		}
		try {
			const { data } = await axios.get(`/api/details/${productId}`);
			const details = {
				name: data.data.name,
				description: data.data.description.slice(data.data.description.indexOf("<ul>")),
				inStock: data.data.isInStock,
				gender: data.data.gender,
				brand: data.data.brand.name,
				sizeArr: data.data.variants.map((variant: { brandSize: string }) => variant.brandSize),
				imagesArr: data.data.media.images.map((image: { url: string }) => image.url),
				priceText: data.data.price.current.text,
				price: data.data.price.current.value,
				id: data.data.id,
			};
			return details;
		} catch (err: any) {
			throw new Error(err);
		}
	};

	const {
		isLoading,
		error,
		data: details,
	} = useQuery<IDetails, Error>(["details", id], () => fetchDetails(id), {
		cacheTime: Infinity,
		staleTime: Infinity,
	});

	const addToCart = async (quantity: number, option: string) => {
		if (details) {
			dispatchCart({
				type: "ADD",
				payload: {
					name: details.name,
					image: details.imagesArr[0],
					priceText: details.priceText,
					price: details.price,
					quantity: quantity,
					size: option,
					id: String(details.id),
				},
			});
		}
	};

	if (isLoading) {
		return (
			<div>
				<Navbar />
				<p>Loading...</p>
			</div>
		);
	}

	if (error || !details) {
		return (
			<div>
				<Navbar />
				<p>Error fetching data</p>
			</div>
		);
	}

	return (
		<>
			<Navbar />
			<DetailsView
				name={details.name}
				images={details.imagesArr}
				price={details.price}
				options={details.sizeArr}
				addToCart={addToCart}
			/>
		</>
	);
};

export default ProductDetails;
