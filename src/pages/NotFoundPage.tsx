import { Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function NotFoundPage() {
    const location = useLocation();

    return (
        <Container className="text-center py-5 my-5">
            <h1 className="text-primary">Hoppsan hejsan, sidan finns inte!</h1>

            <div >
                <iframe
                    width="600"
                    height="340"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ"
                    title="Rickroll"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            <p>
                <strong className="text-primary">{location.pathname}</strong> finns inte på vår sida.
            </p>
            <p>
                <Link to="/">Gå tillbaka till start</Link>
            </p>
        </Container>
    );
}
