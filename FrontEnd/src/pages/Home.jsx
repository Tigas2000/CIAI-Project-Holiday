import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="dhiwise-navigation">
      <h1>Homepage</h1>
      <p className="headline">
      </p>
      <ul>
        <li>
          <Link to="/">LandingPage</Link>
        </li>
        <li>
          <Link to="/listing">Listing</Link>
        </li>
        <li>
          <Link to="/listingmapview">ListingMapView</Link>
        </li>
        <li>
          <Link to="/propertydetails">PropertyDetails</Link>
        </li>
        <li>
          <Link to="/error">Error</Link>
        </li>
      </ul>
    </div>
  );
};
export default Home;
