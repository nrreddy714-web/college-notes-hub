// =====================================================
// COLLEGE NOTES HUB - MAIN SCRIPT
// =====================================================


// =====================================================
// DEFAULT SUBJECTS
// =====================================================

const subjects = {

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
// CURRENT RESOURCE CATEGORY
// =====================================================

let currentResourceCategory = "all";


// =====================================================
// GET LOGGED-IN USER
// =====================================================

function getLoggedInUser() {

    const sessionUser =
        localStorage.getItem(
            "login_auth_session"
        );

    const storedUsers =
        localStorage.getItem(
            "login_auth_users"
        );


    if (
        !sessionUser ||
        !storedUsers
    ) {

        return null;

    }


    try {

        const users =
            JSON.parse(
                storedUsers
            );


        return (
            users.find(
                function(user) {

                    return (
                        user.name ===
                        sessionUser
                    );

                }
            ) || null
        );

    }

    catch (error) {

        return null;

    }

}


// =====================================================
// FAVORITES KEY
// =====================================================

function getFavoritesKey() {

    const user =
        getLoggedInUser();


    if (!user) {

        return null;

    }


    return (
        "favorite_resources_" +
        user.username
    );

}


// =====================================================
// GET FAVORITES
// =====================================================

function getFavorites() {

    const key =
        getFavoritesKey();


    if (!key) {

        return [];

    }


    const stored =
        localStorage.getItem(
            key
        );


    if (!stored) {

        return [];

    }


    try {

        return JSON.parse(
            stored
        );

    }

    catch (error) {

        return [];

    }

}


// =====================================================
// SAVE FAVORITES
// =====================================================

function saveFavorites(
    favorites
) {

    const key =
        getFavoritesKey();


    if (!key) {

        return;

    }


    localStorage.setItem(
        key,
        JSON.stringify(
            favorites
        )
    );

}


// =====================================================
// CHECK FAVORITE
// =====================================================

function isFavorite(
    resourceId
) {

    const favorites =
        getFavorites();


    return favorites.some(
        function(resource) {

            return (
                String(resource.id) ===
                String(resourceId)
            );

        }
    );

}


// =====================================================
// TOGGLE FAVORITE
// =====================================================

function toggleFavorite(
    resource
) {

    const user =
        getLoggedInUser();


    if (!user) {

        alert(
            "Please login to save resources."
        );

        window.location.href =
            "login.html";

        return;

    }


    const favorites =
        getFavorites();


    const existingIndex =
        favorites.findIndex(
            function(item) {

                return (
                    String(item.id) ===
                    String(resource.id)
                );

            }
        );


    if (
        existingIndex !==
        -1
    ) {

        favorites.splice(
            existingIndex,
            1
        );


        saveFavorites(
            favorites
        );


        alert(
            "⭐ Resource removed from saved resources."
        );

    }

    else {

        favorites.push(
            resource
        );


        saveFavorites(
            favorites
        );


        alert(
            "⭐ Resource saved successfully!"
        );

    }


    showResources();

}


// =====================================================
// GET ALL SUBJECTS
// =====================================================

function getAllSubjects(
    semester
) {

    let result = [
        ...(subjects[semester] || [])
    ];


    const storedCustomSubjects =
        localStorage.getItem(
            "college_custom_subjects"
        );


    if (storedCustomSubjects) {

        try {

            const customSubjects =
                JSON.parse(
                    storedCustomSubjects
                );


            const customList =
                customSubjects[
                    semester
                ] || [];


            customList.forEach(
                function(subject) {

                    if (
                        !result.includes(
                            subject
                        )
                    ) {

                        result.push(
                            subject
                        );

                    }

                }
            );

        }

        catch (error) {

            console.log(
                "Unable to load custom subjects."
            );

        }

    }


    return result;

}


// =====================================================
// LOAD SUBJECTS
// =====================================================

function loadSubjects() {

    const semesterElement =
        document.getElementById(
            "semester"
        );

    const subjectElement =
        document.getElementById(
            "subject"
        );

    const resourceList =
        document.getElementById(
            "resourceList"
        );

    const categoryBox =
        document.getElementById(
            "resourceCategories"
        );


    if (
        !semesterElement ||
        !subjectElement ||
        !resourceList
    ) {

        return;

    }


    const semester =
        semesterElement.value;


    subjectElement.innerHTML =
        '<option value="">-- Select Subject --</option>';


    resourceList.innerHTML =
        "";


    currentResourceCategory =
        "all";


    if (categoryBox) {

        categoryBox.style.display =
            "none";

    }


    resetCategoryButtons();


    if (
        semester === ""
    ) {

        subjectElement.disabled =
            true;

        return;

    }


    let semesterSubjects =
        getAllSubjects(
            semester
        );


    // -----------------------------------------------
    // ADD SUBJECTS FROM ADMIN RESOURCES
    // -----------------------------------------------

    const storedResources =
        localStorage.getItem(
            "college_resources"
        );


    if (storedResources) {

        try {

            const resources =
                JSON.parse(
                    storedResources
                );


            resources.forEach(
                function(resource) {

                    if (

                        resource.semester ===
                        semester &&

                        resource.subject &&

                        !semesterSubjects.includes(
                            resource.subject
                        )

                    ) {

                        semesterSubjects.push(
                            resource.subject
                        );

                    }

                }
            );

        }

        catch (error) {

            console.log(
                "Unable to load resource subjects."
            );

        }

    }


    // -----------------------------------------------
    // NO SUBJECTS
    // -----------------------------------------------

    if (
        semesterSubjects.length ===
        0
    ) {

        subjectElement.disabled =
            true;


        const option =
            document.createElement(
                "option"
            );


        option.textContent =
            "No subjects available yet";


        option.disabled =
            true;


        subjectElement.appendChild(
            option
        );


        return;

    }


    // -----------------------------------------------
    // ADD SUBJECT OPTIONS
    // -----------------------------------------------

    semesterSubjects.forEach(
        function(item) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                item;


            option.textContent =
                item;


            subjectElement.appendChild(
                option
            );

        }
    );


    subjectElement.disabled =
        false;

}


