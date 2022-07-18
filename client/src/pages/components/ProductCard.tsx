import {useNavigate} from "react-router-dom"
import {IProduct} from "../../Types"


const ProductCard = ({name, image, price, priceText, brand, id}: IProduct) => {
	const navigate = useNavigate()
	return (
		<div className="card compact bg-base-100 shadow-xl">
			<figure >
				<img src={`https://${image}`} alt="Shoes" />
			</figure>
			<div className="card-body">
				<h1 className="card-title">{name}</h1>
				<h2>{`By: ${brand}`}</h2>
				<p>{priceText}</p>
				<div className="flex flex-row justify-end">
					<div className="card-actions">
						<button aria-label={String(id)} className="btn btn-primary" onClick={()=> navigate(`/details/${id}`)}>Details</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
