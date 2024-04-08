from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import firebase_admin
from firebase_admin import credentials, auth

app = FastAPI()

# Firebase credentials setup
cred = credentials.Certificate("jobhunt-2002d-firebase-adminsdk-au353-75dc61f025.json")
firebase_admin.initialize_app(cred)

class User(BaseModel):
    email: str
    password: str

@app.post("/registerPage")
async def signup(user: User):
    try:
        user_record = auth.create_user(
            email=user.email,
            password=user.password
        )
        return {"message": "User created successfully", "user_id": user_record.uid}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/loginPage")
async def signin(user: User):
    try:
        user_info = auth.get_user_by_email(user.email)
        print(user_info)
        print(user_info.uid)
        if user_info.uid:
            # Implement your sign-in logic here, such as generating tokens, etc.
            return {"message": "Signin successful", "user_id": user_info.uid}
        else:
            raise HTTPException(status_code=401, detail="Email not verified")
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)
