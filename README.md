Bhaskar's Loan Project

Loan Approval Prediction Using Machine Learning

A full-stack machine learning application that predicts whether a loan
application is likely to be Approved or Rejected based on
applicant, employment, financial, credit, and loan-related information.

The project combines a Random Forest machine learning model,
FastAPI backend, and a modern responsive web interface. Users can
enter their loan details through the website, submit the application,
receive a model prediction with approval/rejection probabilities, review
the application summary, and generate a downloadable loan report.

Note: This project is intended for educational and demonstration
purposes. The prediction is not a real financial approval or
guarantee.

📌 Project Overview

Loan approval decisions can involve many factors, including income,
credit score, existing loans, employment type, debt-to-income ratio,
education, property ownership, and requested loan amount.

This project demonstrates an end-to-end machine learning workflow:

Loan Dataset
     ↓
Data Exploration & EDA
     ↓
Data Preprocessing
     ↓
Train/Test Split
     ↓
Random Forest Classifier
     ↓
Hyperparameter Tuning
     ↓
Best ML Pipeline
     ↓
Model Serialization (.pkl)
     ↓
FastAPI Backend
     ↓
Web Application
     ↓
Loan Prediction & Probability

✨ Features

Modern responsive loan application interface

Multi-step loan application form

Applicant information collection

Employment and income information

Credit and loan information

Client-side input validation

Credit score visual indicator

Annual income and loan amount formatting

Debt-to-income feedback

Machine learning prediction through FastAPI

Approval and rejection probabilities

Unique application ID

Application summary

Downloadable PDF loan report

Print report option

Start-new-application functionality

EMI calculator

Swagger API documentation

Machine learning model stored as a .pkl file

🧠 Machine Learning

Algorithm

The project uses:

Random Forest Classifier

The model is implemented inside a scikit-learn pipeline containing
preprocessing and the classifier.

Preprocessing

Numerical features are handled using median imputation.

Categorical features are handled using:

Most-frequent-value imputation

One-hot encoding

handle_unknown="ignore"

Loan_ID is excluded from the predictive features, and Loan_Status is
used as the target.

Model Development

The workflow includes:

Train/test split

Stratified sampling

Baseline Random Forest model

Cross-validation

Hyperparameter tuning using GridSearchCV

Selection of the best estimator

Final model serialization using joblib

The saved model is:

models/loan_approval_model.pkl

📊 Dataset

The project uses a dataset containing 1,000 loan application
records.

The original dataset is kept unchanged in:

data/loan_approval_dataset_1000_records.csv

Dataset Features

Feature                Description

Loan_ID              Unique loan application identifier
Age                  Applicant age
Gender               Applicant gender
Married              Marital status
Education            Education status
Employment_Type      Type of employment
Annual_Income        Annual income
Credit_Score         Applicant credit score
Loan_Amount          Requested loan amount
Loan_Term            Loan repayment term
Existing_Loans       Number of existing loans
Debt_to_Income       Debt-to-income ratio
Property_Ownership   Property ownership status
Dependents           Number of dependents
Loan_Status          Target: Approved or Rejected

Target Distribution

The dataset contains:

Approved: 509 records

Rejected: 491 records

This gives a relatively balanced target distribution.

🔍 Exploratory Data Analysis

The notebook includes analysis of:

Dataset shape

Column names and data types

Statistical summary

Missing values

Duplicate records

Target distribution

Categorical feature distributions

Annual income distribution

Credit score distribution

Loan amount distribution

Credit score vs loan status

Annual income vs loan status

Loan amount vs loan status

Employment type vs loan status

Education vs loan status

Numerical correlation heatmap

The complete analysis is available in:

notebooks/loan_approval_analysis.ipynb

🏗️ Project Structure

Loan_approval_project/
│
├── app/
│   ├── __init__.py
│   ├── main.py
│   └── schemas.py
│
├── data/
│   └── loan_approval_dataset_1000_records.csv
│
├── models/
│   └── loan_approval_model.pkl
│
├── notebooks/
│   └── loan_approval_analysis.ipynb
│
├── src/
│   ├── __init__.py
│   └── predict.py
│
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
│
├── templates/
│   └── index.html
│
├── screenshots/
│
├── requirements.txt
└── README.md

🛠️ Technologies Used

Programming Language

Python

Machine Learning

Scikit-learn

Random Forest

GridSearchCV

Cross-validation

Data Processing

Pandas

NumPy

Backend

FastAPI

Uvicorn

Pydantic

Frontend

HTML5

CSS3

JavaScript

Template Engine

Jinja2

Model Persistence

Joblib

Report Generation

jsPDF

Development Environment

Visual Studio Code

Jupyter Notebook

⚙️ Installation

1. Clone the repository

git clone <YOUR_GITHUB_REPOSITORY_URL>

