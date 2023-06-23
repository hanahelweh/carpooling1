import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../reducers/userReducer";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleRegister = (event) => {
    navigate('/register');
  };
  const handleLogin = () => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      localStorage.setItem('userId', user._id);
      setLoginStatus("Login successful");
      navigate("/");
    } else {
      setLoginStatus("Login refused");
    }
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container style={{ height: 'calc(100vh - 80px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Row>
    <Col>
        <h2 className="text-center">Login</h2>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <div style={{ marginTop: '1rem' }}>
            <Button variant="primary" onClick={handleLogin} className="w-100">
              Login
            </Button>
          </div>
        </Form>
        {loginStatus && (
          <Alert
            variant={loginStatus === "Login successful" ? "success" : "danger"}
            style={{ marginTop: '1rem' }}
          >
            {loginStatus}
          </Alert>
        )}
        <p style={{ marginTop: '1rem' }}>Don't have an account?</p>
        <Button variant="primary" onClick={handleRegister} className="w-100">
              Register
            </Button>
      </Col>
    </Row>
  </Container>
);
};

export default Login;
