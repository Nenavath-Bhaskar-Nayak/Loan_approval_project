from pydantic import BaseModel


class LoanApplication(BaseModel):
    Age: int
    Gender: str
    Married: str
    Education: str
    Employment_Type: str
    Annual_Income: float
    Credit_Score: float
    Loan_Amount: float
    Loan_Term: int
    Existing_Loans: int
    Debt_to_Income: float
    Property_Ownership: str
    Dependents: str