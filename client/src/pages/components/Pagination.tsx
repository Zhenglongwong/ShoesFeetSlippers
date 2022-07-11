import { useState } from "react";

interface iPaginationProps {
	fetchPage: number;
	totalPages: number;
	setFetchPage: (num: number) => void;
}

const Pagination = ({ fetchPage, totalPages, setFetchPage }: iPaginationProps) => {
	const [page, setPage] = useState(fetchPage + 1);

	const handleNext = (): void => {
		if (page !== totalPages) {
			setFetchPage(fetchPage + 1);
			setPage(page + 1); //redundant but for testing
		}
	};

	const handlePrev = (): void => {
		if (fetchPage !== 0) {
			setFetchPage(fetchPage - 1);
			setPage(page - 1);
		}
	};

	return (
		<div className="btn-group">
			<button className="btn" onClick={handlePrev}>
				«
			</button>
			<button className="btn">{`Page ${page}/${totalPages}`}</button>
			<button className="btn" onClick={handleNext}>
				»
			</button>
		</div>
	);
};

export default Pagination;
