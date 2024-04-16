import { gql } from "@apollo/client";

const VITAL_SIGNS = gql`
query {
    vitalSigns {
      bloodPressure
      heartRate
      id
      respiratoryRate
      temperature
    }
  }
`;

const ADD_VITAL_SIGN = gql`
 mutation CreateVitalSign($temperature: Float!, $bloodPressure: String!, $heartRate: Float!, $respiratoryRate: Float!) {
    createVitalSign(temperature: $temperature, bloodPressure: $bloodPressure, heartRate: $heartRate, respiratoryRate: $respiratoryRate) {
      id
      temperature
      bloodPressure
      heartRate
      respiratoryRate
    }
  }
`;

const GET_VITAL_SIGN_BY_ID = gql`
  query GetVitalSignById($id: ID!) {
  vitalSign(id: $id) {
    bloodPressure
    heartRate
    id
    respiratoryRate
    temperature
  }
}
`;

const UPDATE_VITAL_SIGN = gql`
  mutation UpdateVitalSign($id: ID!, $temperature: Float!, $bloodPressure: String!, $heartRate: Float!, $respiratoryRate: Float!) {
  updateVitalSign(id: $id, temperature: $temperature, bloodPressure: $bloodPressure, heartRate: $heartRate, respiratoryRate: $respiratoryRate) {
    id
    temperature
    bloodPressure
    heartRate
    respiratoryRate
  }
}

`;

export { VITAL_SIGNS, ADD_VITAL_SIGN, GET_VITAL_SIGN_BY_ID, UPDATE_VITAL_SIGN };
