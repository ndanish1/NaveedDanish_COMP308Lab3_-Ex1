// user-app/src/App.jsx
// import "./App.css";
import UserComponent from "./UserComponent";
import "bootstrap/dist/css/bootstrap.min.css";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4001/graphql", // Set this to your actual GraphQL endpoint
  cache: new InMemoryCache(),
  credentials: "include",
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <UserComponent />
      </ApolloProvider>
    </div>
  );
}

export default App;
