import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const AdditionalDetails = () => {
    const { id } = useParams();
    const details = JSON.parse(decodeURIComponent(id));
    const item = details;
    console.log(item.id+'Uday');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        degree: '',
        college: '',
        projectTitle: '',
        projectDescription: '',
        skills: '',
        gender: '',
        hasExperience: false,
        previousCompanyName: '',
        previousCTC: '',
        expectingCTC: ''
    });
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
        setFormErrors({ ...formErrors, [e.target.name]: '' });
    };

    const handleSubmit = async  (e) => {
        console.log("form submitted");
        e.preventDefault();
        const errors = {};
        // Check if user has already applied
        // try {
        //     const response = await axios.post('http://localhost:5000/checkApplied', { companyId: item.id });
        //     if (response.data.applied) {
        //         toast.error('Already applied');
        //         return;
        //     }
        // } catch (error) {
        //     console.error('Error checking applied status:', error);
        //     toast.error('Failed to check applied status. Please try again later.');
        //     return;
        // }
    

        try {
            const response = await axios.post('http://localhost:5000/insertData', formData);
            console.log(response.data);
            if (response.data.success) {
                toast.success('Successfully applied');
            } else {
                toast.error(response.data.message || 'Failed to apply');
            }
          } catch (error) {
            console.error('Error inserting data:', error);
            toast.error('Failed to insert data. Please try again later.');
          }
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = 'Invalid email format';
        }
        if (!formData.phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            errors.phone = 'Invalid phone number format';
        }
        if (!formData.degree.trim()) {
            errors.degree = 'Degree is required';
        }
        if (!formData.college.trim()) {
            errors.college = 'College name is required';
        }
        if (!formData.projectTitle.trim()) {
            errors.projectTitle = 'Project title is required';
        }
        if (!formData.projectDescription.trim()) {
            errors.projectDescription = 'Project description is required';
        }
        if (!formData.skills.trim()) {
            errors.skills = 'Skills are required';
        }
        if (!formData.gender.trim()) {
            errors.gender = 'Gender is required';
        }

        // Validate experience-related fields
        if (formData.hasExperience) {
            if (!formData.previousCompanyName.trim()) {
                errors.previousCompanyName = 'Previous company name is required';
            }
            if (!formData.previousCTC.trim()) {
                errors.previousCTC = 'Previous CTC is required';
            }
            if (!formData.expectingCTC.trim()) {
                errors.expectingCTC = 'Expecting CTC is required';
            }
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        // Handle form submission here
        console.log(formData);
        localStorage.setItem("additionalDetails", JSON.stringify(formData));

        let newJob = {};
        let prevJob = JSON.parse(localStorage.getItem('jobs'));

        let searchedJob = prevJob?.find((data) => data.id == item.id);
        if (!searchedJob) {
            if (!prevJob) {
                newJob = [item];
                localStorage.setItem("jobs", JSON.stringify(newJob));
                toast.success('Successfully applied');
            } else {
                newJob = [...prevJob, item];
                localStorage.setItem("jobs", JSON.stringify(newJob));
                toast.success('Successfully applied');
            }
        } else {
            toast.error('Already applied');
        }

        // Clear form fields
        setFormData({
            name: '',
            email: '',
            phone: '',
            degree: '',
            college: '',
            projectTitle: '',
            projectDescription: '',
            skills: '',
            gender: '',
            hasExperience: false,
            previousCompanyName: '',
            previousCTC: '',
            expectingCTC: ''
        });

        // Redirect to home page after submission
        setTimeout(() => {
            window.location.href = '/homePage';
        }, 1000);
    };

    return (
        <div className="text-center my-6">
            <h1 className="text-5xl custom-text p-4"> Enter Additional Details Before Submitting</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <input
                        type="checkbox"
                        name="hasExperience"
                        checked={formData.hasExperience}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label htmlFor="hasExperience" className="text-gray-700">Do you have work experience?</label>
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className={`border border-gray-300 rounded-md px-3 py-2 w-full ${formErrors.name ? 'border-red-500' : ''}`}
                    />
                    {formErrors.name && <p className="text-red-500 mt-1">{formErrors.name}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className={`border border-gray-300 rounded-md px-3 py-2 w-full ${formErrors.email ? 'border-red-500' : ''}`}
                    />
                    {formErrors.email && <p className="text-red-500 mt-1">{formErrors.email}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        className={`border border-gray-300 rounded-md px-3 py-2 w-full ${formErrors.phone ? 'border-red-500' : ''}`}
                    />
                    {formErrors.phone && <p className="text-red-500 mt-1">{formErrors.phone}</p>}
                </div>
                {formData.hasExperience ? (
                    <>
                        {/* Experience-related fields */}
                        <div className="mb-4">
                            <label htmlFor="previousCompanyName" className="block text-gray-700">Previous Company Name</label>
                            <input
                                type="text"
                                name="previousCompanyName"
                                value={formData.previousCompanyName}
                                onChange={handleChange}
                                placeholder="Previous Company Name"
                                className={`border border-gray-300 rounded-md px-3 py-2 w-full ${formErrors.previousCompanyName ? 'border-red-500' : ''}`}
                            />
                            {formErrors.previousCompanyName && <p className="text-red-500 mt-1">{formErrors.previousCompanyName}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="previousCTC" className="block text-gray-700">Previous CTC</label>
                            <input
                                type="number"
                                name="previousCTC"
                                value={formData.previousCTC}
                                onChange={handleChange}
                                placeholder="Previous CTC"
                                className={`border border-gray-300 rounded-md px-3 py-2 w-full ${formErrors.previousCTC ? 'border-red-500' : ''}`}
                            />
                            {formErrors.previousCTC && <p className="text-red-500 mt-1">{formErrors.previousCTC}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="expectingCTC" className="block text-gray-700">Expecting CTC</label>
                            <input
                                type="number"
                                name="expectingCTC"
                                value={formData.expectingCTC}
                                onChange={handleChange}
                                placeholder="Expecting CTC"
                                className={`border border-gray-300 rounded-md px-3 py-2 w-full ${formErrors.expectingCTC ? 'border-red-500' : ''}`}
                            />
                            {formErrors.expectingCTC && <p className="text-red-500 mt-1">{formErrors.expectingCTC}</p>}
                        </div>
                    </>
                ) : (
                    <>
                        {/* Fresher-related fields */}
                        <div className="mb-4">
                            <label htmlFor="degree" className="block text-gray-700">Degree</label>
                            <input
                                type="text"
                                name="degree"
                                value={formData.degree}
                                onChange={handleChange}
                                placeholder="Degree"
                                className={`border border-gray-300 rounded-md px-3 py-2 w-full ${formErrors.degree ? 'border-red-500' : ''}`}
                            />
                            {formErrors.degree && <p className="text-red-500 mt-1">{formErrors.degree}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="college" className="block text-gray-700">College Name</label>
                            <input
                                type="text"
                                name="college"
                                value={formData.college}
                                onChange={handleChange}
                                placeholder="College Name"
                                className={`border border-gray-300 rounded-md px-3 py-2 w-full ${formErrors.college ? 'border-red-500' : ''}`}
                            />
                            {formErrors.college && <p className="text-red-500 mt-1">{formErrors.college}</p>}
                        </div>
                    </>
                )}
                <div className="mb-4">
                    <label htmlFor="projectTitle" className="block text-gray-700">Project Title</label>
                    <input
                        type="text"
                        name="projectTitle"
                        value={formData.projectTitle}
                        onChange={handleChange}
                        placeholder="Project Title"
                        className={`border border-gray-300 rounded-md px-3 py-2 w-full ${formErrors.projectTitle ? 'border-red-500' : ''}`}
                    />
                    {formErrors.projectTitle && <p className="text-red-500 mt-1">{formErrors.projectTitle}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="projectDescription" className="block text-gray-700">Project Description</label>
                    <textarea
                        name="projectDescription"
                        value={formData.projectDescription}
                        onChange={handleChange}
                        placeholder="Project Description"
                        className={`border border-gray-300 rounded-md px-3 py-2 w-full ${formErrors.projectDescription ? 'border-red-500' : ''}`}
                    ></textarea>
                    {formErrors.projectDescription && <p className="text-red-500 mt-1">{formErrors.projectDescription}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="skills" className="block text-gray-700">Skills</label>
                    <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        placeholder="Skills"
                        className={`border border-gray-300 rounded-md px-3 py-2 w-full ${formErrors.skills ? 'border-red-500' : ''}`}
                    />
                    {formErrors.skills && <p className="text-red-500 mt-1">{formErrors.skills}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="gender" className="block text-gray-700">Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={`border border-gray-300 rounded-md px-3 py-2 w-full ${formErrors.gender ? 'border-red-500' : ''}`}
                    >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {formErrors.gender && <p className="text-red-500 mt-1">{formErrors.gender}</p>}
                </div>
                <button type="submit" className="custom-btn mt-2">
                    Submit
                </button>
            </form>
            <Toaster />
        </div>
    );
};

export default AdditionalDetails;
