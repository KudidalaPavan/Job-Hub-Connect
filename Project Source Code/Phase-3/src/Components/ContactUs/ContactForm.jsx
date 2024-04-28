// ContactForm.js

import React, { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
        // You can add your form submission logic here
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
                <label htmlFor="name" className="mt-1 block mx-auto sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    //className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    //className="mt-1 block sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    className="mt-1 block mx-auto sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="mt-1 block mx-auto sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    //className="mt-1 block sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    className="mt-1 block mx-auto sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="message" className="mt-1 block mx-auto sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    //className="mt-1 block sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    className="mt-1 block mx-auto sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    rows="4"
                ></textarea>
            </div>
            <div className="text-center">
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default ContactForm;
