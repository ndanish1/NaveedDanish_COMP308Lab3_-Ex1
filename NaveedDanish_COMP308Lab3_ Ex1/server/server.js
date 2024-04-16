import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloGateway } from '@apollo/gateway';
import { IntrospectAndCompose } from '@apollo/gateway'; // Correct import
import { authMicroservice } from './microservices/auth.microservice.js';
import { vitalMicroservice } from './microservices/vital-sign.microservice.js';
import configureMongoose from './config/mongoose.js'; // Import the configureMongoose function

const app = express();

// Create Apollo Gateway for GraphQL APIs
const gateway = new ApolloGateway({
  link: new IntrospectAndCompose({}), // Use IntrospectAndComposeLink
  serviceList: [
    { name: "auth", url: "http://localhost:4001/graphql" }, // Example service
    { name: "vital", url: "http://localhost:4002/graphql" }, // Example service
  ],
});

// Create an Apollo Server
const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

// Configure Mongoose and establish MongoDB connection
configureMongoose()
  .then(() => {
    // Apply Apollo middleware to the Express app
    server.start().then(() => {
      server.applyMiddleware({ app });

      // Mount auth and vital microservice routes to the Express app
      app.use('/auth', authMicroservice);
      app.use('/vital', vitalMicroservice);

      // Start the Express server
      const port = process.env.PORT || 3000;
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    });
  })
  .catch(error => {
    console.error('Error configuring Mongoose:', error);
  });
