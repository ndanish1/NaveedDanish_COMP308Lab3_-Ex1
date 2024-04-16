import "bootstrap/dist/css/bootstrap.min.css";
import VitalSign from "./components/VitalSign";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import VitalSignForm from "./components/VitalSignForm";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4002/graphql", // Set this to your actual GraphQL endpoint
  cache: new InMemoryCache(),
  credentials: "include",
});

function App() {
  return (
    <Router>
      <div className="App">
        <ApolloProvider client={client}>
          <Routes>
            <Route path="/" element={<VitalSign />} />
            <Route path="/addVitalSign" element={<VitalSignForm />} />
            <Route path="/edit/:id" element={<VitalSignForm />} />
          </Routes>
        </ApolloProvider>
      </div>
    </Router>
  );
}

export default App;
