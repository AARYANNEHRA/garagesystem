import React, { useState, useEffect } from "react";

function Page() {
  const [cars, setCars] = useState([]);
  const [newCarNo, setNewCarNo] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [deleteCarNo, setDeleteCarNo] = useState("");
  const [updateCarNo, setUpdateCarNo] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");

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
  };
  return (
    <div>
      <h1>Car Details</h1>

      <h2>Add Car</h2>
      <div>
        <label>Car No:</label>
        <input
          type="text"
          value={newCarNo}
          onChange={(e) => setNewCarNo(e.target.value)}
        />
      </div>
      <div>
        <label>Status:</label>
        <input
          type="text"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        />
      </div>
      <button onClick={handleAddCar}>Add Car</button>

      <h2>Delete Car</h2>
      <div>
        <label>Car No:</label>
        <input
          type="text"
          value={deleteCarNo}
          onChange={(e) => setDeleteCarNo(e.target.value)}
        />
      </div>
      <button onClick={handleDeleteCar}>Delete Car</button>

      <h2>Update Status</h2>
      <div>
        <label>Car No:</label>
        <input
          type="text"
          value={updateCarNo}
          onChange={(e) => setUpdateCarNo(e.target.value)}
        />
      </div>
      <div>
        <label>Status:</label>
        <input
          type="text"
          value={updateStatus}
          onChange={(e) => setUpdateStatus(e.target.value)}
        />
      </div>
      <button onClick={handleUpdateStatus}>Update Status</button>
    </div>
  );
}

export default Page;
