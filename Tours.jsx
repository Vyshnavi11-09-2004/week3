import React, { useEffect, useState } from 'react';
import CommonSection from '../shared/CommonSection';
import "../styles/tour.css";

import tourData from '../assets/data/tours';
import { Col, Container, Row, Button, Input } from 'reactstrap';
import SearchBar from '../shared/SearchBar';
import TourCard from '../shared/TourCard';
import Newsletter from '../shared/Newsletter';

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [filteredTours, setFilteredTours] = useState(tourData);
  const [sortOption, setSortOption] = useState('default');
  const [filter, setFilter] = useState({
    destination: '',
    priceRange: [0, 10000],
    rating: 0,
  });

  useEffect(() => {
    // Implement pagination logic here
    const toursPerPage = 6;
    setPageCount(Math.ceil(filteredTours.length / toursPerPage));
  }, [filteredTours]);

  useEffect(() => {
    // Implement sorting logic here
    let sortedTours = [...filteredTours];
    if (sortOption === 'price') {
      sortedTours.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'rating') {
      sortedTours.sort((a, b) => b.rating - a.rating);
    }
    setFilteredTours(sortedTours);
  }, [sortOption]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const applyFilters = () => {
    let filtered = tourData.filter(tour => {
      return (
        tour.destination.toLowerCase().includes(filter.destination.toLowerCase()) &&
        tour.price >= filter.priceRange[0] &&
        tour.price <= filter.priceRange[1] &&
        tour.rating >= filter.rating
      );
    });
    setFilteredTours(filtered);
  };

  return (
    <>
      <CommonSection title="Tours" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <SearchBar />
            </Col>
            <Col lg="3">
              <div className="filter-section">
                <h5>Filter by</h5>
                <Input
                  type="text"
                  name="destination"
                  placeholder="Destination"
                  value={filter.destination}
                  onChange={handleFilterChange}
                />
                <Input
                  type="range"
                  name="priceRange"
                  min="0"
                  max="10000"
                  value={filter.priceRange}
                  onChange={handleFilterChange}
                />
                <Input
                  type="number"
                  name="rating"
                  placeholder="Rating"
                  value={filter.rating}
                  onChange={handleFilterChange}
                />
                <Button onClick={applyFilters}>Apply Filters</Button>
              </div>
            </Col>
            <Col lg="9">
              <div className="sort-section">
                <h5>Sort by</h5>
                <Input
                  type="select"
                  name="sortOption"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                </Input>
              </div>
              <Row>
                {filteredTours.slice(page * 6, (page + 1) * 6).map((tour, index) => (
                  <Col lg="4" md="6" sm="12" key={index}>
                    <TourCard tour={tour} />
                  </Col>
                ))}
              </Row>
              <div className="pagination">
                {[...Array(pageCount).keys()].map(number => (
                  <Button key={number} onClick={() => setPage(number)}>
                    {number + 1}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default Tours;