// =====================================================
// CREATE RESOURCE CARD
// =====================================================

function createResourceCard(
    resource
) {

    const item =
        document.createElement(
            "div"
        );


    item.className =
        "resource-item";


    item.dataset.category =
        resource.type || "materials";


    let icon =
        "📚";


    if (
        resource.type ===
        "notes"
    ) {

        icon =
            "📖";

    }

    else if (
        resource.type ===
        "lab"
    ) {

        icon =
            "💻";

    }

    else if (
        resource.type ===
        "papers"
    ) {

        icon =
            "📄";

    }


    const title =
        document.createElement(
            "h3"
        );


    title.textContent =
        icon +
        " " +
        (resource.name || "Resource");


    item.appendChild(
        title
    );


    const description =
        document.createElement(
            "p"
        );


    description.textContent =
        resource.description ||
        (
            "Study resource for " +
            (resource.subject || "")
        );


    item.appendChild(
        description
    );


    if (
        resource.fileName
    ) {

        const fileText =
            document.createElement(
                "p"
            );


        const strong =
            document.createElement(
                "strong"
            );


        strong.textContent =
            "📁 File: ";


        fileText.appendChild(
            strong
        );


        fileText.appendChild(
            document.createTextNode(
                resource.fileName
            )
        );


        item.appendChild(
            fileText
        );

    }


    const buttonContainer =
        document.createElement(
            "div"
        );


    // -----------------------------------------------
    // VIEW / DOWNLOAD
    // -----------------------------------------------

    if (
        resource.path
    ) {

        const viewButton =
            document.createElement(
                "a"
            );


        viewButton.href =
            resource.path;


        viewButton.target =
            "_blank";


        viewButton.className =
            "resource-button";


        viewButton.textContent =
            "📖 View";


        buttonContainer.appendChild(
            viewButton
        );


        const downloadButton =
            document.createElement(
                "a"
            );


        downloadButton.href =
            resource.path;


        downloadButton.download =
            "";


        downloadButton.className =
            "resource-button";


        downloadButton.textContent =
            "⬇ Download";


        buttonContainer.appendChild(
            downloadButton
        );

    }

    else {

        const viewButton =
            document.createElement(
                "button"
            );


        viewButton.type =
            "button";


        viewButton.className =
            "resource-button";


        viewButton.textContent =
            "📖 View Resource";


        viewButton.addEventListener(
            "click",
            showFileMessage
        );


        buttonContainer.appendChild(
            viewButton
        );


        const downloadButton =
            document.createElement(
                "button"
            );


        downloadButton.type =
            "button";


        downloadButton.className =
            "resource-button";


        downloadButton.textContent =
            "⬇ Download";


        downloadButton.addEventListener(
            "click",
            showFileMessage
        );


        buttonContainer.appendChild(
            downloadButton
        );

    }


    // -----------------------------------------------
    // FAVORITE BUTTON
    // -----------------------------------------------

    const favoriteButton =
        document.createElement(
            "button"
        );


    favoriteButton.type =
        "button";


    favoriteButton.className =
        "favorite-button";


    function updateFavoriteButton() {

        favoriteButton.textContent =
            isFavorite(resource.id)
            ? "⭐ Saved"
            : "☆ Save";

    }


    updateFavoriteButton();


    favoriteButton.addEventListener(
        "click",
        function() {

            toggleFavorite(
                resource
            );

        }
    );


    buttonContainer.appendChild(
        favoriteButton
    );


    item.appendChild(
        buttonContainer
    );


    return item;

}


