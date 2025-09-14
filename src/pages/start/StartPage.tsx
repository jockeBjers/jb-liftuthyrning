import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
export default function StartPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="d-flex justify-content-center align-items-center start-page-bg">
        <h1 className="text-secondary bg-primary display-1 p-3">Hyr liftar hos oss!</h1>
      </div>

      <Container className="my-5 text-white-50">
        <Row className="text-center m-5">
          <Col>
            <Button variant="primary" size="lg" className="me-3">
              Logga in
            </Button>
            <Button variant="outline-primary " size="lg" onClick={() => navigate(`/products`)}>
              Se produkter
            </Button>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md="6">
            <h3 className='text-center text-primary'>Våra liftar är bäst</h3>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium dolore recusandae inventore sit laboriosam reiciendis, fugiat et itaque atque quod culpa voluptates quam facere consequuntur, quisquam veniam sequi, aspernatur possimus.</p>
          </Col>
          <Col md="6">
            <h3 className='text-center text-primary'>Prisgaranti</h3>
            <p>Alltid biligast. Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam reiciendis delectus assumenda totam.</p>
          </Col>
        </Row>
      </Container>
      <Row className="bg-primary text-secondary py-4 mb-5 text-center p-2-xs">
        <Col className="text-cente container">
          <h4 className=' text-center' >Varför välja oss?</h4>
          <p className="mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam reiciendis delectus amet consectetur adipisicing elit. Numquam reiciendis delectus amet consectetur adipisicing elit. Numquam reiciendis delectus assumenda totam.</p>
        </Col>
      </Row>
      <Container className="my-5 text-white-50">
        <Row>
          <Col md="4">
            <h5 className='text-decoration-underline text-primary'>Säkra liftar</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam reiciendis delectus assumenda totam.</p>
          </Col>
          <Col md="4">
            <h5 className='text-decoration-underline text-primary'>Flexibla avtal</h5>
            <p>timspris eller dagspris. Lorem ipsum dolor sit amet.</p>
          </Col>
          <Col md="4">
            <h5 className='text-decoration-underline text-primary'>Woof Woof</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}