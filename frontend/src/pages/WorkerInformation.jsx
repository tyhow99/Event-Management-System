import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './WorkerInformation.css';

const WorkerInformation = () => {
  const [workers, setWorkers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const getWorkerInformation = async () => {
    try {
      const response = await axios.get('http://localhost:5001/employee_information');
      setWorkers(response.data);
    } catch (error) {
      console.error('Error fetching worker information:', error);
    }
  };

  useEffect(() => {
    getWorkerInformation();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWorkers = workers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(workers.length / itemsPerPage);

  return (
    <div className="container">
      <h2>Worker Information</h2>
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
            </tr>
          </thead>
          <tbody>
            {currentWorkers.map((worker) => (
              <tr key={worker.worker_id}>
                <td>{worker.worker_id}</td>
                <td>{worker.full_name}</td>
                <td>{worker.phone_number || 'N/A'}</td>
                <td>{worker.email}</td>
                <td>{new Date(worker.dob).toLocaleDateString()}</td>
                <td>{worker.job}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-controls">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <Link to="/AddWorker" className="btn add-worker-btn">Add Worker</Link>
    </div>
  );
};

export default WorkerInformation;