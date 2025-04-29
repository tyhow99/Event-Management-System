import { useState } from 'react';
import axios from 'axios';
import './AddVendorInformation.css';

const AddVendorInformation = () => {
    const [formData, setFormData] = useState({
        vendor_name: '',
        vendor_type: '',
        sections: '',
        manager_id: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // New error message state

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/vendor_information', formData);
            console.log("Vendor added:", response.data);
            setSuccessMessage("Vendor added successfully!");
            setErrorMessage(''); // Clear any previous errors
            setTimeout(() => setSuccessMessage(''), 3000); // Hide success message after 3 seconds

            //Reset after sucessful submit 
            setFormData({
                vendor_name: '',
                vendor_type: '',
                sections: '',
                manager_id: '',
            });
        } catch (error) {
            console.error("There was an error adding the vendor:", error);
            setErrorMessage("Failed to add vendor. Please try again.");
            setSuccessMessage(''); // Clear any success message
        }
    };

    return (
        <div className="container">
            <h1>Add New Vendor</h1>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
            <div className="form-container">
                <form onSubmit={handleSubmit} className="vendor-form">
                    <input
                        type="text"
                        placeholder="Vendor Name"
                        id="vendor_name"
                        name="vendor_name"
                        value={formData.vendor_name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Vendor Type"
                        id="vendor_type"
                        name="vendor_type"
                        value={formData.vendor_type}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Sections"
                        id="sections"
                        name="sections"
                        value={formData.sections}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Manager ID"
                        id="manager_id"
                        name="manager_id"
                        value={formData.manager_id}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
};

export default AddVendorInformation;