import React, { useState, useEffect } from "react";
import "./Page.css";
function Page() {
  const [cars, setCars] = useState([]);
  const [newCarNo, setNewCarNo] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [deleteCarNo, setDeleteCarNo] = useState("");
  const [updateCarNo, setUpdateCarNo] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);
  useEffect(() => {
    fetchCarDetails();
  }, []);

  const fetchCarDetails = async () => {
    try {
      const response = await fetch("http://localhost:9000/getcardetails");
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Error fetching car details:", error);
    }
  };

  const handleAddCar = async () => {
    try {
      await fetch(
        `http://localhost:9000/postcardetails/${newCarNo}/${newStatus}`,
        {
          method: "POST",
        }
      );
      fetchCarDetails();

    } catch (error) {
      console.error("Error adding car:", error);
    }
    setNewCarNo("")
    setNewStatus("")
  };

  const handleDeleteCar = async () => {
    try {
      await fetch(`http://localhost:9000/deletecardetails/${deleteCarNo}`, {
        method: "DELETE",
      });
      fetchCarDetails();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
    setDeleteCarNo("")
  };

  const handleUpdateStatus = async () => {
    try {
      await fetch(
        `http://localhost:9000/updatestatus/${updateCarNo}/${updateStatus}`,
        {
          method: "PUT",
        }
      );
      fetchCarDetails();
    } catch (error) {
      console.error("Error updating status:", error);
    }
    setUpdateCarNo("")
    setUpdateStatus("")
  };
  const handleToggleDetails = (carNo) => {
    setSelectedCar(selectedCar === carNo ? null : carNo);
  };
  return (
    <div className="page">
      <h1>Car Garage</h1>

      <div className="centered-container">
        <h2 onClick={() => handleToggleDetails("addCar")}>Add Car</h2>
        <h2 onClick={() => handleToggleDetails("deleteCar")}>Delete Car</h2>
        <h2 onClick={() => handleToggleDetails("updateStatus")}>
          Update Status
        </h2>
      </div>
      <div className="form-container">
        {selectedCar === "addCar" && (
          <div>
            <label>Car No:</label>
            <input
              type="text"
              value={newCarNo}
              onChange={(e) => setNewCarNo(e.target.value)}
            />
            <br />
            <label>Status:</label>
            <input
              type="text"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            />
            <br />
            <button onClick={handleAddCar}>Add Car</button>
          </div>
        )}
      </div>
      <div className="form-container">
      {selectedCar === "deleteCar" && (
        <div>
          <label>Car No:</label>
          <input
            type="text"
            value={deleteCarNo}
            onChange={(e) => setDeleteCarNo(e.target.value)}
          />
          <br />
          <button onClick={handleDeleteCar}>Delete Car</button>
        </div>
      )}
      </div>
      <div className="form-container">
      {selectedCar === "updateStatus" && (
        <div>
          <label>Car No:</label>
          <input
            type="text"
            value={updateCarNo}
            onChange={(e) => setUpdateCarNo(e.target.value)}
          />
          <br />
          <label>Status:</label>
          <input
            type="text"
            value={updateStatus}
            onChange={(e) => setUpdateStatus(e.target.value)}
          />
          <br />
          <button onClick={handleUpdateStatus}>Update Status</button>
        </div>
      )}
      </div>
    </div>
  );
}

export default Page;
