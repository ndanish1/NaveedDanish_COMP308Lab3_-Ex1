import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    signIn(username: $username, password: $password)
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $password: String!) {
    signUp(username: $username, password: $password)
  }
`;


const SIGN_OUT_MUTATION = gql`
  mutation SignOut {
    signOut
  }
`;

export { LOGIN_MUTATION, REGISTER_MUTATION, SIGN_OUT_MUTATION };
