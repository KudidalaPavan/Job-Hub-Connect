import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const UploadResume = () => {
    const { id } = useParams();
    const details = JSON.parse(decodeURIComponent(id));
    const objectString = encodeURIComponent(JSON.stringify(details));
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            toast.error('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        const userEmail = localStorage.getItem("userEmail");

        if (!userEmail) {
            toast.error('User email not found in local storage');
            return;
        }

        formData.append('email', userEmail);
        formData.append('file', file);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            toast.success(data.message);
            setTimeout(() => {
                navigate(`/additionalDetails/${objectString}`);
            }, 2500);
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('An error occurred while uploading the file');
        }
    };

    return (
        <div className="text-center my-6">
            <h1 className="text-5xl custom-text p-4">Upload Resume</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4"
                />
                <button type="submit" className='custom-btn mt-4 w-full'>
                    Upload
                </button>
            </form>
            <Toaster />
        </div>
    );
};

export default UploadResume;