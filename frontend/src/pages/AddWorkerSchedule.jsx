import { useEffect, useState } from 'react';
import axios from 'axios';
import './AddWorkerSchedule.css';

const AddWorkerSchedule = () => {
    const [formData, setFormData] = useState({
        vendor_id: '',
        event_id: '',
        pay_rate: '',
        start_time: '',
        end_time: '',
        section: '',
        schedule_date: '',
        worker_id: '',
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/worker_schedule', formData);
            console.log("Schedule added:", response.data);
    
            //Reset after sucessful submit
            setFormData({
                vendor_id: '',
                event_id: '',
                pay_rate: '',
                start_time: '',
                end_time: '',
                section: '',
                schedule_date: '',
                worker_id: '',
            });
        } catch (error) {
            console.error("There was an error adding the worker schedule:", error);
        }
    };

    return (
        <div className="container">
            <h1>Add New Worker Schedule</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit} className="worker-schedule-form">
                    <input
                    type="number"
                    placeholder="Vendor ID"
                    id="vendor_id"
                    name="vendor_id"
                    value={formData.vendor_id}
                    onChange={handleChange}
                    required
                    />

                    <input
                    type="number"
                    placeholder="Event ID"
                    id="event_id"
                    name="event_id"
                    value={formData.event_id}
                    onChange={handleChange}
                    required
                    />

                    <input
                    type="number"
                    placeholder="Pay Rate"
                    id="pay_rate"
                    name="pay_rate"
                    value={formData.pay_rate}
                    onChange={handleChange}
                    required
                    />

                    <input
                    type="text"
                    placeholder="Start Time"
                    id="start_time"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleChange}
                    required
                    />

                    <input
                    type="text"
                    placeholder="End Time"
                    id="end_time"
                    name="end_time"
                    value={formData.end_time}
                    onChange={handleChange}
                    required
                    />

                    <input
                    type="text"
                    placeholder="Section"
                    id="section"
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    required
                    />

                    <input
                    type="text"
                    placeholder="Date"
                    id="schedule_date"
                    name="schedule_date"
                    value={formData.schedule_date}
                    onChange={handleChange}
                    required
                    />

                    <input
                    type="number"
                    placeholder="Worker ID"
                    id="worker_id"
                    name="worker_id"
                    value={formData.worker_id}
                    onChange={handleChange}
                    required
                    />

                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
};

export default AddWorkerSchedule;