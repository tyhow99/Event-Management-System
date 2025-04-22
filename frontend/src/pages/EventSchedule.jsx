import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./EventSchedule.css"


const EventSchedule = () =>
{
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const getEventSchedule = async () => {
        try {
            const response = await axios.get('http://localhost:5001/event_schedule');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching event schedule:', error);
        }
    }

    useEffect(() => {
        getEventSchedule();
      }, []);


      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentEvents = events.slice(indexOfFirstItem, indexOfLastItem);
      const totalPages = Math.ceil(events.length / itemsPerPage);

    return(
        <div className="container">
            <h2>Event Schedule</h2>
            <div className="table-container">
                <table className="event-table">
                    <thead>
                        <tr>
                            <th>Event ID</th>
                            <th>Event Name</th>
                            <th>Event Start</th>
                            <th>Event End</th>
                            <th>Event Date</th>
                            <th>organize</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEvents.map((event) => (
                            <tr key={event.event_id}>
                                <td>{event.event_id}</td>
                                <td>{event.event_name}</td>
                                <td>{event.event_start}</td>
                                <td>{event.event_end}</td>
                                <td>{new Date(event.event_date).toLocaleDateString()}</td>
                                <td>{event.organizer}</td>
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
    </div>
    );
};

export default EventSchedule;