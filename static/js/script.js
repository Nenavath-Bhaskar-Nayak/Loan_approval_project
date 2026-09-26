
document.addEventListener("DOMContentLoaded", function () {

    // =========================================================
    // GLOBAL VARIABLES
    // =========================================================

    let currentStep = 1;
    const totalSteps = 4;

    let currentApplication = {};
    let currentPrediction = {};
    let currentApplicationId = "";


    // =========================================================
    // HELPER FUNCTIONS
    // =========================================================

    function getValue(id) {

        const element = document.getElementById(id);

        if (!element) {
            return "";
        }

        return element.value;
    }


    function setText(id, value) {

        const element = document.getElementById(id);

        if (element) {
            element.textContent = value;
        }
    }


    function formatCurrency(value) {

        const number = Number(value);

        if (isNaN(number)) {
            return "₹0";
        }

        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(number);
    }


    // =========================================================
    // ELEMENTS
    // =========================================================

    const loanForm =
        document.getElementById("loanForm");

    const applicationSection =
        document.getElementById("applicationSection");

    const loadingSection =
        document.getElementById("loadingSection");

    const resultSection =
        document.getElementById("resultSection");

    const startApplicationBtn =
        document.getElementById("startApplicationBtn");

    const howItWorksBtn =
        document.getElementById("howItWorksBtn");

    const nextBtn =
        document.getElementById("nextBtn");

    const backBtn =
        document.getElementById("backBtn");

    const submitBtn =
        document.getElementById("submitBtn");

    const newApplicationBtn =
        document.getElementById("newApplicationBtn");


    // =========================================================
    // FORM STEPS
    // =========================================================

    const formSteps =
        document.querySelectorAll(".form-step");


    // =========================================================
    // START APPLICATION
    // =========================================================

    if (startApplicationBtn) {

        startApplicationBtn.addEventListener(
            "click",
            function () {

                applicationSection.classList.remove(
                    "hidden"
                );

                applicationSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                currentStep = 1;

                showStep(currentStep);

            }
        );

    }


    // =========================================================
    // HOW IT WORKS BUTTON
    // =========================================================

    if (howItWorksBtn) {

        howItWorksBtn.addEventListener(
            "click",
            function () {

                const section =
                    document.getElementById(
                        "howItWorks"
                    );

                if (section) {

                    section.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }


    // =========================================================
    // SHOW STEP
    // =========================================================

    function showStep(step) {

        currentStep = step;


        formSteps.forEach(function (formStep) {

            const stepNumber =
                Number(
                    formStep.dataset.step
                );


            if (stepNumber === step) {

                formStep.classList.add(
                    "active"
                );

            } else {

                formStep.classList.remove(
                    "active"
                );

            }

        });


        // -------------------------------
        // Progress
        // -------------------------------

        const percentage =
            (step / totalSteps) * 100;


        const progressFill =
            document.getElementById(
                "progressFill"
            );


        if (progressFill) {

            progressFill.style.width =
                percentage + "%";

        }


        setText(
            "stepLabel",
            "Step " +
            step +
            " of " +
            totalSteps
        );


        setText(
            "progressPercent",
            percentage + "%"
        );


        // -------------------------------
        // Back button
        // -------------------------------

        if (backBtn) {

            if (step === 1) {

                backBtn.classList.add(
                    "hidden"
                );

            } else {

                backBtn.classList.remove(
                    "hidden"
                );

            }

        }


        // -------------------------------
        // Next / Submit
        // -------------------------------

        if (step === totalSteps) {

            if (nextBtn) {

                nextBtn.classList.add(
                    "hidden"
                );

            }


            if (submitBtn) {

                submitBtn.classList.remove(
                    "hidden"
                );

            }

        } else {

            if (nextBtn) {

                nextBtn.classList.remove(
                    "hidden"
                );

            }


            if (submitBtn) {

                submitBtn.classList.add(
                    "hidden"
                );

            }

        }

    }


    // =========================================================
    // VALIDATION
    // =========================================================

    function validateStep(step) {

        clearErrors();


        // =====================================================
        // STEP 1
        // =====================================================

        if (step === 1) {

            const age =
                Number(
                    getValue("Age")
                );

            const gender =
                getValue("Gender");

            const married =
                getValue("Married");

            const dependents =
                getValue("Dependents");


            if (
                !age ||
                age < 18 ||
                age > 80
            ) {

                showError(
                    "Age",
                    "Please enter an age between 18 and 80."
                );

                return false;

            }


            if (!gender) {

                showError(
                    "Gender",
                    "Please select gender."
                );

                return false;

            }


            if (!married) {

                showError(
                    "Married",
                    "Please select marital status."
                );

                return false;

            }


            if (!dependents) {

                showError(
                    "Dependents",
                    "Please select dependents."
                );

                return false;

            }

        }


        // =====================================================
        // STEP 2
        // =====================================================

        if (step === 2) {

            const education =
                getValue("Education");

            const employment =
                getValue(
                    "Employment_Type"
                );

            const income =
                Number(
                    getValue(
                        "Annual_Income"
                    )
                );

            const existingLoans =
                getValue(
                    "Existing_Loans"
                );


            if (!education) {

                showError(
                    "Education",
                    "Please select education."
                );

                return false;

            }


            if (!employment) {

                showError(
                    "Employment_Type",
                    "Please select employment type."
                );

                return false;

            }


            if (
                !income ||
                income <= 0
            ) {

                showError(
                    "Annual_Income",
                    "Please enter a valid annual income."
                );

                return false;

            }


            if (
                existingLoans === ""
            ) {

                showError(
                    "Existing_Loans",
                    "Please enter the number of existing loans."
                );

                return false;

            }

        }


        // =====================================================
        // STEP 3
        // =====================================================

        if (step === 3) {

            const creditScore =
                Number(
                    getValue(
                        "Credit_Score"
                    )
                );

            const loanAmount =
                Number(
                    getValue(
                        "Loan_Amount"
                    )
                );

            const loanTerm =
                getValue(
                    "Loan_Term"
                );

            const dti =
                Number(
                    getValue(
                        "Debt_to_Income"
                    )
                );

            const property =
                getValue(
                    "Property_Ownership"
                );


            if (
                !creditScore ||
                creditScore < 300 ||
                creditScore > 900
            ) {

                showError(
                    "Credit_Score",
                    "Credit score must be between 300 and 900."
                );

                return false;

            }


            if (
                !loanAmount ||
                loanAmount <= 0
            ) {

                showError(
                    "Loan_Amount",
                    "Please enter a valid loan amount."
                );

                return false;

            }


            if (!loanTerm) {

                showError(
                    "Loan_Term",
                    "Please select a loan term."
                );

                return false;

            }


            if (
                dti === "" ||
                dti < 0 ||
                dti > 100
            ) {

                showError(
                    "Debt_to_Income",
                    "Debt-to-income ratio must be between 0 and 100."
                );

                return false;

            }


            if (!property) {

                showError(
                    "Property_Ownership",
                    "Please select property ownership."
                );

                return false;

            }

        }


        return true;

    }


    // =========================================================
    // SHOW ERROR
    // =========================================================

    function showError(
        fieldId,
        message
    ) {

        const field =
            document.getElementById(
                fieldId
            );


        if (!field) {

            alert(message);

            return;

        }


        field.classList.add(
            "input-error"
        );


        field.focus();


        const errorElement =
            document.getElementById(
                fieldId + "Error"
            );


        if (errorElement) {

            errorElement.textContent =
                message;

        } else {

            alert(message);

        }

    }


    // =========================================================
    // CLEAR ERRORS
    // =========================================================

    function clearErrors() {

        document
            .querySelectorAll(
                ".input-error"
            )
            .forEach(function (element) {

                element.classList.remove(
                    "input-error"
                );

            });


        document
            .querySelectorAll(
                ".error-message"
            )
            .forEach(function (element) {

                element.textContent = "";

            });

    }


    // =========================================================
    // NEXT BUTTON
    // =========================================================

    if (nextBtn) {

        nextBtn.addEventListener(
            "click",
            function () {

                if (
                    !validateStep(
                        currentStep
                    )
                ) {

                    return;

                }


                if (
                    currentStep <
                    totalSteps
                ) {

                    currentStep++;

                    showStep(
                        currentStep
                    );

                    if (
                        currentStep ===
                        totalSteps
                    ) {

                        updateReview();

                    }

                }

            }
        );

    }


    // =========================================================
    // BACK BUTTON
    // =========================================================

    if (backBtn) {

        backBtn.addEventListener(
            "click",
            function () {

                if (
                    currentStep > 1
                ) {

                    currentStep--;

                    showStep(
                        currentStep
                    );

                }

            }
        );

    }


    // =========================================================
    // CREDIT SCORE METER
    // =========================================================

    const creditScoreInput =
        document.getElementById(
            "Credit_Score"
        );


    if (creditScoreInput) {

        creditScoreInput.addEventListener(
            "input",
            function () {

                const score =
                    Number(
                        creditScoreInput.value
                    );


                const creditFill =
                    document.getElementById(
                        "creditFill"
                    );


                const creditText =
                    document.getElementById(
                        "creditText"
                    );


                if (!score) {

                    if (creditFill) {

                        creditFill.style.width =
                            "0%";

                    }


                    if (creditText) {

                        creditText.textContent =
                            "Enter your credit score";

                    }

                    return;

                }


                let percentage =
                    (
                        (score - 300) /
                        600
                    ) * 100;


                percentage =
                    Math.max(
                        0,
                        Math.min(
                            100,
                            percentage
                        )
                    );


                if (creditFill) {

                    creditFill.style.width =
                        percentage + "%";

                }


                if (creditText) {

                    if (score >= 750) {

                        creditText.textContent =
                            "Excellent credit score";

                    } else if (score >= 700) {

                        creditText.textContent =
                            "Good credit score";

                    } else if (score >= 650) {

                        creditText.textContent =
                            "Fair credit score";

                    } else {

                        creditText.textContent =
                            "Low credit score";

                    }

                }

            }
        );

    }


    // =========================================================
    // INCOME PREVIEW
    // =========================================================

    const incomeInput =
        document.getElementById(
            "Annual_Income"
        );


    if (incomeInput) {

        incomeInput.addEventListener(
            "input",
            function () {

                const income =
                    Number(
                        incomeInput.value
                    );


                const preview =
                    document.getElementById(
                        "incomePreview"
                    );


                if (preview) {

                    if (income > 0) {

                        preview.textContent =
                            formatCurrency(
                                income
                            );

                    } else {

                        preview.textContent =
                            "";

                    }

                }

            }
        );

    }


    // =========================================================
    // LOAN AMOUNT PREVIEW
    // =========================================================

    const loanAmountInput =
        document.getElementById(
            "Loan_Amount"
        );


    if (loanAmountInput) {

        loanAmountInput.addEventListener(
            "input",
            function () {

                const amount =
                    Number(
                        loanAmountInput.value
                    );


                const preview =
                    document.getElementById(
                        "loanPreview"
                    );


                if (preview) {

                    if (amount > 0) {

                        preview.textContent =
                            formatCurrency(
                                amount
                            );

                    } else {

                        preview.textContent =
                            "";

                    }

                }

            }
        );

    }


    // =========================================================
    // DTI MESSAGE
    // =========================================================

    const dtiInput =
        document.getElementById(
            "Debt_to_Income"
        );


    if (dtiInput) {

        dtiInput.addEventListener(
            "input",
            function () {

                const dti =
                    Number(
                        dtiInput.value
                    );


                const dtiText =
                    document.getElementById(
                        "dtiText"
                    );


                if (!dtiText) {
                    return;
                }


                if (
                    dti === 0 ||
                    isNaN(dti)
                ) {

                    dtiText.textContent =
                        "";

                    return;

                }


                if (dti <= 30) {

                    dtiText.textContent =
                        "Low debt-to-income ratio.";

                } else if (dti <= 45) {

                    dtiText.textContent =
                        "Moderate debt-to-income ratio.";

                } else {

                    dtiText.textContent =
                        "High debt-to-income ratio.";

                }

            }
        );

    }


    // =========================================================
    // BUILD APPLICATION OBJECT
    // =========================================================

    function buildApplicationData() {

        currentApplication = {

            Age:
                Number(
                    getValue("Age")
                ),

            Gender:
                getValue("Gender"),

            Married:
                getValue("Married"),

            Education:
                getValue("Education"),

            Employment_Type:
                getValue(
                    "Employment_Type"
                ),

            Annual_Income:
                Number(
                    getValue(
                        "Annual_Income"
                    )
                ),

            Credit_Score:
                Number(
                    getValue(
                        "Credit_Score"
                    )
                ),

            Loan_Amount:
                Number(
                    getValue(
                        "Loan_Amount"
                    )
                ),

            Loan_Term:
                Number(
                    getValue(
                        "Loan_Term"
                    )
                ),

            Existing_Loans:
                Number(
                    getValue(
                        "Existing_Loans"
                    )
                ),

            Debt_to_Income:
                Number(
                    getValue(
                        "Debt_to_Income"
                    )
                ),

            Property_Ownership:
                getValue(
                    "Property_Ownership"
                ),

            Dependents:
                getValue(
                    "Dependents"
                )

        };


        return currentApplication;

    }


    // =========================================================
    // REVIEW APPLICATION
    // =========================================================

    function updateReview() {

        const reviewContainer =
            document.getElementById(
                "reviewContainer"
            );


        if (!reviewContainer) {
            return;
        }


        const data =
            buildApplicationData();


        reviewContainer.innerHTML = `

            <div class="review-grid">

                <div class="review-item">
                    <span>Age</span>
                    <strong>${data.Age}</strong>
                </div>

                <div class="review-item">
                    <span>Gender</span>
                    <strong>${data.Gender}</strong>
                </div>

                <div class="review-item">
                    <span>Marital Status</span>
                    <strong>${data.Married}</strong>
                </div>

                <div class="review-item">
                    <span>Dependents</span>
                    <strong>${data.Dependents}</strong>
                </div>

                <div class="review-item">
                    <span>Education</span>
                    <strong>${data.Education}</strong>
                </div>

                <div class="review-item">
                    <span>Employment</span>
                    <strong>${data.Employment_Type}</strong>
                </div>

                <div class="review-item">
                    <span>Annual Income</span>
                    <strong>${formatCurrency(data.Annual_Income)}</strong>
                </div>

                <div class="review-item">
                    <span>Credit Score</span>
                    <strong>${data.Credit_Score}</strong>
                </div>

                <div class="review-item">
                    <span>Existing Loans</span>
                    <strong>${data.Existing_Loans}</strong>
                </div>

                <div class="review-item">
                    <span>Debt-to-Income</span>
                    <strong>${data.Debt_to_Income}%</strong>
                </div>

                <div class="review-item">
                    <span>Property Ownership</span>
                    <strong>${data.Property_Ownership}</strong>
                </div>

                <div class="review-item">
                    <span>Loan Amount</span>
                    <strong>${formatCurrency(data.Loan_Amount)}</strong>
                </div>

                <div class="review-item">
                    <span>Loan Term</span>
                    <strong>${data.Loan_Term} months</strong>
                </div>

            </div>

        `;

    }


    // =========================================================
    // FORM SUBMISSION
    // =========================================================

    if (loanForm) {

        loanForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                // Make sure step 4 is valid
                if (
                    !validateStep(
                        currentStep
                    )
                ) {

                    return;

                }


                buildApplicationData();


                // =================================================
                // APPLICATION ID
                // =================================================

                currentApplicationId =
                    "BLP-" +
                    Math.floor(
                        100000 +
                        Math.random() *
                        900000
                    );


                // =================================================
                // SHOW LOADING
                // =================================================

                applicationSection.classList.add(
                    "hidden"
                );


                loadingSection.classList.remove(
                    "hidden"
                );


                loadingSection.scrollIntoView({
                    behavior: "smooth"
                });


                // =================================================
                // FASTAPI REQUEST
                // =================================================

                try {

                    const response =
                        await fetch(
                            "/predict",
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        currentApplication
                                    )
                            }
                        );


                    if (!response.ok) {

                        throw new Error(
                            "Server returned " +
                            response.status
                        );

                    }


                    currentPrediction =
                        await response.json();


                    // =================================================
                    // UPDATE RESULT
                    // =================================================

                    displayPrediction();


                    // =================================================
                    // UPDATE SUMMARY
                    // =================================================

                    updateApplicationSummary();


                    // =================================================
                    // HIDE LOADING
                    // =================================================

                    loadingSection.classList.add(
                        "hidden"
                    );


                    // =================================================
                    // SHOW RESULT
                    // =================================================

                    resultSection.classList.remove(
                        "hidden"
                    );


                    resultSection.scrollIntoView({
                        behavior: "smooth"
                    });


                } catch (error) {

                    console.error(
                        "Prediction error:",
                        error
                    );


                    loadingSection.classList.add(
                        "hidden"
                    );


                    applicationSection.classList.remove(
                        "hidden"
                    );


                    alert(
                        "Unable to process your application. Please make sure FastAPI is running."
                    );

                }

            }
        );

    }


    // =========================================================
    // DISPLAY ML RESULT
    // =========================================================

    function displayPrediction() {

        const prediction =
            currentPrediction.prediction;


        const approvedProbability =
            Number(
                currentPrediction.approved_probability ||
                0
            );


        const rejectedProbability =
            Number(
                currentPrediction.rejected_probability ||
                0
            );


        const resultTitle =
            document.getElementById(
                "resultTitle"
            );


        const resultMessage =
            document.getElementById(
                "resultMessage"
            );


        const resultProbability =
            document.getElementById(
                "resultProbability"
            );


        const probabilityFill =
            document.getElementById(
                "probabilityFill"
            );


        const resultIcon =
            document.getElementById(
                "resultIcon"
            );


        const resultStatus =
            document.getElementById(
                "resultStatus"
            );


        const applicationId =
            document.getElementById(
                "applicationId"
            );


        // =================================================
        // APPLICATION ID
        // =================================================

        if (applicationId) {

            applicationId.textContent =
                currentApplicationId;

        }


        // =================================================
        // RESULT TITLE
        // =================================================

        if (resultTitle) {

            if (
                prediction ===
                "APPROVED"
            ) {

                resultTitle.textContent =
                    "Loan Application Approved";

            } else {

                resultTitle.textContent =
                    "Loan Application Rejected";

            }

        }


        // =================================================
        // RESULT MESSAGE
        // =================================================

        if (resultMessage) {

            if (
                prediction ===
                "APPROVED"
            ) {

                resultMessage.textContent =
                    "The machine learning model predicts that this application meets the learned approval pattern.";

            } else {

                resultMessage.textContent =
                    "The machine learning model predicts that this application does not meet the learned approval pattern.";

            }

        }


        // =================================================
        // PROBABILITY
        // =================================================

        if (resultProbability) {

            resultProbability.textContent =
                (
                    approvedProbability *
                    100
                ).toFixed(2) +
                "%";

        }


        if (probabilityFill) {

            probabilityFill.style.width =
                (
                    approvedProbability *
                    100
                ) +
                "%";

        }


        // =================================================
        // ICON
        // =================================================

        if (resultIcon) {

            if (
                prediction ===
                "APPROVED"
            ) {

                resultIcon.textContent =
                    "✓";

            } else {

                resultIcon.textContent =
                    "✕";

            }

        }


        // =================================================
        // RESULT STATUS
        // =================================================

        if (resultStatus) {

            resultStatus.innerHTML = `

                <div class="result-probabilities">

                    <div>
                        <span>Approval Probability</span>
                        <strong>
                            ${(approvedProbability * 100).toFixed(2)}%
                        </strong>
                    </div>

                    <div>
                        <span>Rejection Probability</span>
                        <strong>
                            ${(rejectedProbability * 100).toFixed(2)}%
                        </strong>
                    </div>

                </div>

            `;

        }

    }


    // =========================================================
    // APPLICATION SUMMARY
    // =========================================================

    function updateApplicationSummary() {

        const data =
            currentApplication;


        setText(
            "summaryApplicationId",
            currentApplicationId
        );


        setText(
            "summaryAge",
            data.Age
        );


        setText(
            "summaryGender",
            data.Gender
        );


        setText(
            "summaryMarried",
            data.Married
        );


        setText(
            "summaryEducation",
            data.Education
        );


        setText(
            "summaryEmployment",
            data.Employment_Type
        );


        setText(
            "summaryDependents",
            data.Dependents
        );


        setText(
            "summaryIncome",
            formatCurrency(
                data.Annual_Income
            )
        );


        setText(
            "summaryCreditScore",
            data.Credit_Score
        );


        setText(
            "summaryExistingLoans",
            data.Existing_Loans
        );


        setText(
            "summaryDTI",
            data.Debt_to_Income +
            "%"
        );


        setText(
            "summaryProperty",
            data.Property_Ownership
        );


        setText(
            "summaryLoanAmount",
            formatCurrency(
                data.Loan_Amount
            )
        );


        setText(
            "summaryLoanTerm",
            data.Loan_Term +
            " months"
        );

    }


    // =========================================================
    // DOWNLOAD PDF REPORT
    // =========================================================

    function downloadLoanReport() {

        if (
            !currentApplicationId ||
            !currentApplication.Age
        ) {

            alert(
                "Please complete an application first."
            );

            return;

        }


        if (
            typeof window.jspdf ===
            "undefined"
        ) {

            alert(
                "PDF library was not loaded. Please refresh the page."
            );

            return;

        }


        const {
            jsPDF
        } =
            window.jspdf;


        const doc =
            new jsPDF();


        const prediction =
            currentPrediction.prediction ||
            "N/A";


        const approvedProbability =
            Number(
                currentPrediction.approved_probability ||
                0
            ) * 100;


        const rejectedProbability =
            Number(
                currentPrediction.rejected_probability ||
                0
            ) * 100;


        const today =
            new Date().toLocaleDateString(
                "en-IN"
            );


        // =================================================
        // HEADER
        // =================================================

        doc.setFillColor(
            37,
            99,
            235
        );


        doc.rect(
            0,
            0,
            210,
            38,
            "F"
        );


        doc.setTextColor(
            255,
            255,
            255
        );


        doc.setFontSize(
            22
        );


        doc.setFont(
            "helvetica",
            "bold"
        );


        doc.text(
            "Bhaskar's Loan Project",
            20,
            17
        );


        doc.setFontSize(
            11
        );


        doc.setFont(
            "helvetica",
            "normal"
        );


        doc.text(
            "Smart Loan Assessment",
            20,
            26
        );


        // =================================================
        // TITLE
        // =================================================

        doc.setTextColor(
            30,
            41,
            59
        );


        doc.setFontSize(
            18
        );


        doc.setFont(
            "helvetica",
            "bold"
        );


        doc.text(
            "Loan Application Report",
            20,
            55
        );


        doc.setFontSize(
            10
        );


        doc.setFont(
            "helvetica",
            "normal"
        );


        doc.text(
            "Application ID: " +
            currentApplicationId,
            20,
            64
        );


        doc.text(
            "Date: " +
            today,
            20,
            71
        );


        // =================================================
        // RESULT
        // =================================================

        if (
            prediction ===
            "APPROVED"
        ) {

            doc.setFillColor(
                220,
                252,
                231
            );

        } else {

            doc.setFillColor(
                254,
                226,
                226
            );

        }


        doc.roundedRect(
            20,
            82,
            170,
            32,
            5,
            5,
            "F"
        );


        if (
            prediction ===
            "APPROVED"
        ) {

            doc.setTextColor(
                22,
                101,
                52
            );

        } else {

            doc.setTextColor(
                185,
                28,
                28
            );

        }


        doc.setFontSize(
            16
        );


        doc.setFont(
            "helvetica",
            "bold"
        );


        doc.text(
            "Loan Status: " +
            prediction,
            30,
            96
        );


        doc.setFontSize(
            10
        );


        doc.setFont(
            "helvetica",
            "normal"
        );


        doc.text(
            "Approval Probability: " +
            approvedProbability.toFixed(2) +
            "%",
            30,
            105
        );


        doc.text(
            "Rejection Probability: " +
            rejectedProbability.toFixed(2) +
            "%",
            110,
            105
        );


        // =================================================
        // APPLICANT INFORMATION
        // =================================================

        let y = 128;


        doc.setTextColor(
            30,
            41,
            59
        );


        doc.setFontSize(
            14
        );


        doc.setFont(
            "helvetica",
            "bold"
        );


        doc.text(
            "Applicant Information",
            20,
            y
        );


        y += 10;


        const applicantDetails = [

            [
                "Age",
                currentApplication.Age
            ],

            [
                "Gender",
                currentApplication.Gender
            ],

            [
                "Marital Status",
                currentApplication.Married
            ],

            [
                "Education",
                currentApplication.Education
            ],

            [
                "Employment Type",
                currentApplication.Employment_Type
            ],

            [
                "Dependents",
                currentApplication.Dependents
            ]

        ];


        applicantDetails.forEach(
            function ([label, value]) {

                doc.setFont(
                    "helvetica",
                    "bold"
                );


                doc.text(
                    label + ":",
                    25,
                    y
                );


                doc.setFont(
                    "helvetica",
                    "normal"
                );


                doc.text(
                    String(value),
                    80,
                    y
                );


                y += 8;

            }
        );


        // =================================================
        // FINANCIAL INFORMATION
        // =================================================

        y += 8;


        doc.setFontSize(
            14
        );


        doc.setFont(
            "helvetica",
            "bold"
        );


        doc.text(
            "Financial Information",
            20,
            y
        );


        y += 10;


        const financialDetails = [

            [
                "Annual Income",
                formatCurrency(
                    currentApplication.Annual_Income
                )
            ],

            [
                "Credit Score",
                currentApplication.Credit_Score
            ],

            [
                "Existing Loans",
                currentApplication.Existing_Loans
            ],

            [
                "Debt-to-Income",
                currentApplication.Debt_to_Income +
                "%"
            ],

            [
                "Property Ownership",
                currentApplication.Property_Ownership
            ]

        ];


        financialDetails.forEach(
            function ([label, value]) {

                doc.setFont(
                    "helvetica",
                    "bold"
                );


                doc.text(
                    label + ":",
                    25,
                    y
                );


                doc.setFont(
                    "helvetica",
                    "normal"
                );


                doc.text(
                    String(value),
                    80,
                    y
                );


                y += 8;

            }
        );


        // =================================================
        // LOAN INFORMATION
        // =================================================

        y += 8;


        doc.setFontSize(
            14
        );


        doc.setFont(
            "helvetica",
            "bold"
        );


        doc.text(
            "Loan Information",
            20,
            y
        );


        y += 10;


        const loanDetails = [

            [
                "Loan Amount",
                formatCurrency(
                    currentApplication.Loan_Amount
                )
            ],

            [
                "Loan Term",
                currentApplication.Loan_Term +
                " months"
            ]

        ];


        loanDetails.forEach(
            function ([label, value]) {

                doc.setFont(
                    "helvetica",
                    "bold"
                );


                doc.text(
                    label + ":",
                    25,
                    y
                );


                doc.setFont(
                    "helvetica",
                    "normal"
                );


                doc.text(
                    String(value),
                    80,
                    y
                );


                y += 8;

            }
        );


        // =================================================
        // DISCLAIMER
        // =================================================

        y += 12;


        doc.setDrawColor(
            203,
            213,
            225
        );


        doc.line(
            20,
            y,
            190,
            y
        );


        y += 10;


        doc.setFontSize(
            9
        );


        doc.setTextColor(
            100,
            116,
            139
        );


        doc.setFont(
            "helvetica",
            "bold"
        );


        doc.text(
            "Disclaimer:",
            20,
            y
        );


        y += 6;


        doc.setFont(
            "helvetica",
            "normal"
        );


        const disclaimer =
            "This report is generated by a machine learning " +
            "based prediction system for educational and " +
            "demonstration purposes. The prediction does not " +
            "constitute a financial approval or guarantee. " +
            "Actual loan decisions may depend on additional " +
            "information and institutional policies.";


        const disclaimerLines =
            doc.splitTextToSize(
                disclaimer,
                170
            );


        doc.text(
            disclaimerLines,
            20,
            y
        );


        // =================================================
        // FOOTER
        // =================================================

        doc.setFontSize(
            8
        );


        doc.text(
            "Bhaskar's Loan Project | Smart Loan Assessment",
            20,
            285
        );


        doc.text(
            "Generated electronically",
            145,
            285
        );


        // =================================================
        // DOWNLOAD
        // =================================================

        doc.save(
            currentApplicationId +
            "_Loan_Report.pdf"
        );

    }


    // =========================================================
    // DOWNLOAD REPORT BUTTON
    // =========================================================

    const downloadReportBtn =
        document.getElementById(
            "downloadReportBtn"
        );


    if (downloadReportBtn) {

        downloadReportBtn.addEventListener(
            "click",
            downloadLoanReport
        );

    }


    // =========================================================
    // PRINT REPORT
    // =========================================================

    const printReportBtn =
        document.getElementById(
            "printReportBtn"
        );


    if (printReportBtn) {

        printReportBtn.addEventListener(
            "click",
            function () {

                window.print();

            }
        );

    }


    // =========================================================
    // START NEW APPLICATION
    // =========================================================

    if (newApplicationBtn) {

        newApplicationBtn.addEventListener(
            "click",
            function () {

                loanForm.reset();


                currentApplication = {};

                currentPrediction = {};

                currentApplicationId = "";


                clearErrors();


                resultSection.classList.add(
                    "hidden"
                );


                applicationSection.classList.remove(
                    "hidden"
                );


                currentStep = 1;

                showStep(1);


                applicationSection.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    }


    // =========================================================
    // EMI CALCULATOR
    // =========================================================

    const calculateEmiBtn =
        document.getElementById(
            "calculateEmiBtn"
        );


    if (calculateEmiBtn) {

        calculateEmiBtn.addEventListener(
            "click",
            function () {

                const loanAmount =
                    Number(
                        getValue(
                            "emiLoanAmount"
                        )
                    );


                const annualInterest =
                    Number(
                        getValue(
                            "emiInterest"
                        )
                    );


                const years =
                    Number(
                        getValue(
                            "emiTerm"
                        )
                    );


                if (
                    !loanAmount ||
                    loanAmount <= 0
                ) {

                    alert(
                        "Please enter a valid loan amount."
                    );

                    return;

                }


                if (
                    !annualInterest ||
                    annualInterest <= 0
                ) {

                    alert(
                        "Please enter a valid interest rate."
                    );

                    return;

                }


                if (
                    !years ||
                    years <= 0
                ) {

                    alert(
                        "Please select a valid loan term."
                    );

                    return;

                }


                const monthlyRate =
                    annualInterest /
                    100 /
                    12;


                const months =
                    years * 12;


                const emi =
                    loanAmount *
                    monthlyRate *
                    Math.pow(
                        1 + monthlyRate,
                        months
                    ) /
                    (
                        Math.pow(
                            1 + monthlyRate,
                            months
                        ) - 1
                    );


                const totalPayment =
                    emi * months;


                const totalInterest =
                    totalPayment -
                    loanAmount;


                setText(
                    "monthlyEmi",
                    formatCurrency(emi)
                );


                setText(
                    "emiPrincipal",
                    formatCurrency(
                        loanAmount
                    )
                );


                setText(
                    "emiInterestTotal",
                    formatCurrency(
                        totalInterest
                    )
                );


                setText(
                    "emiTotalPayment",
                    formatCurrency(
                        totalPayment
                    )
                );


                const emiResult =
                    document.getElementById(
                        "emiResult"
                    );


                if (emiResult) {

                    emiResult.classList.remove(
                        "hidden"
                    );

                }

            }
        );

    }


    // =========================================================
    // INITIAL STATE
    // =========================================================

    showStep(1);

});