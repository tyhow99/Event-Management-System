import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./AddWorker.css"; // You might want to create a separate CSS file for vendors

const UpdateVendor = () => {
  const { vendor_id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vendor_name: "",
    vendor_type: "",
    sections: "",
    manager_id: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/vendor_information/${vendor_id}`
        );
        const vendorData = response.data;

        setFormData({
          vendor_name: vendorData.vendor_name || "",
          vendor_type: vendorData.vendor_type || "",
          sections: vendorData.sections || "",
          manager_id: vendorData.manager_id || "", // Ensuring manager_id is initialized properly
        });
      } catch (error) {
        console.error("Error fetching vendor data:", error);
        setErrorMessage("Failed to load vendor data.");
      }
    };

    fetchVendorData();
  }, [vendor_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate manager_id to allow only numbers
    if (name === "manager_id" && isNaN(value)) {
      setErrorMessage("Manager ID must be a number.");
      return;
    }

    setFormData({ ...formData, [name]: value });
    setErrorMessage(""); // Clear any errors on valid input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure manager_id is a valid number before sending request
    if (isNaN(parseInt(formData.manager_id, 10))) {
      setErrorMessage("Manager ID must be a valid number.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5001/vendor_information/${vendor_id}`,
        { ...formData, manager_id: parseInt(formData.manager_id, 10) } // Convert manager_id before sending
      );
      setSuccessMessage("Vendor updated successfully!");
      setErrorMessage("");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/VendorInformation");
      }, 2000);
    } catch (error) {
      console.error("Error updating vendor:", error);
      setErrorMessage("Failed to update vendor. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="container">
      <h1 className="update-worker-header">Update Vendor Information</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="form-container">
        <form onSubmit={handleSubmit} className="worker-form">
          <input
            type="text"
            placeholder="Vendor Name"
            id="vendor_name"
            name="vendor_name"
            value={formData.vendor_name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Vendor Type"
            id="vendor_type"
            name="vendor_type"
            value={formData.vendor_type}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Sections"
            id="sections"
            name="sections"
            value={formData.sections}
            onChange={handleChange}
          />
          <input
            type="number" // Restricting input type to numbers
            placeholder="Manager ID"
            id="manager_id"
            name="manager_id"
            value={formData.manager_id}
            onChange={handleChange}
          />
          <div className="form-actions">
            <button type="submit">Update</button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/VendorInformation")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateVendor;