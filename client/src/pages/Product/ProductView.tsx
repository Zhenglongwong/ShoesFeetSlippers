import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { formatter } from "../../Utilites";

interface IProductViewProps {
	images: string[];
	options: string[];
	name: string;
	price: number;
	addToCart: (quantity: number, option: string) => void;
}

const ProductView = ({ images, options, name, price, addToCart }: IProductViewProps) => {
	const priceText = formatter.format(price);

	const initialValues = {
		quantity: 1,
		option: "",
	};

	const validationSchema = Yup.object({
		quantity: Yup.number(),
		option: Yup.string().required("Please select an option"),
	});

	return (
		<>
			<section>
				<div className="relative max-w-screen-xl px-4 py-8 mx-auto">
					<div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
						<div className="grid grid-cols-2 gap-4 md:grid-cols-1">
							<div className="aspect-w-1 aspect-h-1">
								<img alt={name} className="object-cover rounded-xl" src={`https://${images[0]}`} />
							</div>

							<div className="grid grid-cols-2 gap-4 lg:mt-4">
								{images.map((image) => (
									<div key={image} className="aspect-w-1 aspect-h-1">
										<img alt={name} className="object-cover rounded-xl" src={`https://${image}`} />
									</div>
								))}
							</div>
						</div>

						<div className="sticky top-0">
							<strong className="border border-blue-600 rounded-full tracking-wide px-3 font-medium py-0.5 text-xs bg-gray-100 text-blue-600">
								{" "}
								Instock{" "}
							</strong>

							<div className="flex justify-between mt-8">
								<div className="max-w-[35ch]">
									<h1 className="text-2xl font-bold">{name}</h1>

									<div className="flex mt-2 -ml-0.5">
										<svg
											className="w-5 h-5 text-yellow-400"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
										</svg>

										<svg
											className="w-5 h-5 text-yellow-400"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
										</svg>

										<svg
											className="w-5 h-5 text-yellow-400"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
										</svg>

										<svg
											className="w-5 h-5 text-yellow-400"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
										</svg>

										<svg
											className="w-5 h-5 text-gray-200"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
										</svg>
									</div>
								</div>

								<p className="text-lg font-bold">{priceText}</p>
							</div>

							<details className="relative mt-4 group">
								<summary className="block">
									<div>
										<div className="prose max-w-none group-open:hidden">
											<p>
												Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa veniam dicta
												beatae eos ex error culpa delectus rem tenetur, architecto quam nesciunt,
												dolor veritatis nisi minus inventore, rerum at recusandae?
											</p>
										</div>

										<span className="mt-4 text-sm font-medium underline cursor-pointer group-open:absolute group-open:bottom-0 group-open:left-0 group-open:mt-0">
											Read More
										</span>
									</div>
								</summary>

								<div className="pb-6 prose max-w-none">
									<p>
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa veniam dicta
										beatae eos ex error culpa delectus rem tenetur, architecto quam nesciunt, dolor
										veritatis nisi minus inventore, rerum at recusandae?
									</p>

									<p>
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat nam sapiente
										nobis ea veritatis error consequatur nisi exercitationem iure laudantium culpa,
										animi temporibus non! Maxime et quisquam amet. A, deserunt!
									</p>
								</div>
							</details>
							<Formik
								initialValues={initialValues}
								validationSchema={validationSchema}
								onSubmit={(values, { setSubmitting }) => {
									const { quantity, option } = values;
									addToCart(quantity, option);
									setTimeout(() => {
										setSubmitting(false);
									}, 400);
								}}
							>
								{(props) => (
									<Form className="mt-8">
										<fieldset className="mt-4">
											<legend className="mb-1 text-sm font-medium">Size</legend>

											<div className="flow-root">
												<div className="flex flex-wrap -m-0.5">
													{options.map((option) => (
														<label key={option} htmlFor={option} className="cursor-pointer p-0.5">
															<Field
																type="radio"
																name="option"
																id={option}
																className="sr-only peer"
																value={option}
															/>

															<span className="inline-flex items-center justify-center w-14 h-10 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white">
																{option}
															</span>
														</label>
													))}
												</div>
												<ErrorMessage component="p" name="option" className="text-orange-500" />
											</div>
										</fieldset>

										<div className="flex mt-8">
											<div>
												<label htmlFor="quantity" className="sr-only">
													Qty
												</label>

												<Field
													type="number"
													id="quantity"
													name="quantity"
													min="1"
													className="w-20 py-3 text-xs text-center border-gray-200 rounded no-spinners"
												/>
											</div>

											<motion.button
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.9 }}
												type="submit"
												className="block px-5 py-3 ml-3 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-500"
											>
												Add to Cart
											</motion.button>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ProductView;
