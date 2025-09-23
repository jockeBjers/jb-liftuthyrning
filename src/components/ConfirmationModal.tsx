import { Button, Modal } from "react-bootstrap";

interface ConfirmationModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
    title?: string;
    message: React.ReactNode;
    onConfirm: () => Promise<void> | void;
    confirmText?: string;
    cancelText?: string;
    confirmVariant?: string; 
}

export default function ConfirmationModal({
    show,
    setShow,
    title = "Bekräfta",
    message,
    onConfirm,
    confirmText = "Bekräfta",
    cancelText = "Avbryt",
    confirmVariant = "danger"
}: ConfirmationModalProps) {
    return (
        <Modal show={show} onHide={() => setShow(false)} centered>
            <Modal.Header closeButton className="bg-body border-secondary">
                <Modal.Title className='text-primary'>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            <div className="d-flex justify-content-end gap-2 p-3 bg-body border-top border-secondary">
                <Button variant="secondary" onClick={() => setShow(false)}>
                    {cancelText}
                </Button>
                <Button
                    variant={confirmVariant}
                    onClick={async () => {
                        await onConfirm();
                        setShow(false);
                    }}
                >
                    {confirmText}
                </Button>
            </div>
        </Modal>
    );
}
