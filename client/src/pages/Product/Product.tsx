import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useContext } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import ProductView from "./ProductView";
import { CartContext } from "../../context/cart/cartContext";
import type { ICartContext } from "../../Types";

interface IProduct {
	name: string;
	inStock: boolean;
	gender: string;
	brand: string;
	sizeArr: string[];
	imagesArr: string[];
	priceText: string;
	price: number;
	id: string;
}

const Product = () => {
	const { id } = useParams();
	const { dispatchCart } = useContext(CartContext) as ICartContext;

	const fetchDetails = async (productId: string | undefined): Promise<IProduct> => {
		const { data } = await axios.get(`/api/details/${productId}`);
		const product = {
			name: data.data.name,
			inStock: data.data.isInStock,
			gender: data.data.gender,
			brand: data.data.brand.name,
			sizeArr: data.data.variants.map((variant: { brandSize: string }) => variant.brandSize),
			imagesArr: data.data.media.images.map((image: { url: string }) => image.url),
			priceText: data.data.price.current.text,
			price: data.data.price.current.value,
			id: data.data.id,
		};
		return product;
	};

	const {
		isLoading,
		error,
		data: product,
	} = useQuery<IProduct, Error>(["details", id], () => fetchDetails(id), {
		cacheTime: 600000,
		staleTime: 600000,
	});

	const addToCart = (quantity: number, option: string) => {
		if (product) {
			dispatchCart({
				type: "ADD",
				payload: {
					name: product.name,
					image: product.imagesArr[0],
					priceText: product.priceText,
					price: product.price,
					quantity: quantity,
					size: option,
					id: String(product.id),
				},
			});
		}
	};

	return (
		<>
			<Navbar />
			{isLoading && <div> Loading product details... </div>}
			{error && <div> Error loading product details... </div>}
			{product && (
				<ProductView
					name={product.name}
					images={product.imagesArr}
					price={product.price}
					options={product.sizeArr}
					addToCart={addToCart}
				/>
			)}
		</>
	);
};

export default Product;
