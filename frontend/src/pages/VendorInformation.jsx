import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./VendorInformation.css";

const VendorInformation = () => {
  const [vendors, setVendors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 6;

  const getVendorInformation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/vendor_information"
      );
      setVendors(response.data);
    } catch (error) {
      console.error("Error fetching vendor information:", error);
    }
  };

  useEffect(() => {
    getVendorInformation();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleDelete = async (vendorId) => {
    if (window.confirm("Are you sure you want to delete this vendor?")) {
      try {
        await axios.delete(
          `http://localhost:5001/vendor_information/${vendorId}`
        );
        getVendorInformation(); // Refresh list after deletion
      } catch (error) {
        console.error("Error deleting vendor:", error);
      }
    }
  };

  const filteredVendors = vendors.filter((vendor) =>
    Object.values(vendor).some((value) => {
      let stringValue;

      if (vendor.event_date === value) {
        const date = new Date(value);
        stringValue = date.toLocaleDateString(); // Converts to "M/D/YYYY"
      } else {
        stringValue = String(value);
      }

      return stringValue.toLowerCase().includes(searchTerm.toLowerCase());
    })
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVendors = filteredVendors.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);

  return (
    <div className="container">
      <h2>Vendor Information</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="table-container">
        <table className="vendor-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Sections</th>
              <th>Manager ID</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentVendors.map((vendor) => (
              <tr key={vendor.vendor_id}>
                <td>{vendor.vendor_id}</td>
                <td>{vendor.vendor_name}</td>
                <td>{vendor.vendor_type}</td>
                <td>{vendor.sections}</td>
                <td>{vendor.manager_id}</td>
                <td>
                  <Link
                    to={`/UpdateVendor/${vendor.vendor_id}`}
                    className="update-vendor-btn"
                  >
                    Update
                  </Link>
                </td>
                <td>
                  <button
                    className="delete-vendor-btn"
                    onClick={() => handleDelete(vendor.vendor_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-controls">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <Link to="/AddVendorInformation" className="btn add-vendor-btn">
        Add Vendor
      </Link>
    </div>
  );
};

export default VendorInformation;
