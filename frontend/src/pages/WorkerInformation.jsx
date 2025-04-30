import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./WorkerInformation.css";

const WorkerInformation = () => {
  const [workers, setWorkers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 6;

  const getWorkerInformation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/employee_information"
      );
      setWorkers(response.data);
    } catch (error) {
      console.error("Error fetching worker information:", error);
    }
  };

  useEffect(() => {
    getWorkerInformation();
  }, []);

  const filteredWorkers = workers.filter((worker) =>
    Object.values(worker).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDelete = async (workerId) => {
    if (window.confirm("Are you sure you want to delete this worker?")) {
      try {
        await axios.delete(`http://localhost:5001/employee_information/${workerId}`);
        // Refresh the worker list after deletion
        getWorkerInformation();
      } catch (error) {
        console.error("Error deleting worker:", error);
      }
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWorkers = filteredWorkers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredWorkers.length / itemsPerPage);

  return (
    <div className="container">
      <h2>Worker Information</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="table-container">
        <table className="worker-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Position</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentWorkers.map((worker) => (
              <tr key={worker.worker_id}>
                <td>{worker.worker_id}</td>
                <td>{worker.full_name}</td>
                <td>{worker.phone_number || "N/A"}</td>
                <td>{worker.email}</td>
                <td>{new Date(worker.dob).toLocaleDateString()}</td>
                <td>{worker.job}</td>
                <td>
                  <Link
                    to={`/UpdateWorker/${worker.worker_id}`}
                    className="update-worker-btn"
                  >
                    Update
                  </Link>
                </td>
                <td>
                  <button
                    className="delete-worker-btn"
                    onClick={() => handleDelete(worker.worker_id)}
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
      <Link to="/AddWorker" className="btn add-worker-btn">
        Add Worker
      </Link>
    </div>
  );
};

export default WorkerInformation;
