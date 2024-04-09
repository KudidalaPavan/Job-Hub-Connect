import React from 'react';
import './Blog.css'

const Blog = () => {
    return (
        <div>
            <div className="w-10/12 mx-auto mt-8 text-oscuro">
                <div className="flex flex-col justify-center w-full ">
                    <div>
                        <section className="text-gray-700">
                            <div className="container mx-auto">
                                <div className="text-center mb-12">
                                    <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                                        Frequently Asked Question
                                    </h1>
                                    <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto tracking-widest">
                                        The most common questions about JobHunt
                                    </p>
                                </div>
                                <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2 text-start">
                                    <div className="w-full lg:w-1/2 px-4 py-2">
                                        <details className="mb-4">
                                            <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                                            How do I apply for a job on JobHunt?
                                            </summary>

                                            <span className="px-4 py-2">
                                            To apply for a job on JobHunt, first, create an account or log in if you already have one. Then, browse through the available job listings, and when you find a job that interests you, click on the "Apply Now" button. Follow the instructions provided to submit your application.
                                            </span>
                                        </details>
                                        <details className="mb-4">
                                            <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                                            How can I track the status of my job applications?
                                            </summary>

                                            <span className="px-4 py-2">
                                            You can track the status of your job applications by visiting the "Applied Jobs Review Page." This page displays all the jobs you've applied for along with their current status, allowing you to stay updated on the progress of each application.
                                            </span>
                                        </details>
                                        <details className="mb-4">
                                            <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                                            Is my personal information secure on JobHunt?
                                            </summary>

                                            <span className="px-4 py-2">
                                            Yes, protecting your personal information is a top priority for us. We utilize advanced security measures to safeguard your data and ensure confidentiality throughout the job application process.
                                            </span>
                                        </details>
                                        <details className="mb-4">
                                            <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                                            How can I contact the employer or recruiter for more information about a job?
                                            </summary>

                                            <span className="px-4 py-2">
                                            If you have questions about a specific job listing, you can typically find contact information for the employer or recruiter within the job description. Feel free to reach out to them directly via email or phone for further clarification or inquiries.
                                            </span>
                                        </details>
                                        <details className="mb-4">
                                            <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                                            I'm experiencing technical difficulties with the website. What should I do?
                                            </summary>

                                            <span className="px-4 py-2">
                                            If you encounter any technical issues while using the website, please reach out to our customer support team for assistance. You can contact us via email or through the support portal, and we'll be happy to help resolve any issues you're experiencing.
                                        </span>
                                        </details>
                                    </div>
                                    <div className="w-full lg:w-1/2 px-4 py-2">
                                        <details className="mb-4">
                                            <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                                            Can I edit or withdraw my job application after submission?
                                            </summary>

                                            <span className="px-4 py-2">
                                            Yes, you can edit or withdraw your job application after submission. Simply navigate to the "Applied Jobs Review Page," find the relevant application, and select the option to edit or withdraw as needed.
                                            </span>
                                        </details>
                                        <details className="mb-4">
                                            <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                                            I'm having trouble finding jobs in my area of expertise. What should I do?
                                            </summary>

                                            <span className="px-4 py-2">
                                            If you're having trouble finding suitable job listings, try adjusting your search criteria or expanding your job preferences. Additionally, consider signing up for job alerts to receive notifications when new relevant positions are posted.
                                            </span>
                                        </details>
                                        <details className="mb-4">
                                            <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                                            Are there any fees associated with using JobHunt?
                                            </summary>

                                            <span className="px-4 py-2">
                                            JobHunt is free for job seekers to use. There are no subscription fees or hidden charges. Simply create an account and start exploring job opportunities right away.
                                            </span>
                                        </details>
                                        <details className="mb-4">
                                            <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                                            How can I improve my chances of getting hired through JobHunt?
                                            </summary>

                                            <span className="px-4 py-2">
                                            To increase your chances of getting hired, make sure your profile is complete and up-to-date, tailor your applications to each job listing, and utilize networking opportunities available on the platform. Additionally, consider enhancing your skills or qualifications through online courses or certifications.
                                            </span>
                                        </details>
                                        <details className="mb-4">
                                            <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                                            I have a suggestion for improving the website. How can I provide feedback?
                                            </summary>

                                            <span className="px-4 py-2">
                                            We value your feedback and welcome any suggestions for improving the website. Please send us your feedback through the contact form on our website, and we'll take your suggestions into consideration as we continue to enhance the user experience.
                                            </span>
                                        </details>
                                    </div>
                                    
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
