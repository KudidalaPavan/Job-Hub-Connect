from fastapi import FastAPI, HTTPException, Form, UploadFile, File, Body
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import firebase_admin
from firebase_admin import credentials, auth, db, storage
from firebase_admin._auth_utils import EmailAlreadyExistsError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, FileResponse
from io import BytesIO
from datetime import datetime, timedelta
from mangum import Mangum
import os

app = FastAPI()

cred = credentials.Certificate("jobhub-e44c7-firebase-adminsdk-c3swq-626457c1f4.json")

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://jobhub-e44c7-default-rtdb.firebaseio.com/',
    'storageBucket': 'jobhub-e44c7.appspot.com'
})

bucket = storage.bucket()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3001", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    email: str
    password: str

@app.post("/api/signup")
async def signup(email: str = Form(...),password: str = Form(...)):
    print(email,password)
    try:
        user_record = auth.create_user(
            email=email,
            password=password
        )
        return {"message": "User created successfully", "user_id": user_record.uid}
    except EmailAlreadyExistsError:
        raise HTTPException(status_code=400, detail="User with this email already exists")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/signin")
async def signin(email: str = Form(...),password: str = Form(...)):
    try:
        user_info = auth.get_user_by_email(email)
        print(user_info)
        print(user_info.uid)
        if user_info.uid:
            # Implement your sign-in logic here, such as generating tokens, etc.
            return {"message": "Signin successful", "user_id": user_info.uid}
        else:
            raise HTTPException(status_code=401, detail="Email not verified")
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=401, detail=str(e))
    
@app.post("/api/insertData")
async def insertData(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    degree: str = Form(None),
    college: str = Form(None),
    projectTitle: str = Form(None),
    projectDescription: str = Form(None),
    skills: str = Form(None),
    gender: str = Form(...),
    hasExperience: bool = Form(...),
    jobTitle: str = Form(None),
    jobDescription: str = Form(None),
    previousCompanyName: str = Form(None),
    previousCTC: str = Form(None),
    expectingCTC: str = Form(None),
    job_id: str = Form(...)
):
    try:
        encoded_email = email.replace(".", ",").replace("@", "*")

        # Validate required fields
        if not name:
            raise HTTPException(status_code=422, detail="Name is required")
        if not email:
            raise HTTPException(status_code=422, detail="Email is required")
        if not phone:
            raise HTTPException(status_code=422, detail="Phone is required")
        if not gender:
            raise HTTPException(status_code=422, detail="Gender is required")

        # Validate experience-related fields
        if hasExperience:
            if not jobTitle:
                raise HTTPException(status_code=422, detail="Job Title is required")
            if not jobDescription:
                raise HTTPException(status_code=422, detail="Job Description is required")
            if not previousCompanyName:
                raise HTTPException(status_code=422, detail="Previous Company Name is required")
            if not previousCTC:
                raise HTTPException(status_code=422, detail="Previous CTC is required")
            if not expectingCTC:
                raise HTTPException(status_code=422, detail="Expecting CTC is required")
        else:
            # Validate fresher-related fields
            if not degree:
                raise HTTPException(status_code=422, detail="Degree is required")
            if not college:
                raise HTTPException(status_code=422, detail="College is required")
            if not projectTitle:
                raise HTTPException(status_code=422, detail="Project Title is required")
            if not projectDescription:
                raise HTTPException(status_code=422, detail="Project Description is required")
            if not skills:
                raise HTTPException(status_code=422, detail="Skills are required")

        user_data = {
            "name": name,
            "email": email,
            "phone": phone,
            "degree": degree,
            "college": college,
            "projectTitle": projectTitle,
            "projectDescription": projectDescription,
            "skills": skills,
            "gender": gender,
            "hasExperience": hasExperience,
            "jobTitle": jobTitle,
            "jobDescription": jobDescription,
            "previousCompanyName": previousCompanyName,
            "previousCTC": previousCTC,
            "expectingCTC": expectingCTC,
            "job_id": job_id
        }

        # Get the existing user data or create an empty list
        existing_user_data = db.reference(f'/users/{encoded_email}').get() or []

        # Check if the existing user data is a list
        if isinstance(existing_user_data, list):
            existing_user_data.append(user_data)
        else:
            existing_user_data = [existing_user_data, user_data]

        # Update the user data in the database
        db.reference(f'/users/{encoded_email}').set(existing_user_data)

        return {"success": True, "message": "Data inserted successfully"}
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error inserting data: {str(e)}")


@app.post("/api/upload")
async def upload_pdf(email: str = Form(...), file: UploadFile = File(...)):
    try:
        if not email:
            raise HTTPException(status_code=422, detail="Email is required")
        print(email)
        metadata = {"email": email}
        blob = bucket.blob(file.filename)
        blob.metadata = metadata
        blob.upload_from_file(file.file)
        print(file.filename)
        return {"message": f"File {file.filename} uploaded successfully"}
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail=f"Error uploading file: {e}")


# ... (existing code) ...

@app.get("/api/getUserData")
async def get_user_data(email: str, job_id: str):
    print(f"Received request for user data with email: {email} and job ID: {job_id}")
    try:
        encoded_email = email.replace(".", ",").replace("@", "*")
        user_data = db.reference(f'/users/{encoded_email}').get()

        if user_data:
            if isinstance(user_data, list):
                # Filter the user data list to find the job application with the matching job_id
                matching_job_data = next((job for job in user_data if job.get("job_id") == job_id), None)
                if matching_job_data:
                    print(f"User data retrieved from Firebase: {matching_job_data}")
                    return matching_job_data
                else:
                    print("User data not found or job ID does not match")
                    return {"message": "User data not found or job ID does not match"}
            elif user_data.get("job_id") == job_id:
                print(f"User data retrieved from Firebase: {user_data}")
                return user_data
            else:
                print("User data not found or job ID does not match")
                return {"message": "User data not found or job ID does not match"}
        else:
            print("User data not found")
            return {"message": "User data not found"}
    except Exception as e:
        print(f"Error retrieving user data: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error retrieving user data: {str(e)}")

@app.get("/api/getResume")
async def get_resume(email: str):
    print(f"Received request for resume with email: {email}")
    try:
        blobs = bucket.list_blobs()

        for blob in blobs:
            if blob.metadata and blob.metadata.get('email') == email:
                print(f"Resume found: {blob.name}")
                resume_url = blob.generate_signed_url(timedelta(minutes=10), method='GET')
                return {"resume_url": resume_url}

        print("Resume not found")
        return {"message": "Resume not found"}
    except Exception as e:
        print(f"Error retrieving resume: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error retrieving resume: {str(e)}")

@app.put("/api/updateApplication/{application_id}")
async def update_application(application_id: str, updated_data: dict):
    try:
        encoded_email = updated_data["email"].replace(".", ",").replace("@", "*")

        # Update the application data in the database based on the application_id
        db.reference(f'/users/{encoded_email}').update(updated_data)

        return {"message": "Application updated successfully"}
    except Exception as e:
        print(f"Error updating application: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error updating application: {str(e)}")

def handler(event, context):
    return app(event, context)

handler = Mangum(app)