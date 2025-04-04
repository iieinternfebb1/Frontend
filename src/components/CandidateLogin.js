import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import "../Styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:2000/users/login", formData);

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data)); // Store user details
        alert("Login Successful!");
        navigate("/CandidateProfile"); // Redirect to Dashboard
      }
    } catch (error) {
      setError("Invalid email or password!");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center login-container">
      <Card className="login-card">
        <Card.Body>
          <h2 className="text-center">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit" className="btn btn-primary w-100">Login</Button>
          </Form>

          <p className="text-center mt-3">
            Don't have an account? <a href="/CandidateRegister">Register</a>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;



