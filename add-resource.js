// =====================================================
// COLLEGE NOTES HUB
// ADD RESOURCE JAVASCRIPT
// =====================================================


// =====================================================
// SUBJECT DATA
// =====================================================

const resourceSubjects = {

    "1": [],

    "2": [],

    "3": [
        "DBMS",
        "Artificial Intelligence",
        "Probability and Statistics",
        "Feature Engineering"
    ],

    "4": [],

    "5": [],

    "6": []

};


// =====================================================
// GET HTML ELEMENTS
// =====================================================

const semesterSelect =
    document.getElementById("resourceSemester");

const subjectSelect =
    document.getElementById("resourceSubject");

const resourceForm =
    document.getElementById("resourceForm");

const resourceMessage =
    document.getElementById("resourceMessage");


// =====================================================
// ADMIN ACCESS CHECK
// =====================================================

function checkAdminAccess() {

    const sessionUser =
        localStorage.getItem(
            "login_auth_session"
        );

    const storedUsers =
        localStorage.getItem(
            "login_auth_users"
        );


    // No login

    if (!sessionUser) {

        window.location.href =
            "login.html";

        return false;

    }


    // No users

    if (!storedUsers) {

        window.location.href =
            "index.html";

        return false;

    }


    try {

        const users =
            JSON.parse(
                storedUsers
            );


        const loggedUser =
            users.find(
                function(user) {

                    return (
                        user.name ===
                        sessionUser
                    );

                }
            );


        // User not found

        if (!loggedUser) {

            window.location.href =
                "index.html";

            return false;

        }


        // Only admin

        if (
            loggedUser.username
                .toLowerCase() !==
            "admin"
        ) {

            alert(
                "Access denied. Only the administrator can add resources."
            );


            window.location.href =
                "index.html";

            return false;

        }


        return true;

    }

    catch (error) {

        window.location.href =
            "index.html";

        return false;

    }

}


// =====================================================
// LOAD SUBJECTS
// =====================================================

function loadResourceSubjects() {

    const semester =
        semesterSelect.value;


    subjectSelect.innerHTML =
        '<option value="">-- Select Subject --</option>';


    if (semester === "") {

        subjectSelect.disabled =
            true;

        return;

    }


    const selectedSubjects =
        resourceSubjects[semester] || [];


    if (
        selectedSubjects.length ===
        0
    ) {

        subjectSelect.disabled =
            true;


        const option =
            document.createElement(
                "option"
            );


        option.value = "";

        option.textContent =
            "No subjects added yet";


        subjectSelect.appendChild(
            option
        );


        return;

    }


    selectedSubjects.forEach(
        function(subject) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                subject;

            option.textContent =
                subject;


            subjectSelect.appendChild(
                option
            );

        }
    );


    subjectSelect.disabled =
        false;

}


// =====================================================
// SHOW MESSAGE
// =====================================================

function showMessage(
    text,
    type
) {

    resourceMessage.textContent =
        text;


    resourceMessage.className =
        "resource-message " +
        type;

}


// =====================================================
// FORM SUBMISSION
// =====================================================

function addResource(event) {

    event.preventDefault();


    // ================================================
    // GET VALUES
    // ================================================

    const semester =
        semesterSelect.value;


    const subject =
        subjectSelect.value;


    const resourceType =
        document.getElementById(
            "resourceType"
        ).value;


    const resourceName =
        document.getElementById(
            "resourceName"
        ).value.trim();


    const description =
        document.getElementById(
            "resourceDescription"
        ).value.trim();


    const fileInput =
        document.getElementById(
            "resourceFile"
        );


    const file =
        fileInput.files[0];


    // ================================================
    // VALIDATION
    // ================================================

    if (!semester) {

        showMessage(
            "Please select a semester.",
            "error"
        );

        return;

    }


    if (!subject) {

        showMessage(
            "Please select a subject.",
            "error"
        );

        return;

    }


    if (!resourceType) {

        showMessage(
            "Please select a resource type.",
            "error"
        );

        return;

    }


    if (!resourceName) {

        showMessage(
            "Please enter a resource name.",
            "error"
        );

        return;

    }


    if (!file) {

        showMessage(
            "Please select a PDF file.",
            "error"
        );

        return;

    }


    // ================================================
    // CHECK FILE TYPE
    // ================================================

    const fileName =
        file.name.toLowerCase();


    if (
        !fileName.endsWith(".pdf")
    ) {

        showMessage(
            "Please select a PDF file.",
            "error"
        );

        return;

    }


    // ================================================
    // CREATE RESOURCE OBJECT
    // ================================================

    const resource = {

        id:
            Date.now(),

        semester:
            semester,

        subject:
            subject,

        type:
            resourceType,

        name:
            resourceName,

        description:
            description,

        fileName:
            file.name,

        addedBy:
            "admin",

        addedAt:
            new Date().toLocaleString()

    };


    // ================================================
    // GET EXISTING RESOURCES
    // ================================================

    let resources = [];


    const storedResources =
        localStorage.getItem(
            "college_resources"
        );


    if (storedResources) {

        try {

            resources =
                JSON.parse(
                    storedResources
                );

        }

        catch (error) {

            resources = [];

        }

    }


    // ================================================
    // ADD RESOURCE
    // ================================================

    resources.push(resource);


    // ================================================
    // SAVE
    // ================================================

    localStorage.setItem(
        "college_resources",
        JSON.stringify(
            resources
        )
    );


    // ================================================
    // SUCCESS MESSAGE
    // ================================================

    showMessage(
        "✅ Resource added successfully!",
        "success"
    );


    // ================================================
    // RESET FORM
    // ================================================

    resourceForm.reset();


    subjectSelect.innerHTML =
        '<option value="">-- Select Subject --</option>';


    subjectSelect.disabled =
        true;


    // ================================================
    // SHOW SAVED INFORMATION
    // ================================================

    console.log(
        "Resource added:",
        resource
    );

}


// =====================================================
// EVENTS
// =====================================================

if (semesterSelect) {

    semesterSelect.addEventListener(
        "change",
        loadResourceSubjects
    );

}


if (resourceForm) {

    resourceForm.addEventListener(
        "submit",
        addResource
    );

}


// =====================================================
// START
// =====================================================

if (checkAdminAccess()) {

    console.log(
        "Admin resource page loaded successfully."
    );

}