// =====================================================
// SHOW RESOURCES
// =====================================================

function showResources() {

    const semesterElement =
        document.getElementById(
            "semester"
        );

    const subjectElement =
        document.getElementById(
            "subject"
        );

    const resourceList =
        document.getElementById(
            "resourceList"
        );

    const categoryBox =
        document.getElementById(
            "resourceCategories"
        );


    if (
        !semesterElement ||
        !subjectElement ||
        !resourceList
    ) {

        return;

    }


    const semester =
        semesterElement.value;


    const subject =
        subjectElement.value;


    resourceList.innerHTML =
        "";


    if (
        semester === "" ||
        subject === ""
    ) {

        if (categoryBox) {

            categoryBox.style.display =
                "none";

        }


        currentResourceCategory =
            "all";


        resetCategoryButtons();


        return;

    }


    // -----------------------------------------------
    // SHOW CATEGORY FILTERS
    // -----------------------------------------------

    if (categoryBox) {

        categoryBox.style.display =
            "flex";

    }


    currentResourceCategory =
        "all";


    resetCategoryButtons();


    // -----------------------------------------------
    // ADMIN RESOURCES
    // -----------------------------------------------

    let adminResources = [];


    const storedResources =
        localStorage.getItem(
            "college_resources"
        );


    if (storedResources) {

        try {

            adminResources =
                JSON.parse(
                    storedResources
                );

        }

        catch (error) {

            adminResources =
                [];

        }

    }


    const matchingResources =
        adminResources.filter(
            function(resource) {

                return (

                    resource.semester ===
                    semester &&

                    resource.subject ===
                    subject

                );

            }
        );


    matchingResources.forEach(
        function(resource) {

            const card =
                createResourceCard(
                    {
                        ...resource,

                        id:
                            "admin_" +
                            resource.id
                    }
                );


            resourceList.appendChild(
                card
            );

        }
    );


    // =================================================
    // DBMS
    // =================================================

    if (
        subject ===
        "DBMS"
    ) {

        const dbmsNotes = {

            id:
                "dbms_notes_unit_1",

            name:
                "DBMS Notes",

            semester:
                "3",

            subject:
                "DBMS",

            type:
                "notes",

            description:
                "Study notes for DBMS.",

            fileName:
                "dbms-unit-1.pdf",

            path:
                "resources/3rd-semesters/dbms/dbms-unit-1.pdf"

        };


        const dbmsLab = {

            id:
                "dbms_lab_programs",

            name:
                "DBMS Lab Programs",

            semester:
                "3",

            subject:
                "DBMS",

            type:
                "lab",

            description:
                "Complete DBMS laboratory programs.",

            fileName:
                "dbms-lab-programs.pdf",

            path:
                "resources/3rd-semesters/lab%20programs/dbms-lab-programs.pdf"

        };


        const dbmsPapers = {

            id:
                "dbms_question_papers",

            name:
                "DBMS Question Papers",

            semester:
                "3",

            subject:
                "DBMS",

            type:
                "papers",

            description:
                "Previous DBMS examination papers.",

            fileName:
                "dbms-question-papers.pdf",

            path:
                "resources/3rd-semesters/question%20papers/dbms-question-papers.pdf"

        };


        resourceList.appendChild(
            createResourceCard(
                dbmsNotes
            )
        );


        resourceList.appendChild(
            createResourceCard(
                dbmsLab
            )
        );


        resourceList.appendChild(
            createResourceCard(
                dbmsPapers
            )
        );

    }


    // =================================================
    // ARTIFICIAL INTELLIGENCE
    // =================================================

    if (
        subject ===
        "Artificial Intelligence"
    ) {

        const aiNotes = {

            id:
                "ai_notes_unit_1",

            name:
                "Artificial Intelligence Notes",

            semester:
                "3",

            subject:
                "Artificial Intelligence",

            type:
                "notes",

            description:
                "Study notes for Artificial Intelligence.",

            fileName:
                "ai-unit-1.pdf",

            path:
                "resources/3rd-semesters/ai/ai-unit-1.pdf"

        };


        const aiLab = {

            id:
                "ai_programs",

            name:
                "Artificial Intelligence Programs",

            semester:
                "3",

            subject:
                "Artificial Intelligence",

            type:
                "lab",

            description:
                "Artificial Intelligence laboratory programs.",

            fileName:
                "ai-programs.pdf",

            path:
                "resources/3rd-semesters/ai%20programs/ai-programs.pdf"

        };


        const aiPapers = {

            id:
                "ai_question_papers",

            name:
                "Artificial Intelligence Question Papers",

            semester:
                "3",

            subject:
                "Artificial Intelligence",

            type:
                "papers",

            description:
                "Previous Artificial Intelligence examination papers.",

            fileName:
                "ai-question-papers.pdf",

            path:
                "resources/3rd-semesters/question%20papers/ai-question-papers.pdf"

        };


        resourceList.appendChild(
            createResourceCard(
                aiNotes
            )
        );


        resourceList.appendChild(
            createResourceCard(
                aiLab
            )
        );


        resourceList.appendChild(
            createResourceCard(
                aiPapers
            )
        );

    }


    // -----------------------------------------------
    // APPLY CURRENT CATEGORY
    // -----------------------------------------------

    applyCategoryFilter();

}


