import { Pagination } from "react-bootstrap";

export default function TablePagination({
    currentPage,
    totalPages,
    setCurrentPage
}: {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}) {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    return (
        <Pagination className="justify-content-center custom-pagination">
            <Pagination.First
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
            />
            <Pagination.Prev
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
            />

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </Pagination.Item>
            ))}

            <Pagination.Next
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
            />
            <Pagination.Last
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
            />
        </Pagination>
    );

}   