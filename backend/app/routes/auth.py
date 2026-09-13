from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)


class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/register")
def register_user(data: RegisterRequest):
    return {
        "success": True,
        "message": "User registration successful",
        "user": {
            "name": data.name,
            "email": data.email
        }
    }


@router.post("/login")
def login_user(data: LoginRequest):
    return {
        "success": True,
        "message": "Login successful",
        "email": data.email
    }