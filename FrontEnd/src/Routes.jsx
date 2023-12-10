import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";

const Error = React.lazy(() => import("pages/Error"));

const PropertyDetails = React.lazy(() => import("pages/PropertyDetails"));
const ListingMapView = React.lazy(() => import("pages/ListingMapView"));
const Listing = React.lazy(() => import("pages/Listing"));

const LandingPage = React.lazy(() => import("pages/LandingPage"));
const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/listingmapview" element={<ListingMapView />} />
          <Route path="/propertydetails/:id" element={<PropertyDetails />} />
          <Route path="/error" element={<Error />} />
          <Route path="/dhiwise-dashboard" element={<Home />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
