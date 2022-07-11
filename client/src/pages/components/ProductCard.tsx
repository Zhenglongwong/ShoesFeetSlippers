import {iProduct} from "../../Types"


const ProductCard = ({ name, image, price, brand, id }: iProduct) => {
	return (
		<div className="card compact bg-base-100 shadow-xl">
			<figure >
				<img src={`https://${image}`} alt="Shoes" />
			</figure>
			<div className="card-body">
				<h1 className="card-title">{name}</h1>
				<h2>{`By: ${brand}`}</h2>
				<p>{price}</p>
				<div className="flex flex-row justify-between">
					<div className="card-actions">
						<button className="btn btn-primary">Cart</button>
					</div>
					<div className="card-actions">
						<button className="btn btn-primary">Details</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
