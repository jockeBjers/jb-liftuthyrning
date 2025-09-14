import { useNavigate } from 'react-router-dom';

export default function ReturnButton() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <button 
            onClick={handleGoBack}
            className="btn btn-link text-decoration-none text-primary p-0"
        >
            <i className="bi bi-arrow-left-circle mx-3 bg-transparent text-primary display-5"></i>
        </button>
    );
}