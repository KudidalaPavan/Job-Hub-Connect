import React, { useState } from 'react';
import './Blog.css';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqData = [
    {
      question: 'How do I apply for a job on JobHunt?',
      answer: 'To apply for a job on JobHunt, first, create an account or log in if you already have one. Then, browse through the available job listings, and when you find a job that interests you, click on the "Apply Now" button. Follow the instructions provided to submit your application.',
    },
    {
      question: 'How can I track the status of my job applications?',
      answer: 'You can track the status of your job applications by visiting the "Applied Jobs Review Page." This page displays all the jobs you\'ve applied for along with their current status, allowing you to stay updated on the progress of each application.',
    },
    {
      question: 'Is my personal information secure on JobHunt?',
      answer: 'Yes, protecting your personal information is a top priority for us. We utilize advanced security measures to safeguard your data and ensure confidentiality throughout the job application process.',
    },
    {
      question: 'How can I contact the employer or recruiter for more information about a job?',
      answer: 'If you have questions about a specific job listing, you can typically find contact information for the employer or recruiter within the job description. Feel free to reach out to them directly via email or phone for further clarification or inquiries.',
    },
    {
      question: 'I\'m experiencing technical difficulties with the website. What should I do?',
      answer: 'If you encounter any technical issues while using the website, please reach out to our customer support team for assistance. You can contact us via email or through the support portal, and we\'ll be happy to help resolve any issues you\'re experiencing.',
    },
    {
      question: 'Can I edit my job application after submission?',
      answer: 'Yes, you can edit your job application after submission. Simply navigate to the "Applied Jobs Review Page," find the relevant application, and select the option to edit as needed.',
    },
    {
      question: 'I\'m having trouble finding jobs in my area of expertise. What should I do?',
      answer: 'If you\'re having trouble finding suitable job listings, try adjusting your search criteria or expanding your job preferences. Additionally, consider signing up for job alerts to receive notifications when new relevant positions are posted.',
    },
    {
      question: 'Are there any fees associated with using JobHunt?',
      answer: 'JobHunt is free for job seekers to use. There are no subscription fees or hidden charges. Simply create an account and start exploring job opportunities right away.',
    },
    {
      question: 'How can I improve my chances of getting hired through JobHunt?',
      answer: 'To increase your chances of getting hired, make sure your profile is complete and up-to-date, tailor your applications to each job listing, and utilize networking opportunities available on the platform. Additionally, consider enhancing your skills or qualifications through online courses or certifications.',
    },
    {
      question: 'I have a suggestion for improving the website. How can I provide feedback?',
      answer: 'We value your feedback and welcome any suggestions for improving the website. Please send us your feedback through the contact form on our website, and we\'ll take your suggestions into consideration as we continue to enhance the user experience.',
    },
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFAQ = faqData.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            The most common questions about JobHunt
          </p>
          <div className="mt-8">
            <input
              type="text"
              placeholder="Search FAQ..."
              value={searchTerm}
              onChange={handleSearch}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/2"
            />
          </div>
        </div>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFAQ.map((faq, index) => (
              <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{faq.question}</h3>
                  <div className="mt-2 text-base text-gray-500">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;