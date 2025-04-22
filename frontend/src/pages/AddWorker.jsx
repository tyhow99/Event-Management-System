import { useEffect, useState } from 'react';
import axios from 'axios';
import './AddWorker.css';

const AddWorker = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        phone_number: '',
        email: '',
        dob: '',
        job: '',
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/employee_information', formData);
            console.log("Worker added:", response.data);
    
            //Reset after sucessful submit
            setFormData({
                full_name: '',
                phone_number: '',
                email: '',
                dob: '',
                job: '',
            });
        } catch (error) {
            console.error("There was an error adding the worker:", error);
        }
    };

    return (
        <div className="container">
            <h1>Add New Worker</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit} className="worker-form">
                    <input
                    type="text"
                    placeholder="Full Name"
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    />

                    <input
                    type="text"
                    placeholder="Phone Number"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                    />

                    <input
                    type="text"
                    placeholder="Email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    />

                    <input
                    type="text"
                    placeholder="Date Of Birth"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    />

                    <input
                    type="text"
                    placeholder="Position"
                    id="job"
                    name="job"
                    value={formData.job}
                    onChange={handleChange}
                    required
                    />

                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
};

export default AddWorker;