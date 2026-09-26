from fastapi import FastAPI, Request, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

from sqlalchemy.orm import Session

import pandas as pd
from datetime import datetime
import random

from app.schemas import LoanApplication
from src.predict import predict_with_probability

from database.database import engine, Base, get_db
from database.models import LoanApplicationDB


# =========================================================
# DATABASE TABLE CREATION
# =========================================================

Base.metadata.create_all(bind=engine)


# =========================================================
# FASTAPI APPLICATION
# =========================================================

app = FastAPI(
    title="Bhaskar's Loan Project",
    description="Loan Approval Prediction using Machine Learning",
    version="1.0.0"
)


# =========================================================
# TEMPLATES
# =========================================================

templates = Jinja2Templates(
    directory="templates"
)


# =========================================================
# STATIC FILES
# =========================================================

app.mount(
    "/static",
    StaticFiles(directory="static"),
    name="static"
)


# =========================================================
# HOME PAGE
# =========================================================

@app.get(
    "/",
    response_class=HTMLResponse
)
def home(request: Request):

    return templates.TemplateResponse(
        request=request,
        name="index.html"
    )
@app.get("/dashboard", response_class=HTMLResponse)
def dashboard(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="dashboard.html"
    )


# =========================================================
# LOAN PREDICTION + DATABASE STORAGE
# =========================================================

@app.post("/predict")
def predict_loan(
    application: LoanApplication,
    db: Session = Depends(get_db)
):

    # -----------------------------------------------------
    # Convert Pydantic data into DataFrame
    # -----------------------------------------------------

    data = pd.DataFrame([
        application.model_dump()
    ])


    # -----------------------------------------------------
    # Machine Learning Prediction
    # -----------------------------------------------------

    result = predict_with_probability(data)


    # -----------------------------------------------------
    # Generate Application ID
    # -----------------------------------------------------

    application_id = (
        "BLP-" +
        str(
            random.randint(
                100000,
                999999
            )
        )
    )


    # -----------------------------------------------------
    # Create Database Record
    # -----------------------------------------------------

    db_application = LoanApplicationDB(

        application_id=application_id,

        age=application.Age,

        gender=application.Gender,

        married=application.Married,

        education=application.Education,

        employment_type=
            application.Employment_Type,

        annual_income=
            application.Annual_Income,

        credit_score=
            application.Credit_Score,

        loan_amount=
            application.Loan_Amount,

        loan_term=
            application.Loan_Term,

        existing_loans=
            application.Existing_Loans,

        debt_to_income=
            application.Debt_to_Income,

        property_ownership=
            application.Property_Ownership,

        dependents=
            application.Dependents,

        prediction=
            result["prediction"],

        approved_probability=
            result.get(
                "approved_probability"
            ),

        rejected_probability=
            result.get(
                "rejected_probability"
            ),

        created_at=datetime.utcnow()
    )


    # -----------------------------------------------------
    # Save to Database
    # -----------------------------------------------------

    db.add(db_application)

    db.commit()

    db.refresh(db_application)


    # -----------------------------------------------------
    # Return Response
    # -----------------------------------------------------

    return {

        "application_id":
            application_id,

        "prediction":
            result["prediction"],

        "approved_probability":
            result.get(
                "approved_probability"
            ),

        "rejected_probability":
            result.get(
                "rejected_probability"
            )
    }


# =========================================================
# GET ALL APPLICATIONS
# =========================================================

@app.get("/applications")
def get_applications(
    db: Session = Depends(get_db)
):

    applications = (
        db.query(
            LoanApplicationDB
        )
        .order_by(
            LoanApplicationDB.created_at.desc()
        )
        .all()
    )


    return [

        {
            "application_id":
                item.application_id,

            "prediction":
                item.prediction,

            "approved_probability":
                item.approved_probability,

            "rejected_probability":
                item.rejected_probability,

            "created_at":
                item.created_at
        }

        for item in applications

    ]


# =========================================================
# GET ONE APPLICATION
# =========================================================

@app.get(
    "/applications/{application_id}"
)
def get_application(
    application_id: str,
    db: Session = Depends(get_db)
):

    application = (
        db.query(
            LoanApplicationDB
        )
        .filter(
            LoanApplicationDB.application_id
            == application_id
        )
        .first()
    )


    if not application:

        return {
            "message":
                "Application not found"
        }


    return {

        "application_id":
            application.application_id,

        "age":
            application.age,

        "gender":
            application.gender,

        "married":
            application.married,

        "education":
            application.education,

        "employment_type":
            application.employment_type,

        "annual_income":
            application.annual_income,

        "credit_score":
            application.credit_score,

        "loan_amount":
            application.loan_amount,

        "loan_term":
            application.loan_term,

        "existing_loans":
            application.existing_loans,

        "debt_to_income":
            application.debt_to_income,

        "property_ownership":
            application.property_ownership,

        "dependents":
            application.dependents,

        "prediction":
            application.prediction,

        "approved_probability":
            application.approved_probability,

        "rejected_probability":
            application.rejected_probability,

        "created_at":
            application.created_at
    }