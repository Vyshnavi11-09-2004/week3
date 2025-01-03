import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Col, Container, Row, Form, ListGroup } from 'reactstrap';
import CommonSection from '../shared/CommonSection';
import Booking from '../components/Booking/Booking';
import Newsletter from '../shared/Newsletter';
import avatar from '../assets/images/avatar.jpg';
import '../styles/tour-details.css';
import { BASE_URL } from '../utils/config';

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef('');
  const [tour, setTour] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tours/${id}`);
        setTour(response.data);
        setReviews(response.data.reviews);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchTourDetails();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      const response = await axios.post(`${BASE_URL}/tours/${id}/reviews`, {
        review: reviewText,
      });
      setReviews([...reviews, response.data]);
      reviewMsgRef.current.value = '';
    } catch (err) {
      console.error('There was an error submitting the review!', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { title, desc, address, city, distance, maxGroupSize, price, totalRating, avgRating } = tour;

  return (
    <>
      <CommonSection title={title} />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <div className="tour__content">
                <h2>{title}</h2>
                <p>{desc}</p>
                <div className="tour__info">
                  <span>{address}</span>
                  <span>{city}</span>
                  <span>{distance} km</span>
                  <span>{maxGroupSize} people</span>
                  <span>${price}</span>
                  <span>{totalRating} ({avgRating})</span>
                </div>
                <Form onSubmit={submitHandler}>
                  <textarea ref={reviewMsgRef} placeholder="Write a review"></textarea>
                  <button type="submit" className="primary__btn">Submit</button>
                </Form>
                <ListGroup className="review__container">
                  {reviews.map((review, index) => (
                    <li key={index} className="review__item">
                      <img src={avatar} alt="avatar" />
                      <p>{review.text}</p>
                    </li>
                  ))}
                </ListGroup>
              </div>
            </Col>
            <Col lg="4">
              <Booking tour={tour} />
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;