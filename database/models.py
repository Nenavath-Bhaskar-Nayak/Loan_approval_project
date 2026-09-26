from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from database.database import Base


class LoanApplicationDB(Base):

    __tablename__ = "loan_applications"

    id = Column(Integer, primary_key=True, index=True)

    application_id = Column(
        String,
        unique=True,
        index=True,
        nullable=False
    )
    age = Column(Integer, nullable=False)
    gender = Column(String, nullable=False)
    married = Column(String, nullable=False)
    education = Column(String, nullable=False)
    employment_type = Column(String, nullable=False)

    annual_income = Column(Float, nullable=False)
    credit_score = Column(Float, nullable=False)
    loan_amount = Column(Float, nullable=False)
    loan_term = Column(Integer, nullable=False)

    existing_loans = Column(Integer, nullable=False)
    debt_to_income = Column(Float, nullable=False)

    property_ownership = Column(
        String,
        nullable=False
    )

    dependents = Column(
        String,
        nullable=False
    )

    prediction = Column(
        String,
        nullable=False
    )

    approved_probability = Column(
        Float,
        nullable=True
    )

    rejected_probability = Column(
        Float,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )