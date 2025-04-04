import React from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";

import "../Styles/Home.css";


const Home = () => {
  return (
    <div className="home-container">
      <div className="overlay"></div>
      <div className="text-center text-white home-content">
        <h1 className="display-3 fw-bold fadeIn">Welcome to Job Portal</h1>
        <p className="lead fadeIn">Find your dream job or hire top talent easily!</p>

        <Row className="justify-content-center mt-4">
          <Col md={6} sm={12} className="fadeIn">
            <h3>For Candidates</h3>
            <Link to="/CandidateRegister">
              <Button variant="primary" className="home-btn">Register as Candidate</Button>
            </Link>
            <Link to="/CandidateLogin">
              <Button variant="outline-light" className="home-btn ms-2">Login as Candidate</Button>
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;



// import React from "react";
// import { Link } from "react-router-dom";
// import {  Button, Row, Col } from "react-bootstrap";
// import "../Styles/Home.css"; // Ensure file exists

// const Home = () => {
//   return (
//     <div className="home-container">
//       <div className="overlay"></div>
//       <div className="text-center text-white home-content">
//         <h1 className="display-3 fw-bold fadeIn">Welcome to Job Portal</h1>
//         <p className="lead fadeIn">Find your dream job or hire top talent easily!</p>

//         {/* Candidate Section */}
//         <Row className="justify-content-center mt-4">
//           <Col md={6} sm={12} className="fadeIn">
//             <h3>For Candidates</h3>
//             <Link to="/CandidateRegister">
//               <Button variant="primary" className="home-btn">Register as Candidate</Button>
//             </Link>
//             <Link to="/CandidateLogin">
//               <Button variant="outline-light" className="home-btn ms-2">Login as Candidate</Button>
//             </Link>
//           </Col>
//         </Row>

//         {/* HR (Employer) Section */}
//         <Row className="justify-content-center mt-4">
//           <Col md={6} sm={12} className="fadeIn">
//             <h3>For Human Resource</h3>
//             <Link to="/Hrregister">
//               <Button variant="success" className="home-btn">Register as HR</Button>
//             </Link>
//             <Link to="/Hrlogin">
//               <Button variant="outline-light" className="home-btn ms-2">Login as HR</Button>
//             </Link>
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default Home;

// import React from "react";
// import { Link } from "react-router-dom";
// import { Container, Button, Row, Col } from "react-bootstrap";
// import "../Styles/Home.css"; // Ensure exact match

// const Home = () => {
//   return (
//     <div className="home-container">
//       <div className="overlay"></div>
//       <Container className="text-center text-white home-content">
//         <h1 className="display-3 fw-bold fadeIn">Welcome to Job Portal</h1>
//         <p className="lead fadeIn">Find your dream job or hire top talent easily!</p>
//         <Row className="justify-content-center mt-4">
//           <Col md={4} sm={12} className="fadeIn">
//             <Link to="/register">
//               <Button variant="primary" className="home-btn">Register</Button>
//             </Link>
//           </Col>
//           <Col md={4} sm={12} className="fadeIn">
//             <Link to="/login">

//               <Button variant="outline-light" className="home-btn">Login</Button>
//             </Link>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Home;
