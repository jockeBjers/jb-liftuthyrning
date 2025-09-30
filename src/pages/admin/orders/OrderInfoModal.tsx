import { Button, Modal, Table } from "react-bootstrap";


export default function OrderInfoModal(
    {
        showModal,
        handleCloseModal,
        selectedOrder,
        getOrderItems,
        lifts,
        getLiftName,
        setOrderToDelete,
        setShowDeleteOrderModal,
        setOrderItemToDelete,
        setShowDeleteOrderItemModal
    }: {
        showModal: boolean;
        handleCloseModal: () => void;
        selectedOrder: any | null;
        getOrderItems: (orderId: number) => any[];
        lifts: any[];
        getLiftName: (liftId: number) => string;
        setOrderToDelete: (order: any | null) => void;
        setShowDeleteOrderModal: (show: boolean) => void;
        setOrderItemToDelete: (item: any | null) => void;
        setShowDeleteOrderItemModal: (show: boolean) => void;
    }
) {
    return (
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
            <Modal.Header closeButton className="bg-body border-secondary">
                <Modal.Title className='text-primary'>
                    Order #{selectedOrder?.id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedOrder ? (
                    <>
                        <p>
                            <strong>Orderdatum:</strong> {selectedOrder.orderDate}<br />
                            <strong>Returdatum:</strong> {selectedOrder.returnDate}<br />
                            <strong>Totalt pris:</strong> {selectedOrder.totalPrice} kr
                        </p>
                        <Table size="sm" bordered hover>
                            <thead>
                                <tr>
                                    <th>Produkt</th>
                                    <th className="d-none d-md-table-cell">Pris/dag</th>
                                    <th className="d-none d-md-table-cell">Startavgift</th>
                                    <th className="text-center" style={{ width: "100px" }}>Hantera</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getOrderItems(selectedOrder.id).map(item => {
                                    const lift = lifts.find(l => l.id === item.liftId);
                                    return (
                                        <tr key={item.id}>
                                            <td >{getLiftName(item.liftId)}</td>
                                            <td className="d-none d-md-table-cell">{lift?.dailyPrice} kr</td>
                                            <td className="d-none d-md-table-cell">{lift?.startFee} kr</td>
                                            <td className="text-center" style={{ width: "70px" }}>
                                                <Button
                                                    variant="link"
                                                    onClick={() => {
                                                        setOrderItemToDelete(item);
                                                        setShowDeleteOrderItemModal(true);
                                                    }}
                                                >
                                                    <i className="bi bi-trash text-danger"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </>
                ) : (
                    <p>Ingen order vald.</p>
                )}
            </Modal.Body>
            <Modal.Footer className="bg-body border-secondary">
                {selectedOrder && (
                    <Button
                        variant="danger"
                        onClick={() => {
                            setOrderToDelete(selectedOrder);
                            setShowDeleteOrderModal(true);
                        }}
                    >
                        Ta bort order
                    </Button>
                )}
                <Button variant="secondary" onClick={handleCloseModal}>
                    Stäng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
