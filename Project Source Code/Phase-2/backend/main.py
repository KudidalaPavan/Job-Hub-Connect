from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import mysql.connector
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException,Form,UploadFile,File
import firebase_admin
from firebase_admin import credentials, auth,db,storage

app = FastAPI()

# Firebase credentials setup
cred = credentials.Certificate("jobhunt-2002d-firebase-adminsdk-au353-75dc61f025.json")
#firebase_admin.initialize_app(cred)


firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://jobhunt-2002d-default-rtdb.firebaseio.com/',
    'storageBucket': 'jobhunt-2002d.appspot.com'
})
bucket = storage.bucket()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","http://localhost:3001","*"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["GET","POST"],
    allow_headers=["*"],
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MySQL Connection Configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "0998",
    "database": "job_application"
}


@app.post("/upload")
async def upload_pdf(email: str = Form(...), file: UploadFile = File(...)):
    try:
        metadata = None
        if email:
            metadata = {"email": email}
        blob = bucket.blob(file.filename)
        blob.metadata = metadata
        blob.upload_from_file(file.file)

        return {"message": f"File {file.filename} uploaded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading file: {e}")

# Connect to MySQL Database
def connect_to_database():
    try:
        connection = mysql.connector.connect(**db_config)
        return connection
    except mysql.connector.Error as e:
        print("Error connecting to MySQL:", e)
        raise HTTPException(status_code=500, detail="Database connection error")

# User Model
class User(BaseModel):
    email: str
    password: str

# Register User Endpoint
@app.post("/registerPage")
async def register(user: User, db: mysql.connector.connection.MySQLConnection = Depends(connect_to_database)):
    try:
        cursor = db.cursor()
        # Check if user already exists
        cursor.execute("SELECT * FROM user_credentials WHERE email = %s", (user.email,))
        existing_user = cursor.fetchone()
        if existing_user:
            raise HTTPException(status_code=400, detail="User already exists")

        # Insert new user into database
        cursor.execute("INSERT INTO user_credentials (email, password) VALUES (%s, %s)", (user.email, user.password))
        db.commit()
        cursor.close()
        return {"message": "User registered successfully"}
    except mysql.connector.Error as e:
        print("MySQL Error:", e)
        raise HTTPException(status_code=500, detail="Error registering user")

# Login User Endpoint
@app.post("/loginPage")
async def login(user: User, db: mysql.connector.connection.MySQLConnection = Depends(connect_to_database)):
    try:
        cursor = db.cursor()
        # Retrieve user from database
        cursor.execute("SELECT * FROM user_credentials WHERE email = %s AND password = %s", (user.email, user.password))
        existing_user = cursor.fetchone()
        cursor.close()
        if existing_user:
            return {"message": "Login successful"}
        else:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    except mysql.connector.Error as e:
        print("MySQL Error:", e)
        raise HTTPException(status_code=500, detail="Error logging in")

