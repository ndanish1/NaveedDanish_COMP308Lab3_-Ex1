import { useQuery } from "@apollo/client";
import React from "react";
import { Table } from "react-bootstrap";
import { VITAL_SIGNS } from "../queries/vitalSignQueries";
import { Link } from "react-router-dom";

const VitalSign = () => {
  const { loading, error, data } = useQuery(VITAL_SIGNS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(error);

  return (
    <div>
      <Link to="/addVitalSign" className="btn btn-primary mb-3" style={{backgroundColor:"green", color:"#ffffff"}} >
        Add Vital Sign
      </Link>
      <h2 style={{color:"white"}}>Vital Signs</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Temperature</th>
            <th>Blood Pressure</th>
            <th>Heart Rate</th>
            <th>Respiratory Rate</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.vitalSigns &&
            data.vitalSigns.map((vitalSign) => (
              <tr key={vitalSign.id}>
                <td>{vitalSign.temperature}</td>
                <td>{vitalSign.bloodPressure}</td>
                <td>{vitalSign.heartRate}</td>
                <td>{vitalSign.respiratoryRate}</td>
                <td>
                  <Link
                    to={`/edit/${vitalSign.id}`}
                    className="btn btn-success"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default VitalSign;
