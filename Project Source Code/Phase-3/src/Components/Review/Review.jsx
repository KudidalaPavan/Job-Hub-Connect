import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Assuming you're using react-toastify for toast notifications
import 'react-toastify/dist/ReactToastify.css';

const Review = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [appliedJob, setAppliedJob] = useState(null);
  const [resume, setResume] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [missingFields, setMissingFields] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        const response = await axios.get(`http://127.0.0.1:8000/api/getUserData?email=${userEmail}&job_id=${id}`);
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchAppliedJob = () => {
      const userEmail = localStorage.getItem('userEmail');
      const storedJobs = JSON.parse(localStorage.getItem(`jobs_${userEmail}`)) || [];
      const job = storedJobs.find((job) => job.id == id);
      setAppliedJob(job);
      console.log(job);
    };

    const fetchResume = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        const response = await axios.get(`http://127.0.0.1:8000/api/getResume?email=${userEmail}`);
        setResume(response.data.resume_url);
      } catch (error) {
        console.error('Error fetching resume:', error);
      }
    };

    fetchUserData();
    fetchAppliedJob();
    fetchResume();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    console.log("Uday " + id);
    try {
      // Check if all displayed fields are filled
      const displayedFields = ['name', 'email', 'phone', 'gender', 'skills'];
      if (userData.hasExperience) {
        displayedFields.push('jobTitle', 'jobDescription', 'previousCompanyName', 'previousCTC', 'expectingCTC');
      } else {
        displayedFields.push('degree', 'college', 'projectTitle', 'projectDescription');
      }
  
      const missingFields = displayedFields.filter(
        (field) => !userData[field] || userData[field].trim() === ''
      );
  
      if (missingFields.length > 0) {
        setMissingFields(missingFields);
        toast.error('Please fill in all the displayed fields.');
        return;
      }
  
      console.log('userData before update:', userData);
      await axios.put(`http://127.0.0.1:8000/api/updateApplication/${id}`, userData);
  
      // Update the application data in local storage
      const userEmail = localStorage.getItem('userEmail');
      const storedJobs = JSON.parse(localStorage.getItem(`jobs_${userEmail}`)) || [];
      const updatedJobs = storedJobs.map((job) => (job.id === id ? { ...job, ...userData } : job));
      localStorage.setItem(`jobs_${userEmail}`, JSON.stringify(updatedJobs));
  
      setIsEditing(false);
      setMissingFields([]);
      toast.success("Application Successfully Updated.");
    } catch (error) {
      console.error('Error updating application:', error);
      toast.error("Failed to update application.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const displayedFields = ['name', 'email', 'phone', 'gender', 'skills'];
  
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    // Check if any displayed field is missing
    const missingFields = displayedFields.filter(
      (field) => !userData[field] || userData[field].trim() === ''
    );
  
    // Additional validation checks
    if (name === 'email' && !validateEmail(value)) {
      missingFields.push('email');
    }
    if (name === 'phone' && !validatePhone(value)) {
      missingFields.push('phone');
    }
  
    if (userData.hasExperience) {
      displayedFields.push('jobTitle', 'jobDescription', 'previousCompanyName', 'previousCTC', 'expectingCTC');
    } else {
      displayedFields.push('degree', 'college', 'projectTitle', 'projectDescription');
    }
  
    // Check if any displayed field is missing
    const allMissingFields = displayedFields.filter(
      (field) => !userData[field] || userData[field].trim() === ''
    );
    setMissingFields(allMissingFields);
    console.log('missingFields:', allMissingFields);
  };
  
  
  function validateEmail(email) {
    // Add your email validation logic here
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
  
  function validatePhone(phone) {
    // Add your phone number validation logic here
    return /^\d{10}$/.test(phone);
  }

  const downloadResume = (resumeUrl) => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = resumeUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!userData || !appliedJob) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-bold text-indigo-800">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-4xl font-bold mb-8 text-indigo-800">Review Details</h2>

        {/* Personal Details */}
        <div className="mb-8">
          <h3 className="text-3xl font-bold mb-6 text-indigo-800">Personal Details</h3>
          {isEditing && (
            <div className="mb-4">
              {missingFields.length > 0 && (
                <p className="text-red-500 font-semibold">
                  Please fill in the following fields: {missingFields.join(', ')}
                </p>
              )}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isEditing ? (
              <>
                {/* Existing fields */}
                {userData.hasExperience ? (
                  <>
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                        Name:
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                        Email:
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                        Phone:
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="gender" className="block text-gray-700 font-semibold mb-2">
                        Gender:
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={userData.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="jobTitle" className="block text-gray-700 font-semibold mb-2">
                        Job Title:
                      </label>
                      <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        value={userData.jobTitle}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="jobDescription" className="block text-gray-700 font-semibold mb-2">
                        Job Description:
                      </label>
                      <textarea
                        id="jobDescription"
                        name="jobDescription"
                        value={userData.jobDescription}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="previousCompanyName" className="block text-gray-700 font-semibold mb-2">
                        Previous Company:
                      </label>
                      <input
                        type="text"
                        id="previousCompanyName"
                        name="previousCompanyName"
                        value={userData.previousCompanyName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="previousCTC" className="block text-gray-700 font-semibold mb-2">
                        Previous CTC:
                      </label>
                      <input
                        type="text"
                        id="previousCTC"
                        name="previousCTC"
                        value={userData.previousCTC}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="expectingCTC" className="block text-gray-700 font-semibold mb-2">
                        Expecting CTC:
                      </label>
                      <input
                        type="text"
                        id="expectingCTC"
                        name="expectingCTC"
                        value={userData.expectingCTC}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="skills" className="block text-gray-700 font-semibold mb-2">
                        Skills:
                      </label>
                      <input
                        type="text"
                        id="skills"
                        name="skills"
                        value={userData.skills}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                        Name:
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                        Email:
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                        Phone:
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="gender" className="block text-gray-700 font-semibold mb-2">
                        Gender:
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={userData.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="degree" className="block text-gray-700 font-semibold mb-2">
                        Degree:
                      </label>
                      <input
                        type="text"
                        id="degree"
                        name="degree"
                        value={userData.degree}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="college" className="block text-gray-700 font-semibold mb-2">
                        College:
                      </label>
                      <input
                        type="text"
                        id="college"
                        name="college"
                        value={userData.college}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="projectTitle" className="block text-gray-700 font-semibold mb-2">
                        Project Title:
                      </label>
                      <input
                        type="text"
                        id="projectTitle"
                        name="projectTitle"
                        value={userData.projectTitle}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="projectDescription" className="block text-gray-700 font-semibold mb-2">
                        Project Description:
                      </label>
                      <textarea
                        id="projectDescription"
                        name="projectDescription"
                        value={userData.projectDescription}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="skills" className="block text-gray-700 font-semibold mb-2">
                        Skills:
                      </label>
                      <input
                        type="text"
                        id="skills"
                        name="skills"
                        value={userData.skills}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                {userData.hasExperience ? (
                  <div>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold text-indigo-800">Name:</span> {userData.name}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold text-indigo-800">Email:</span> {userData.email}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold text-indigo-800">Phone:</span> {userData.phone}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold text-indigo-800">Gender:</span> {userData.gender}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold text-indigo-800">Job Title:</span> {userData.jobTitle}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold text-indigo-800">Job Description:</span> {userData.jobDescription}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold text-indigo-800">Previous Company:</span> {userData.previousCompanyName}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold text-indigo-800">Previous CTC:</span> {userData.previousCTC}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold text-indigo-800">Expecting CTC:</span> {userData.expectingCTC}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold text-indigo-800">Skills:</span> {userData.skills}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold text-indigo-800">Name:</span> {userData.name}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold text-indigo-800">Email:</span> {userData.email}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold text-indigo-800">Phone:</span> {userData.phone}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold text-indigo-800">Gender:</span> {userData.gender}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold text-indigo-800">Degree:</span> {userData.degree}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold text-indigo-800">College:</span> {userData.college}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold text-indigo-800">Project Title:</span> {userData.projectTitle}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold text-indigo-800">Project Description:</span> {userData.projectDescription}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold text-indigo-800">Skills:</span> {userData.skills}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Applied Job Details */}
        <div className="mb-8">
          <h3 className="text-3xl font-bold mb-6 text-indigo-800">Applied Job Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold text-indigo-800">Job Title:</span> {appliedJob.job_title}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold text-indigo-800">Company:</span> {appliedJob.company_name}
              </p>
            </div>
            <div>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold text-indigo-800">Location:</span> {appliedJob.location}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold text-indigo-800">Salary:</span> {appliedJob.salary}
              </p>
            </div>
         </div>

       {/* Resume */}
       {resume && (
          <div className="mb-8">
            <h3 className="text-3xl font-bold mb-6 text-indigo-800">Resume</h3>
            <div className="mb-4">
              <span className="font-semibold text-indigo-800">Resume Name:</span>{' '}
              <span
                onClick={() => downloadResume(resume)}
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
              >
                {resume.split('?')[0].split('/').pop()}
              </span>
            </div>
            {/* <div className="rounded-lg">
              <Document file={resume}>
                <Page pageNumber={1} renderTextLayer={false} />
              </Document>
            </div> */}
          </div>
        )}

       {/* Edit and Withdraw Buttons */}
       <div className="mt-8 flex justify-end">
         {isEditing ? (
           <>
             <button
               className="px-6 py-3 bg-indigo-800 text-white rounded-lg mr-4 flex items-center"
               onClick={handleSave}
               disabled={missingFields.length > 0}
             >
               Save
             </button>
             <button
               className="px-6 py-3 bg-gray-500 text-white rounded-lg flex items-center"
               onClick={() => setIsEditing(false)}
             >
               Cancel
             </button>
           </>
         ) : (
           <>
             <button
               className="px-6 py-3 bg-indigo-800 text-white rounded-lg mr-4 flex items-center"
               onClick={handleEdit}
             >
               <FaEdit className="mr-2" />
               Edit
             </button>
           </>
         )}
       </div>
     </div>
	 <ToastContainer />
   </div>
   </div>
 );
};

export default Review;