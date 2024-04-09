import React, { useEffect, useState } from 'react';
import SingleJobs from '../SingleJobs/SingleJobs';

const JobSection = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [seeAll, setAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('/company.json')
            .then((res) => res.json())
            .then((data) => {
                setJobs(data);
                setFilteredJobs(data);
            });
    }, []);

    const handleSearch = () => {
        const filtered = jobs.filter((job) => {
            // Convert salary string to numbers
            const salaryRange = job.salary.split('-').map(s => parseInt(s.replace(/\D/g, ''), 10));
    
            // Check if the entered salary falls within the salary range
            const enteredSalary = parseInt(searchTerm.replace(/\D/g, ''), 10);
            return (
                job.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (salaryRange.length === 2 && enteredSalary >= salaryRange[0] && enteredSalary <= salaryRange[1])
            );
        });
        console.log(filtered);
        setFilteredJobs(filtered);
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className='text-center my-6'>
            <h1 className='text-5xl custom-text p-4'>All Jobs</h1>
            <p className='text-lg my-4'>Explore thousands of job opportunities with all the information you need. Its your future</p>
            <div className='mb-4'>
                <input
                    type='text'
                    placeholder='Search jobs...'
                    value={searchTerm}
                    onChange={handleInputChange}
                    className='border border-gray-300 rounded-md px-3 py-2 w-full max-w-md mx-auto'
                />
                <button onMouseDown={handleSearch}  className='custom-btn mt-2' data-testid="search-button">Search</button>
            </div>
            <div className='grid md:grid-cols-2 gap-4 md:w-3/4 mx-auto'>
                {/* filtered job cards */}
                {filteredJobs.map((job) => (
                    <SingleJobs key={job.id} job={job}></SingleJobs>
                ))}
            </div>
            {/* {
                seeAll ?
                // seeAll === true ?
                    <button onClick={() => setAll(!seeAll)} className='custom-btn mt-6'>Show Less</button>
                    : <button onClick={() => setAll(!seeAll)} className='custom-btn mt-6'>Show All</button>
            } */}
        </div>
    );
};

export default JobSection;