// =====================================================
// CATEGORY FILTER
// =====================================================

function filterResourceCategory(
    category
) {

    currentResourceCategory =
        category;


    resetCategoryButtons();


    applyCategoryFilter();

}


// =====================================================
// RESET CATEGORY BUTTONS
// =====================================================

function resetCategoryButtons() {

    const buttons =
        document.querySelectorAll(
            ".category-button"
        );


    buttons.forEach(
        function(button) {

            button.classList.toggle(
                "active",
                button.dataset.category ===
                currentResourceCategory
            );

        }
    );

}


// =====================================================
// APPLY CATEGORY FILTER
// =====================================================

function applyCategoryFilter() {

    const resources =
        document.querySelectorAll(
            "#resourceList .resource-item"
        );


    resources.forEach(
        function(resource) {

            const type =
                resource.dataset.category ||
                "materials";


            if (

                currentResourceCategory ===
                "all" ||

                type ===
                currentResourceCategory

            ) {

                resource.style.display =
                    "";

            }

            else {

                resource.style.display =
                    "none";

            }

        }
    );

}


// =====================================================
// SEARCH RESOURCES
// =====================================================

function searchResources() {

    const searchInput =
        document.getElementById(
            "resourceSearch"
        );


    if (!searchInput) {

        return;

    }


    const searchText =
        searchInput.value
        .trim()
        .toLowerCase();


    const resourceItems =
        document.querySelectorAll(
            "#resourceList .resource-item"
        );


    resourceItems.forEach(
        function(item) {

            const itemText =
                item.textContent
                .toLowerCase();


            const category =
                item.dataset.category ||
                "materials";


            const matchesSearch =
                (
                    searchText === "" ||
                    itemText.includes(
                        searchText
                    )
                );


            const matchesCategory =
                (
                    currentResourceCategory ===
                    "all" ||
                    category ===
                    currentResourceCategory
                );


            if (
                matchesSearch &&
                matchesCategory
            ) {

                item.style.display =
                    "";

            }

            else {

                item.style.display =
                    "none";

            }

        }
    );

}


