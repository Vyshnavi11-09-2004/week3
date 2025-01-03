import React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import '../styles/thank-you.css';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="pt-5 text-center">
            <div className="thank__you">
              <span className="success-icon">
                <i className="ri-checkbox-circle-line"></i>
              </span>
              <h1 className="mb-3 fw-semibold">Thank You</h1>
              <h3 className="mb-4">Your tour is booked.</h3>
              <p className="mb-4">We appreciate your booking. You will receive a confirmation email shortly with the details of your tour.</p>
              <Button className=" primary__btn w-25">
                <Link to="/home" className="btn-link">Back to Home</Link>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ThankYou;
