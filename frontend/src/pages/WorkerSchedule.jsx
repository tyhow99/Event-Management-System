import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './WorkerSchedule.css';

const WorkerSchedule = () => {
  const [schedules, setSchedule] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const getWorkerInformation = async () => {
    try {
      const response = await axios.get('http://localhost:5001/worker_schedule');
      setSchedule(response.data);
    } catch (error) {
      console.error('Error fetching worker information:', error);
    }
  };

  useEffect(() => {
    getWorkerInformation();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSchedules = schedules.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(schedules.length / itemsPerPage);

  return (
    <div className="container">
      <h2>Worker Schedule Information</h2>
      <div className="table-container">
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Worker ID</th>
              <th>Vendor ID</th>
              <th>Event ID</th>
              <th>Pay Rate</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Section</th>
            </tr>
          </thead>
          <tbody>
            {currentSchedules.map((schedule) => (
              <tr key={schedule.worker_id}>
                <td>{schedule.worker_id}</td>
                <td>{schedule.vendor_id}</td>
                <td>{schedule.event_id}</td>
                <td>{schedule.pay_rate}</td>
                <td>{schedule.worker_start}</td>
                <td>{schedule.worker_end}</td>
                <td>{schedule.section}</td>
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
      <Link to="/AddWorkerSchedule" className="btn add-worker-btn">Add Worker Schedule</Link>
    </div>
  );
};

export default WorkerSchedule;