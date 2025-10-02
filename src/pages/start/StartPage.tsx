import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export default function StartPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  return (
    <>
      <div className="d-flex justify-content-center align-items-center start-page-bg text-center">
        <h1 className="text-secondary bg-primary display-1 p-3">Hyr liftar hos oss!</h1>
      </div>

      <Container fluid className="bg-body text-white py-5">
        <Container className="text-center">
          {user?.role === "user" ? (
            <>
              <h2 className="mb-4 text-primary">Hej {user.firstName}!</h2>
              <p className="mb-5">Gå till din profil för att se dina bokningar</p>
              <Button variant="primary" onClick={() => navigate(`/profile`)}>
                Gå till profil
              </Button>
            </>
          ) : (
            <>
              <h2 className="mb-4 text-primary">Har du redan ett konto?</h2>
              <p className="mb-5">Logga in för att boka liftar direkt och få tillgång till dina tidigare bokningar.</p>
              <Button variant="primary" onClick={() => navigate(`/login`)}>
                Logga in
              </Button>
            </>
          )}
        </Container>
      </Container>

      <Container fluid className="products-section text-center text-white py-5">
        <h2 className="text-primary mb-4">Utforska våra produkter</h2>
        <p className="mb-5">Se vårt stora utbud av liftar och hitta den som passar dig bäst.</p>
        <Button variant="primary" onClick={() => navigate(`/products`)}>
          Se produkter
        </Button>
      </Container>

      <Container className="my-5 text-white-50">
        <Row className="mb-5">
          <Col md="6">
            <h3 className="text-center text-primary">Våra liftar är bäst</h3>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium dolore recusandae inventore sit laboriosam reiciendis, fugiat et itaque atque quod culpa voluptates quam facere consequuntur, quisquam veniam sequi, aspernatur possimus.</p>
          </Col>
          <Col md="6">
            <h3 className="text-center text-primary">Prisgaranti</h3>
            <p>Alltid billigast. Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam reiciendis delectus assumenda totam.</p>
          </Col>
        </Row>
      </Container>

      <Row className="bg-primary text-secondary py-5 text-center">
        <Col>
          <h4 className="mb-3">Varför välja oss?</h4>
          <p className="mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam reiciendis delectus assumenda totam.</p>
        </Col>
      </Row>

      <Container className="my-5 text-white-50">
        <Row className="text-center">
          <Col md="4" className="mb-4">
            <h5 className="text-decoration-underline text-primary">Säkra liftar</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam reiciendis delectus assumenda totam.</p>
          </Col>
          <Col md="4" className="mb-4">
            <h5 className="text-decoration-underline text-primary">Enkel avbokning</h5>
            <p>Avboka framtida bokningar enkelt. Lorem ipsum dolor sit amet.</p>
          </Col>
          <Col md="4" className="mb-4">
            <h5 className="text-decoration-underline text-primary">Utbildad personal</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
