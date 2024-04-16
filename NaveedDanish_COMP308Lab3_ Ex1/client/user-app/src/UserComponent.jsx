import React, { useState } from "react";
import { useMutation, useApolloClient } from "@apollo/client";
import { Alert, Button, Form, Container, Row, Col } from "react-bootstrap";
import { LOGIN_MUTATION, REGISTER_MUTATION, SIGN_OUT_MUTATION } from "./queries/authQueries";

function UserComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status

  const client = useApolloClient();

  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: () => {
      window.dispatchEvent(
        new CustomEvent("loginSuccess", { detail: { isLoggedIn: true } })
      );
      setIsLoggedIn(true); // Update login status on successful login
    },
    onError: (error) => setAuthError(error.message || "Login failed"),
  });

  const [register] = useMutation(REGISTER_MUTATION, {
    onCompleted: () => {
      alert("Registration successful! Please log in.");
      setActiveTab("login");
    },
    onError: (error) => {
      setAuthError(error.message || "Registration failed");
    },
  });

  const [signOut] = useMutation(SIGN_OUT_MUTATION, {
    onCompleted: () => {
      client.clearStore(); // Clear Apollo cache after logout
      window.dispatchEvent(new CustomEvent("loginSuccess", { detail: { isLoggedIn: false } }));
      setIsLoggedIn(false); // Update login status on logout
    },
    onError: (error) => setLogoutError(error.message || "Logout failed"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthError("");

    if (!username || !password) {
      setAuthError("Username and password are required.");
      setIsSubmitting(false);
      return;
    }

    if (activeTab === "login") {
      await login({ variables: { username, password } });
    } else {
      await register({ variables: { username, password } });
    }
    setIsSubmitting(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Container fluid className="p-0">
      <Row className="justify-content-center m-0">
        <Col xs={120} md={600} lg={400} className="mt-5">
          <div className="p-4 bg-light rounded shadow">
            <h2 className="mb-4 text-center">{activeTab === "login" ? "Login" : "Sign Up"}</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              {authError && <Alert variant="danger">{authError}</Alert>}

              <Button variant="primary" type="submit" disabled={isSubmitting} block>
                {isSubmitting ? "Submitting..." : activeTab === "login" ? "Login" : "Sign Up"}
              </Button>
            </Form>
            <div className="mt-3 text-center">
              {activeTab === "login" ? (
                <p>
                  Don't have an account?{" "}
                  <Button variant="link" onClick={() => setActiveTab("signup")}>
                    Sign Up
                  </Button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <Button variant="link" onClick={() => setActiveTab("login")}>
                    Login
                  </Button>
                </p>
              )}
            </div>
            {isLoggedIn && (
              <div className="mt-3 text-center">
                <Button variant="danger" onClick={handleLogout} block>
                  Logout
                </Button>
                {logoutError && <Alert variant="danger">{logoutError}</Alert>}
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default UserComponent;
