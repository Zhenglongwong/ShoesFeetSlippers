interface iPaginationProps {
	currentPage: number;
	lastPage: number;
	setFetchPage: (num: number) => void;
}

const Pagination = ({ currentPage, lastPage, setFetchPage }: iPaginationProps) => {
	const handleNext = (): void => {
		if (currentPage !== lastPage) {
			setFetchPage(currentPage);
		}
	};

	const handlePrev = (): void => {
		if (currentPage !== 1) {
			setFetchPage(currentPage - 2);
		}
	};

	return (
		<div className="btn-group">
			<button className="btn" onClick={handlePrev}>
				«
			</button>
			<button className="btn">{`Page ${currentPage}/${lastPage}`}</button>
			<button className="btn" onClick={handleNext}>
				»
			</button>
		</div>
	);
};

export default Pagination;
