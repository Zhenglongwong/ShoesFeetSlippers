import { IOrders } from "../../Types";
import { formatter } from "../../Utilites";

interface IOrdersViewProps {
	orders: IOrders;
	deleteOrder: (itemId: string) => void;
}

const OrdersView = ({ orders, deleteOrder }: IOrdersViewProps) => {
	return (
		<div className="overflow-x-auto w-full">
			<table className="table w-full">
				<thead>
					<tr>
						<th>Orders</th>
						<th>Qty</th>
						<th>Price</th>
						<th>Paid</th>
						<th>Date Ordered</th>
						<th>Status</th>
						<th>Received</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((item) => (
						<tr key={item.id}>
							<td>
								<div className="flex items-center space-x-3">
									<div className="avatar">
										<div className="mask mask-squircle w-12 h-12">
											<img src={`https://${item.image}`} alt={item.name} />
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
							<td>{`${item.orderDate}`.split(" ").slice(1, 4).join(" ")}</td>
							<td>To ship</td>
							<th>
								<button className="btn btn-ghost btn-xs" onClick={() => deleteOrder(item._id)}>
									&#10003;
								</button>
							</th>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default OrdersView;
