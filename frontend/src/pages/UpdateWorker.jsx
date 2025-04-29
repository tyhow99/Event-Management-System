import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./AddWorker.css";

const UpdateWorker = () => {
  const { worker_id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    dob: "",
    job: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchWorkerData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/employee_information/${worker_id}`
        );
        const workerData = response.data;
        console.log("Worker ID from Parameters: ", worker_id);
        const formattedDob = workerData.dob ? workerData.dob.split("T")[0] : "";

        setFormData({
          full_name: workerData.full_name || "",
          phone_number: workerData.phone_number || "",
          email: workerData.email || "",
          dob: formattedDob,
          job: workerData.job || "",
        });
      } catch (error) {
        console.error("Error fetching worker data:", error);
        setErrorMessage("Failed to load worker data.");
      }
    };

    fetchWorkerData();
  }, [worker_id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5001/employee_information/${worker_id}`,
        formData
      );
      setSuccessMessage("Worker updated successfully!");
      setErrorMessage("");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/WorkerInformation");
      }, 2000);
    } catch (error) {
      console.error("Error updating worker:", error);
      setErrorMessage("Failed to update worker. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="container">
      <h1 className="update-worker-header">Update Worker Information</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="form-container">
        <form onSubmit={handleSubmit} className="worker-form">
          <div className="form-row">
            <label htmlFor="full_name">Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label htmlFor="phone_number">Phone Number</label>
            <input
              type="text"
              placeholder="Phone Number"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <input
            type="date"
            placeholder="Date Of Birth"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Position"
            id="job"
            name="job"
            value={formData.job}
            onChange={handleChange}
          />
          <div className="form-actions">
            <button type="submit">Update</button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/WorkerInformation")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateWorker;