// =====================================================
// FILE MESSAGE
// =====================================================

function showFileMessage() {

    alert(
        "The resource information is available. The actual PDF link is used when a file is stored in the resources folder."
    );

}


// =====================================================
// COMING SOON
// =====================================================

function comingSoon() {

    alert(
        "Resources will be added soon!"
    );

}


// =====================================================
// LOGIN STATUS
// =====================================================

function updateLoginStatus() {

    const loginLink =
        document.getElementById(
            "loginLink"
        );


    const studentProfile =
        document.getElementById(
            "studentProfile"
        );


    const logoutButton =
        document.getElementById(
            "mainLogoutBtn"
        );


    const adminPanelLink =
        document.getElementById(
            "adminPanelLink"
        );


    const navStudentName =
        document.getElementById(
            "navStudentName"
        );


    const profileDisplayName =
        document.getElementById(
            "profileDisplayName"
        );


    const profileDisplayUsername =
        document.getElementById(
            "profileDisplayUsername"
        );


    const sessionUser =
        localStorage.getItem(
            "login_auth_session"
        );


    if (
        sessionUser
    ) {

        if (loginLink) {

            loginLink.style.display =
                "none";

        }


        if (studentProfile) {

            studentProfile.style.display =
                "inline-block";

        }


        if (logoutButton) {

            logoutButton.style.display =
                "inline-block";

        }


        if (adminPanelLink) {

            adminPanelLink.style.display =
                "none";

        }


        const storedUsers =
            localStorage.getItem(
                "login_auth_users"
            );


        if (storedUsers) {

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


                if (loggedUser) {

                    if (navStudentName) {

                        navStudentName.textContent =
                            loggedUser.name;

                    }


                    if (profileDisplayName) {

                        profileDisplayName.textContent =
                            loggedUser.name;

                    }


                    if (profileDisplayUsername) {

                        profileDisplayUsername.textContent =
                            loggedUser.username;

                    }


                    if (
                        (
                            loggedUser.username ||
                            ""
                        )
                        .toLowerCase() ===
                        "admin"
                    ) {

                        if (adminPanelLink) {

                            adminPanelLink.style.display =
                                "inline-block";

                        }

                    }

                }

            }

            catch (error) {

                console.log(
                    "Unable to load user information."
                );

            }

        }

    }

    else {

        if (loginLink) {

            loginLink.style.display =
                "inline-block";

        }


        if (studentProfile) {

            studentProfile.style.display =
                "none";

        }


        if (logoutButton) {

            logoutButton.style.display =
                "none";

        }


        if (adminPanelLink) {

            adminPanelLink.style.display =
                "none";

        }

    }

}