2. Open the project

cd Loan_approval_project

3. Create/activate your Python environment

Use your preferred Python virtual environment or Conda environment.

4. Install dependencies

python -m pip install -r requirements.txt

▶️ Running the Application

From the project root directory, run:

python -m uvicorn app.main:app --reload

The application will be available at:

http://127.0.0.1:8000/

Open that address in your browser.

📚 API Documentation

FastAPI automatically provides interactive API documentation.

Open:

http://127.0.0.1:8000/docs

The main prediction endpoint is:

POST /predict

Example Request

{
    "Age": 30,
    "Gender": "Male",
    "Married": "Yes",
    "Education": "Graduate",
    "Employment_Type": "Salaried",
    "Annual_Income": 800000,
    "Credit_Score": 750,
    "Loan_Amount": 300000,
    "Loan_Term": 60,
    "Existing_Loans": 1,
    "Debt_to_Income": 25,
    "Property_Ownership": "Owned",
    "Dependents": "1"
}

Example Response

{
    "prediction": "APPROVED",
    "rejected_probability": 0.20,
    "approved_probability": 0.80
}

The actual probability values depend on the trained model and submitted
application.

🌐 Application Workflow

Step 1 --- Applicant Information

The user enters:

Age

Gender

Marital status

Dependents

Step 2 --- Employment & Income

The user provides:

Education

Employment type

Annual income

Existing loans

Step 3 --- Loan & Credit Information

The user provides:

Credit score

Loan amount

Loan term

Debt-to-income ratio

Property ownership

Step 4 --- Review

The entered information is displayed for review.

Step 5 --- Prediction

The application is sent to the FastAPI backend.

The trained Random Forest model returns:

Prediction

Approval probability

Rejection probability

Step 6 --- Report

The user can:

View the application summary

Download a PDF report

Print the report

Start a new application

📄 PDF Loan Report

After prediction, the application can generate a PDF report containing:

Application ID

Application date

Loan status

Approval probability

Rejection probability

Applicant information

Financial information

Loan information

Educational-use disclaimer

🖼️ Screenshots

Add your project screenshots inside the screenshots/ folder.

Recommended screenshots:

screenshots/
├── home-page.png
├── application-form.png
├── review-page.png
├── prediction-result.png
├── loan-report.png
└── swagger-api.png

Then add them to this README using:

![Home Page](screenshots/home-page.png)

Example:

## 🏠 Home Page

![Home Page](screenshots/home-page.png)

## 📝 Loan Application

![Application Form](screenshots/application-form.png)

## 📊 Prediction Result

![Prediction Result](screenshots/prediction-result.png)

## 📄 Loan Report

![Loan Report](screenshots/loan-report.png)

🔐 Data & Model Considerations

This project is a machine learning demonstration and should not be used
as a production lending decision system without appropriate validation,
governance, security, privacy controls, regulatory review, and
domain-specific evaluation.

Important considerations for a production system include:

Data privacy

Secure API deployment

Authentication and authorization

Model monitoring

Bias and fairness evaluation

Data drift monitoring

Model versioning

Audit logging

Human review

Regulatory compliance

🚀 Future Improvements

Possible future improvements include:

Docker containerization

Cloud deployment

User authentication

Database integration

Application history

Admin dashboard

Model monitoring

Automated model retraining

Feature importance visualization

More extensive model comparison

Production-grade logging

API security

CI/CD pipeline

Automated testing

Cloud database integration

🧪 Testing Checklist

Before deployment, verify:

Home page loads correctly

CSS loads correctly

JavaScript loads correctly

All form fields work

Form validation works

/predict API works

ML model loads successfully

Prediction is displayed

Approval probability is displayed

Rejection probability is displayed

Application ID is generated

PDF report downloads

Print report works

Start New Application works

Swagger documentation works

👨‍💻 Author

Bhaskar Nayak

Computer Science and Engineering
Ellenki College of Engineering

📌 Disclaimer

This project is developed for educational and demonstration
purposes.

The machine learning output represents a model prediction based on the
supplied dataset and learned patterns. It does not constitute a
real-world financial approval, loan guarantee, or financial advice.

⭐ Project Highlights

✔ 1000-record loan dataset
✔ Exploratory Data Analysis
✔ Data preprocessing pipeline
✔ Random Forest classification
✔ Cross-validation
✔ GridSearchCV hyperparameter tuning
✔ Saved ML pipeline
✔ FastAPI REST API
✔ Pydantic validation
✔ Responsive web interface
✔ Real-time prediction
✔ Probability output
✔ PDF report generation
✔ Swagger API documentation
✔ Ready for GitHub
✔ Ready for Dockerization and deployment

📜 License

This project is intended for educational and portfolio use. Add a
specific open-source license to the repository if you plan to distribute
the project under one.
