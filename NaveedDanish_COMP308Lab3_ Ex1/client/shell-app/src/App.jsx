import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import "./App.css";
import UserApp from "../../user-app/src/App";
import VitalSignApp from "../../vitalsign-app/src/App";

const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    currentUser {
      username
    }
  }
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserApp, setShowUserApp] = useState(true); // Initially show the User app

  const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    const handleLoginSuccess = (event) => {
      setIsLoggedIn(event.detail.isLoggedIn);
    };

    window.addEventListener("loginSuccess", handleLoginSuccess);

    if (!loading && !error) {
      setIsLoggedIn(!!data.currentUser);
    }

    return () => {
      window.removeEventListener("loginSuccess", handleLoginSuccess);
    };
  }, [loading, error, data]);

  const handleNavigateToUserApp = () => {
    setShowUserApp(true);
  };

  const handleNavigateToVitalSignApp = () => {
    setShowUserApp(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          {showUserApp ? (
            <>
              <UserApp />
              <button onClick={handleNavigateToVitalSignApp} style={{marginTop:"5%"}}>Go to Vital App</button>
            </>
          ) : (
            <>
              <VitalSignApp />
              <button onClick={handleNavigateToUserApp}>Go to User App</button>
            </>
          )}
        </>
      ) : (
        <UserApp />
      )}
    </div>
  );
}

export default App;
