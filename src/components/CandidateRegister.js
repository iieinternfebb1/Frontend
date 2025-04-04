import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button , Card } from "react-bootstrap";
import axios from "axios";
import { motion } from "framer-motion";
import "../Styles/Register.css"; // Make sure to create this file

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:2000/users/register", formData);
      alert("Registration Successful");
      navigate("/CandidateLogin");
    } catch (error) {
      alert("Error registering user");
    }
  };

  return (
    <div className="register-container">
      <motion.div 
        className="register-box"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Card className="register-card p-4">
          <h2 className="text-center mb-3">Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link to="/CandidateLogin" className="login-link">
                Login
              </Link>
            </p>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
