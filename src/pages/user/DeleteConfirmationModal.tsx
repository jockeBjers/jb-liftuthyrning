import { Button, Modal } from "react-bootstrap";


export default function DeleteConfirmationModal(
    { showCancelModal,
        setShowCancelModal,
        orderToCancel,
        handleRemoveOrder,
        userOrders }: {
            showCancelModal: boolean,
            setShowCancelModal: (show: boolean) => void,
            orderToCancel: number | null,
            handleRemoveOrder: (orderId: number) => Promise<void>,
            userOrders: any[]
        }
) {
    return (
        <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} centered>
            <Modal.Header closeButton className="bg-body border-secondary">
                <Modal.Title className='text-primary'>Bekräfta avbokning</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="pb-2">
                    Är du säker på att du vill avbryta order #{orderToCancel}?
                </p>
                <p className="text-white-50">
                    datum: {userOrders.find(o => o.id === orderToCancel)?.orderDate} - {userOrders.find(o => o.id === orderToCancel)?.returnDate}
                </p>
            </Modal.Body>
            <div className="d-flex justify-content-end gap-2 p-3 bg-body border-top border-secondary">

                <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
                    Avbryt
                </Button>
                <Button
                    variant="danger"
                    size="sm"
                    onClick={() => orderToCancel && handleRemoveOrder(orderToCancel)}
                    className="bg-transparent border-1 text-danger text-end"
                >
                    Bekräfta
                </Button>
            </div>
        </Modal>
    )
}