// =====================================================
// LOGOUT
// =====================================================

function mainLogout() {

    localStorage.removeItem(
        "login_auth_session"
    );


    localStorage.removeItem(
        "remembered_user"
    );


    window.location.href =
        "login.html";

}


// =====================================================
// PAGE START
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateLoginStatus();


        const logoutButton =
            document.getElementById(
                "mainLogoutBtn"
            );


        if (
            logoutButton
        ) {

            logoutButton.addEventListener(
                "click",
                mainLogout
            );

        }


        const profileButton =
            document.getElementById(
                "profileButton"
            );


        const profileDropdown =
            document.getElementById(
                "profileDropdown"
            );


        if (
            profileButton &&
            profileDropdown
        ) {

            profileButton.addEventListener(
                "click",
                function(event) {

                    event.stopPropagation();


                    profileDropdown.classList.toggle(
                        "show"
                    );

                }
            );


            document.addEventListener(
                "click",
                function(event) {

                    if (

                        !profileButton.contains(
                            event.target
                        ) &&

                        !profileDropdown.contains(
                            event.target
                        )

                    ) {

                        profileDropdown.classList.remove(
                            "show"
                        );

                    }

                }
            );

        }

    }
);
// =====================================================
// DARK / LIGHT THEME
// =====================================================

function applyTheme() {

    const savedTheme =
        localStorage.getItem(
            "college_theme"
        );

    const button =
        document.getElementById(
            "themeToggle"
        );


    if (
        savedTheme ===
        "dark"
    ) {

        document.body.classList.add(
            "dark-theme"
        );

        if (button) {

            button.textContent =
                "☀️ Light";

        }

    }

    else {

        document.body.classList.remove(
            "dark-theme"
        );

        if (button) {

            button.textContent =
                "🌙 Dark";

        }

    }

}


function toggleTheme() {

    const isDark =
        document.body.classList.toggle(
            "dark-theme"
        );


    localStorage.setItem(
        "college_theme",
        isDark
        ? "dark"
        : "light"
    );


    const button =
        document.getElementById(
            "themeToggle"
        );


    if (button) {

        button.textContent =
            isDark
            ? "☀️ Light"
            : "🌙 Dark";

    }

}


document.addEventListener(
    "DOMContentLoaded",
    function() {

        applyTheme();


        const themeButton =
            document.getElementById(
                "themeToggle"
            );


        if (themeButton) {

            themeButton.addEventListener(
                "click",
                toggleTheme
            );

        }

    }
);
// =====================================================
// PERMANENT 3RD SEMESTER ENGLISH RESOURCE
// =====================================================

if (!subjects["3"].includes("English")) {

    subjects["3"].push("English");

}


// =====================================================
// ENGLISH NOTES RESOURCE
// =====================================================

const originalShowResources =
    showResources;


showResources = function () {

    originalShowResources();


    const semesterElement =
        document.getElementById(
            "semester"
        );


    const subjectElement =
        document.getElementById(
            "subject"
        );


    const resourceList =
        document.getElementById(
            "resourceList"
        );


    if (
        !semesterElement ||
        !subjectElement ||
        !resourceList
    ) {

        return;

    }


    const semester =
        semesterElement.value;


    const subject =
        subjectElement.value;


    if (
        semester !== "3" ||
        subject !== "English"
    ) {

        return;

    }


    const englishNotes = {

        id:
            "english_notes",

        name:
            "English Notes",

        semester:
            "3",

        subject:
            "English",

        type:
            "notes",

        description:
            "3rd Semester English Study Notes.",

        fileName:
            "english-notes.pdf",

        path:
            "resources/3rd-semester/english/english-notes.pdf"

    };


    resourceList.appendChild(
        createResourceCard(
            englishNotes
        )
    );


    applyCategoryFilter();

};