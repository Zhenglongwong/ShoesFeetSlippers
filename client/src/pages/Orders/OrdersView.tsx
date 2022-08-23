import { IOrders } from "../../Types";
import { formatter } from "../../Utilites";

interface IOrdersViewProps {
	orders: IOrders;
}

const OrdersView = ({ orders }: IOrdersViewProps) => {
	return (
		<div className="overflow-x-auto w-full">
			<table className="table w-full">
				{/* <!-- head --> */}
				<thead>
					<tr>
						<th>Item</th>
						<th>Qty</th>
						<th>Price</th>
						<th>Paid</th>
						<th>Date Ordered</th>
						<th>Status</th>
						<th>Received</th>
					</tr>
				</thead>
				<tbody>
					{/* <!-- row 1 --> */}
					{orders.map((item) => (
						<tr>
							<td>
								<div className="flex items-center space-x-3">
									<div className="avatar">
										<div className="mask mask-squircle w-12 h-12">
											<img
												src="/tailwind-css-component-profile-2@56w.png"
												alt="Avatar Tailwind CSS Component"
											/>
										</div>
									</div>
									<div>
										<div className="font-bold">{item.name}</div>
										<div className="text-sm opacity-50">{item.size}</div>
									</div>
								</div>
							</td>
							<td>{item.quantity}</td>
							<td>{item.priceText}</td>
							<td>{formatter.format(item.price * item.quantity)}</td>
							<td>date</td>
							<td>To ship</td>
							<th>
								<button className="btn btn-ghost btn-xs">&#10003;</button>
							</th>
						</tr>
					))}
				</tbody>
				{/* <!-- foot --> */}
				{/* <tfoot>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Job</th>
						<th>Favorite Color</th>
						<th></th>
					</tr>
				</tfoot> */}
			</table>
		</div>
	);
};

export default OrdersView;
