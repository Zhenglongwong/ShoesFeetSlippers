import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { CartContext } from "../context/cart/cartContext";
import { ICartContext } from "../Types";
import { formatter } from "../Utilites";

interface ICartModalProps {
	open: boolean;
	setModal: (open: boolean) => void;
}

const CartModal = ({ open, setModal }: ICartModalProps) => {
	const { cart, dispatchCart, cartTotal } = useContext(CartContext) as ICartContext;

	const removeItem = (itemIndex: number) => {
		dispatchCart({ type: "REMOVE", payload: cart[itemIndex] });
	};

	const checkout = async () => {
		try {
			const { data } = await axios.post("/api/stripe/create-checkout-session", cart);
			window.location.href = `${data.url}`;
		} catch (e) {
			console.log("error", e);
		}
	};

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={() => setModal(false)}>
				<Transition.Child
					as={Fragment}
					enter="ease-in-out duration-500"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in-out duration-500"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
						<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-500 sm:duration-700"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-500 sm:duration-700"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<Dialog.Panel className="pointer-events-auto w-screen max-w-md">
									<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
										<div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
											<div className="flex items-start justify-between">
												<Dialog.Title className="text-lg font-medium text-gray-900">
													{" "}
													Shopping cart{" "}
												</Dialog.Title>
												<div className="ml-3 flex h-7 items-center">
													<button
														type="button"
														className="-m-2 p-2 text-gray-400 hover:text-gray-500"
														onClick={() => setModal(false)}
													>
														<span className="sr-only">Close panel</span>
														<XIcon className="h-6 w-6" aria-hidden="true" />
													</button>
												</div>
											</div>

											<div className="mt-8">
												<div className="flow-root">
													<ul role="list" className="-my-6 divide-y divide-gray-200">
														{cart.map((product, index) => (
															<li key={`${product.name} ${index}`} className="flex py-6">
																<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
																	<img
																		src={`https://${product.image}`}
																		alt={product.name}
																		className="h-full w-full object-cover object-center"
																	/>
																</div>

																<div className="ml-4 flex flex-1 flex-col">
																	<div>
																		<div className="flex justify-between text-base font-medium text-gray-900">
																			<h3>
																				<Link to={`/details/${product.productId}`}> {product.name} </Link>
																			</h3>
																			<p className="ml-4">{product.priceText}</p>
																		</div>
																	</div>
																	<div className="flex flex-1 items-end justify-between text-sm">
																		<p className="text-gray-500" aria-label={`quantity ${index}`}>
																			Qty: {product.quantity}
																		</p>
																		<p className="text-gray-500" aria-label={`size ${index}`}>
																			Size: {product.size}
																		</p>

																		<div className="flex">
																			<button
																				type="button"
																				className="font-medium text-indigo-600 hover:text-indigo-500"
																				aria-label={`Remove ${index}`}
																				onClick={() => removeItem(index)}
																			>
																				Remove
																			</button>
																		</div>
																	</div>
																</div>
															</li>
														))}
													</ul>
												</div>
											</div>
										</div>

										<div className="border-t border-gray-200 py-6 px-4 sm:px-6">
											<div className="flex justify-between text-base font-medium text-gray-900">
												<p>Subtotal</p>
												<p>{formatter.format(cartTotal)}</p>
											</div>
											<p className="mt-0.5 text-sm text-gray-500">
												Shipping and taxes calculated at checkout.
											</p>
											<div className="mt-6 flex items-center justify-center ">
												<button
													className="rounded-md w-full border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
													onClick={checkout}
												>
													Checkout
												</button>
											</div>
											<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
												<p>
													or{" "}
													<button
														type="button"
														className="font-medium text-indigo-600 hover:text-indigo-500"
														onClick={() => setModal(false)}
													>
														Continue Shopping<span aria-hidden="true"> &rarr;</span>
													</button>
												</p>
											</div>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default CartModal;
