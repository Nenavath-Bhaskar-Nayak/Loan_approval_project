import joblib

MODEL_PATH = "models/loan_approval_model.pkl"

model = joblib.load(MODEL_PATH)


def predict_with_probability(data):
    prediction = model.predict(data)[0]

    result = "APPROVED" if prediction == "Approved" else "REJECTED"

    if hasattr(model, "predict_proba"):
        probabilities = model.predict_proba(data)[0]

        # Find the correct probability based on the model's class order
        classes = model.classes_

        approved_index = list(classes).index("Approved")
        rejected_index = list(classes).index("Rejected")

        return {
            "prediction": result,
            "rejected_probability": float(probabilities[rejected_index]),
            "approved_probability": float(probabilities[approved_index])
        }

    return {
        "prediction": result
    }