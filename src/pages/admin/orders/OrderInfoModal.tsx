import { Button, Modal, Table } from "react-bootstrap";


export default function OrderInfoModal(
    {
        showModal,
        handleCloseModal,
        selectedOrder,
        getOrderItems,
        lifts,
        getLiftName,
        deleteOrderItem,
        setOrderToDelete,
        setShowDeleteOrderModal
    }: {
        showModal: boolean;
        handleCloseModal: () => void;
        selectedOrder: any | null;
        getOrderItems: (orderId: number) => any[];
        lifts: any[];
        getLiftName: (liftId: number) => string;
        deleteOrderItem: (orderItemId: number) => void;
        setOrderToDelete: (order: any | null) => void;
        setShowDeleteOrderModal: (show: boolean) => void;
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
                                    <th>Pris/dag</th>
                                    <th>Startavgift</th>
                                    <th>Hantera</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getOrderItems(selectedOrder.id).map(item => {
                                    const lift = lifts.find(l => l.id === item.liftId);
                                    return (
                                        <tr key={item.id}>
                                            <td>{getLiftName(item.liftId)}</td>
                                            <td>{lift?.dailyPrice} kr</td>
                                            <td>{lift?.startFee} kr</td>
                                            <td>
                                                <Button
                                                    variant="link"
                                                    onClick={() => {
                                                        deleteOrderItem(item.id);
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
            <Modal.Footer>
                {selectedOrder && (
                    <Button
                        variant="danger"
                        onClick={() => {
                            setOrderToDelete(selectedOrder);
                            setShowDeleteOrderModal(true);
                            handleCloseModal();
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