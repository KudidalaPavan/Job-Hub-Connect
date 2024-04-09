import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const UploadResume = () => {
    //const id = useParams();
    const { id } = useParams();
    const details = JSON.parse(decodeURIComponent(id));
    const objectString = encodeURIComponent(JSON.stringify(details));
    console.log(typeof(id))
    console.log(typeof(details))
    const [resume, setResume] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setResume(file);
    };
    const [file,setfile]=useState([])
    const FileUpload = (e) => {
        console.log(e.target.files);
        setfile([...file, ...e.target.files]);
      };
    const handleSubmit = async(e) => {
        e.preventDefault();
        //window.location.href = `http://localhost:5173/additionalDetails/${objectString}`;
        

        // </AdditionalDetails>
console.log(file.length)
        if (file.length !== 0) {
            fd.append("email", "sample@gmail.com");
            for (let i = 0; i < file.length; i++) {
              fd.append("files", file[i]);
              console.log(file[i]);
            }
    
            const data = await fetch(`http://127.0.0.1:8000/upload`, {
              method: "POST",
              body: fd,
            });
            
            const res = await data.text();
            const data1 = JSON.parse(res);
    console.log(data1)
          }
        if (resume) {
            // You can handle the file upload logic here
            console.log('Uploading resume:', resume);
        } else {
            // Handle case where no file is selected
            console.log('No file selected');
        }
       // return <AdditionalDetails item={details} />
    };

    return (
        <div className="text-center my-6">
            <h1 className="text-5xl custom-text p-4">Upload Resume</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => FileUpload(e)}
                    
                    className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4"
                />
                {/* <button type="submit" className="custom-btn mt-2">
                    Upload
                </button> */}
                <Link to={`/additionalDetails/${objectString}`} className='custom-btn mt-4 w-full '>
                       Upload
                   </Link>
            </form>
        </div>
    );
};

export default UploadResume;