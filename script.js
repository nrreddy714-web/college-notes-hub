// =====================================================
// COLLEGE NOTES HUB
// MAIN JAVASCRIPT
// =====================================================


// =====================================================
// SUBJECTS
// =====================================================

const subjects = {

    "1": [],

    "2": [],

    "3": [
        "DBMS",
        "Artificial Intelligence",
        "Probability and Statistics",
        "Feature Engineering",
        "English",
        "Indian Constitution Value 1"
    ],

    "4": [],

    "5": [],

    "6": []

};


// =====================================================
// CURRENT CATEGORY
// =====================================================

let currentResourceCategory = "all";


// =====================================================
// RESOURCE DATA
// =====================================================

const resources = [

    // =================================================
    // DBMS
    // =================================================

    {
        id: "dbms_notes",
        name: "DBMS Notes",
        semester: "3",
        subject: "DBMS",
        type: "notes",
        description: "Study notes for DBMS.",
        fileName: "dbms-unit-1.pdf",
        path: "resources/3rd-semester/dbms/dbms-unit-1.pdf"
    },

    {
        id: "dbms_unit_1_materials",
        name: "DBMS Study Materials - Unit 1",
        semester: "3",
        subject: "DBMS",
        type: "materials",
        description: "DBMS study materials for Unit 1.",
        fileName: "dbms-unit-1-materials.pdf",
        path: "resources/3rd-semester/dbms/dbms-unit-1-materials.pdf"
    },

    {
        id: "dbms_unit_2_materials",
        name: "DBMS Study Materials - Unit 2",
        semester: "3",
        subject: "DBMS",
        type: "materials",
        description: "DBMS study materials for Unit 2.",
        fileName: "dbms-unit-2-materials.pdf",
        path: "resources/3rd-semester/dbms/dbms-unit-2-materials.pdf"
    },

    {
        id: "dbms_unit_3_materials",
        name: "DBMS Study Materials - Unit 3",
        semester: "3",
        subject: "DBMS",
        type: "materials",
        description: "DBMS study materials for Unit 3.",
        fileName: "dbms-unit-3-materials.pdf",
        path: "resources/3rd-semester/dbms/dbms-unit-3-materials.pdf"
    },

    {
        id: "dbms_unit_4_materials",
        name: "DBMS Study Materials - Unit 4",
        semester: "3",
        subject: "DBMS",
        type: "materials",
        description: "DBMS study materials for Unit 4.",
        fileName: "dbms-unit-4-materials.pdf",
        path: "resources/3rd-semester/dbms/dbms-unit-4-materials.pdf"
    },

    {
        id: "dbms_lab_programs",
        name: "DBMS Lab Programs",
        semester: "3",
        subject: "DBMS",
        type: "lab",
        description: "Complete DBMS laboratory programs.",
        fileName: "dbms-lab-programs.pdf",
        path: "resources/3rd-semester/lab%20programs/dbms/dbms-lab-programs.pdf"
    },

    {
        id: "dbms_question_papers",
        name: "DBMS Question Papers",
        semester: "3",
        subject: "DBMS",
        type: "papers",
        description: "Previous DBMS examination papers.",
        fileName: "dbms-question-papers.pdf",
        path: "resources/3rd-semester/question%20papers/dbms/dbms-question-papers.pdf"
    },

    {
        id: "dbms_model_question_papers",
        name: "DBMS Model Question Papers",
        semester: "3",
        subject: "DBMS",
        type: "papers",
        description: "DBMS model question papers for exam preparation.",
        fileName: "dbms-model-question-papers.pdf",
        path: "resources/3rd-semester/question%20papers/dbms/dbms-model-question-papers.pdf"
    },


    // =================================================
    // ARTIFICIAL INTELLIGENCE
    // =================================================

    {
        id: "ai_notes_unit_1",
        name: "Artificial Intelligence Notes",
        semester: "3",
        subject: "Artificial Intelligence",
        type: "notes",
        description: "Study notes for Artificial Intelligence.",
        fileName: "ai-unit-1.pdf",
        path: "resources/3rd-semester/ai/ai-unit-1.pdf"
    },

    {
        id: "ai_chapter_3_4_notes",
        name: "AI Chapter 3 and 4 Notes",
        semester: "3",
        subject: "Artificial Intelligence",
        type: "notes",
        description: "Artificial Intelligence notes covering Chapter 3 and Chapter 4.",
        fileName: "ai-chapter-3-and-4-notes.pdf",
        path: "resources/3rd-semester/ai/ai-chapter-3-and-4-notes.pdf"
    },

    {
        id: "ai_syllabus_contents",
        name: "AI Syllabus and Contents",
        semester: "3",
        subject: "Artificial Intelligence",
        type: "notes",
        description: "Artificial Intelligence syllabus and course contents.",
        fileName: "ai-syllabus-and-contents.pdf",
        path: "resources/3rd-semester/ai/ai-syllabus-and-contents.pdf"
    },

    {
        id: "ai_unit_1_questions",
        name: "AI Unit 1 Questions",
        semester: "3",
        subject: "Artificial Intelligence",
        type: "notes",
        description: "Artificial Intelligence Unit 1 important questions.",
        fileName: "ai-unit-1-questions.pdf",
        path: "resources/3rd-semester/ai/ai-unit-1-questions.pdf"
    },

    {
        id: "ai_unit_1_materials",
        name: "AI Study Materials - Unit 1",
        semester: "3",
        subject: "Artificial Intelligence",
        type: "materials",
        description: "Artificial Intelligence study materials for Unit 1.",
        fileName: "ai-unit-1-materials.pdf",
        path: "resources/3rd-semester/ai/ai-unit-1-materials.pdf"
    },

    {
        id: "ai_unit_2_materials",
        name: "AI Study Materials - Unit 2",
        semester: "3",
        subject: "Artificial Intelligence",
        type: "materials",
        description: "Artificial Intelligence study materials for Unit 2.",
        fileName: "ai-unit-2-materials.pdf",
        path: "resources/3rd-semester/ai/ai-unit-2-materials.pdf"
    },

    {
        id: "ai_unit_3_materials",
        name: "AI Study Materials - Unit 3",
        semester: "3",
        subject: "Artificial Intelligence",
        type: "materials",
        description: "Artificial Intelligence study materials for Unit 3.",
        fileName: "ai-unit-3-materials.pdf",
        path: "resources/3rd-semester/ai/ai-unit-3-materials.pdf"
    },

    {
        id: "ai_unit_4_materials",
        name: "AI Study Materials - Unit 4",
        semester: "3",
        subject: "Artificial Intelligence",
        type: "materials",
        description: "Artificial Intelligence study materials for Unit 4.",
        fileName: "ai-unit-4-materials.pdf",
        path: "resources/3rd-semester/ai/ai-unit-4-materials.pdf"
    },

    {
        id: "ai_programs",
        name: "Artificial Intelligence Programs",
        semester: "3",
        subject: "Artificial Intelligence",
        type: "lab",
        description: "Artificial Intelligence laboratory programs.",
        fileName: "ai-programs.pdf",
        path: "resources/3rd-semester/ai%20programs/ai/ai-programs.pdf"
    },

    {
        id: "ai_question_papers",
        name: "Artificial Intelligence Question Papers",
        semester: "3",
        subject: "Artificial Intelligence",
        type: "papers",
        description: "Previous Artificial Intelligence examination papers.",
        fileName: "ai-question-papers.pdf",
        path: "resources/3rd-semester/question%20paper/ai/ai-question-papers.pdf"
    },

    {
        id: "ai_model_question_papers",
        name: "AI Model Question Papers",
        semester: "3",
        subject: "Artificial Intelligence",
        type: "papers",
        description: "Artificial Intelligence model question papers.",
        fileName: "ai-model-question-papers.pdf",
        path: "resources/3rd-semester/question%20papers/ai/ai-model-question-papers.pdf"
    },


    // =================================================
    // PROBABILITY AND STATISTICS
    // =================================================

    {
        id: "probability_assignment",
        name: "Probability and Statistics Assignment",
        semester: "3",
        subject: "Probability and Statistics",
        type: "notes",
        description: "3rd Semester Probability and Statistics Assignment.",
        fileName: "probability-statistics-assignment.pdf",
        path: "resources/3rd-semester/probability-statistics/probability-statistics-assignment.pdf"
    },

    {
        id: "probability_statistics_model_question_papers",
        name: "Probability and Statistics Model Question Papers",
        semester: "3",
        subject: "Probability and Statistics",
        type: "papers",
        description: "Probability and Statistics model question papers for exam preparation.",
        fileName: "probability-statistics-model-question-papers.pdf",
        path: "resources/3rd-semester/question%20papers/probability-statistics/probability-statistics-model-question-papers.pdf"
    },

    {
        id: "probability_statistics_unit_1_materials",
        name: "Probability and Statistics Study Materials - Unit 1",
        semester: "3",
        subject: "Probability and Statistics",
        type: "materials",
        description: "Probability and Statistics study materials for Unit 1.",
        fileName: "probability-statistics-unit-1-materials.pdf",
        path: "resources/3rd-semester/probability-statistics/probability-statistics-unit-1-materials.pdf"
    },

    {
        id: "probability_statistics_unit_2_materials",
        name: "Probability and Statistics Study Materials - Unit 2",
        semester: "3",
        subject: "Probability and Statistics",
        type: "materials",
        description: "Probability and Statistics study materials for Unit 2.",
        fileName: "probability-statistics-unit-2-materials.pdf",
        path: "resources/3rd-semester/probability-statistics/probability-statistics-unit-2-materials.pdf"
    },

    {
        id: "probability_statistics_unit_3_materials",
        name: "Probability and Statistics Study Materials - Unit 3",
        semester: "3",
        subject: "Probability and Statistics",
        type: "materials",
        description: "Probability and Statistics study materials for Unit 3.",
        fileName: "probability-statistics-unit-3-materials.pdf",
        path: "resources/3rd-semester/probability-statistics/probability-statistics-unit-3-materials.pdf"
    },

    {
        id: "probability_statistics_unit_4_materials",
        name: "Probability and Statistics Study Materials - Unit 4",
        semester: "3",
        subject: "Probability and Statistics",
        type: "materials",
        description: "Probability and Statistics study materials for Unit 4.",
        fileName: "probability-statistics-unit-4-materials.pdf",
        path: "resources/3rd-semester/probability-statistics/probability-statistics-unit-4-materials.pdf"
    },


    // =================================================
    // ENGLISH
    // =================================================

    {
        id: "english_notes",
        name: "English Notes",
        semester: "3",
        subject: "English",
        type: "notes",
        description: "3rd Semester English Study Notes.",
        fileName: "english-notes.pdf",
        path: "resources/3rd-semester/english/english-notes.pdf"
    },


    // =================================================
    // FEATURE ENGINEERING
    // =================================================

    {
        id: "feature_engineering_model_question_paper",
        name: "Feature Engineering Model Question Paper",
        semester: "3",
        subject: "Feature Engineering",
        type: "papers",
        description: "3rd Semester Feature Engineering model question paper.",
        fileName: "feature-engineering-model-question-paper.pdf",
        path: "resources/3rd-semester/question%20papers/feature-engineering/feature-engineering-model-question-paper.pdf"
    },


    // =================================================
    // INDIAN CONSTITUTION VALUE 1
    // =================================================

    {
        id: "indian_constitution_value_1_question_paper",
        name: "Indian Constitution Value 1 Question Paper",
        semester: "3",
        subject: "Indian Constitution Value 1",
        type: "papers",
        description: "3rd Semester Indian Constitution Value 1 question paper.",
        fileName: "indian-constitution-value-1-question-paper.pdf",
        path: "resources/3rd-semester/question%20papers/indian-constitution-value-1/indian-constitution-value-1-question-paper.pdf"
    },

    {
        id: "indian_constitution_value_1_unit_1_2_notes",
        name: "Indian Constitution Value 1 - Unit 1 & Unit 2 Notes",
        semester: "3",
        subject: "Indian Constitution Value 1",
        type: "notes",
        description: "Indian Constitution Value 1 study notes covering Unit 1 and Unit 2.",
        fileName: "indian-constitution-value-1-unit-1-and-2-notes.pdf",
        path: "resources/3rd-semester/indian-constitution-value-1/indian-constitution-value-1-unit-1-and-2-notes.pdf"
    }

];


// =====================================================
// LOGGED-IN USER
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
                    return user.name === sessionUser;
                }
            ) || null
        );

    } catch (error) {

        return null;

    }

}


// =====================================================
// FAVORITES
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


function getFavorites() {

    const key =
        getFavoritesKey();

    if (!key) {
        return [];
    }

    try {

        return JSON.parse(
            localStorage.getItem(key) || "[]"
        );

    } catch (error) {

        return [];

    }

}


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
        JSON.stringify(favorites)
    );

}


function isFavorite(
    resourceId
) {

    return getFavorites().some(
        function(item) {

            return (
                String(item.id) ===
                String(resourceId)
            );

        }
    );

}


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

    const index =
        favorites.findIndex(
            function(item) {

                return (
                    String(item.id) ===
                    String(resource.id)
                );

            }
        );


    if (index >= 0) {

        favorites.splice(
            index,
            1
        );

    } else {

        favorites.push(
            resource
        );

    }


    saveFavorites(
        favorites
    );

    showResources();

}


// =====================================================
// ADMIN RESOURCES
// =====================================================

function getAdminResources() {

    const stored =
        localStorage.getItem(
            "college_resources"
        );

    if (!stored) {
        return [];
    }

    try {

        const data =
            JSON.parse(
                stored
            );

        return Array.isArray(data)
            ? data
            : [];

    } catch (error) {

        return [];

    }

}


// =====================================================
// SUBJECT LIST
// =====================================================

function getAllSubjects(
    semester
) {

    const result = [
        ...(subjects[semester] || [])
    ];


    // Custom subjects

    try {

        const customSubjects =
            JSON.parse(
                localStorage.getItem(
                    "college_custom_subjects"
                ) || "{}"
            );


        const customList =
            customSubjects[semester] || [];


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

    } catch (error) {
        // Ignore invalid custom subject data
    }


    // Admin resource subjects

    getAdminResources().forEach(
        function(resource) {

            if (

                String(
                    resource.semester
                ) === String(
                    semester
                ) &&

                resource.subject &&

                !result.includes(
                    resource.subject
                )

            ) {

                result.push(
                    resource.subject
                );

            }

        }
    );


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


    subjectElement.disabled =
        true;


    resourceList.innerHTML =
        "";


    currentResourceCategory =
        "all";


    resetCategoryButtons();


    if (categoryBox) {

        categoryBox.style.display =
            "none";

    }


    if (!semester) {
        return;
    }


    const semesterSubjects =
        getAllSubjects(
            semester
        );


    semesterSubjects.forEach(
        function(subject) {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                subject;

            option.textContent =
                subject;

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


    // VERY IMPORTANT:
    // Store these values on the card
    // for subject-specific filtering.

    item.dataset.category =
        resource.type ||
        "materials";


    item.dataset.subject =
        resource.subject ||
        "";


    item.dataset.semester =
        String(
            resource.semester ||
            ""
        );


    // =================================================
    // ICON
    // =================================================

    let icon = "📚";


    if (
        resource.type ===
        "notes"
    ) {

        icon = "📖";

    } else if (
        resource.type ===
        "lab"
    ) {

        icon = "💻";

    } else if (
        resource.type ===
        "papers"
    ) {

        icon = "📄";

    }


    // =================================================
    // TITLE
    // =================================================

    const title =
        document.createElement(
            "h3"
        );

    title.textContent =
        icon +
        " " +
        (
            resource.name ||
            "Resource"
        );


    item.appendChild(
        title
    );


    // =================================================
    // DESCRIPTION
    // =================================================

    const description =
        document.createElement(
            "p"
        );

    description.textContent =
        resource.description ||
        (
            "Study resource for " +
            resource.subject
        );


    item.appendChild(
        description
    );


    // =================================================
    // FILE NAME
    // =================================================

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


    // =================================================
    // BUTTONS
    // =================================================

    const buttonContainer =
        document.createElement(
            "div"
        );


    if (
        resource.path
    ) {

        // VIEW

        const viewButton =
            document.createElement(
                "a"
            );

        viewButton.href =
            resource.path;

        viewButton.target =
            "_blank";

        viewButton.rel =
            "noopener noreferrer";

        viewButton.className =
            "resource-button";

        viewButton.textContent =
            "📖 View";


        buttonContainer.appendChild(
            viewButton
        );


        // DOWNLOAD

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


    // SAVE

    const favoriteButton =
        document.createElement(
            "button"
        );

    favoriteButton.type =
        "button";

    favoriteButton.className =
        "favorite-button";


    favoriteButton.textContent =
        isFavorite(
            resource.id
        )
        ? "⭐ Saved"
        : "☆ Save";


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


    const selectedSemester =
        semesterElement.value;


    const selectedSubject =
        subjectElement.value;


    resourceList.innerHTML =
        "";


    currentResourceCategory =
        currentResourceCategory ||
        "all";


    if (
        !selectedSemester ||
        !selectedSubject
    ) {

        if (categoryBox) {

            categoryBox.style.display =
                "none";

        }

        resetCategoryButtons();

        return;

    }


    if (categoryBox) {

        categoryBox.style.display =
            "flex";

    }


    // =================================================
    // STATIC RESOURCES
    // =================================================

    const staticResources =
        resources.filter(
            function(resource) {

                return (

                    String(
                        resource.semester
                    ) ===
                    String(
                        selectedSemester
                    ) &&

                    resource.subject ===
                    selectedSubject

                );

            }
        );


    // =================================================
    // ADMIN RESOURCES
    // =================================================

    const adminResources =
        getAdminResources().filter(
            function(resource) {

                return (

                    String(
                        resource.semester
                    ) ===
                    String(
                        selectedSemester
                    ) &&

                    resource.subject ===
                    selectedSubject

                );

            }
        );


    // =================================================
    // DISPLAY STATIC RESOURCES
    // =================================================

    staticResources.forEach(
        function(resource) {

            resourceList.appendChild(
                createResourceCard(
                    resource
                )
            );

        }
    );


    // =================================================
    // DISPLAY ADMIN RESOURCES
    // =================================================

    adminResources.forEach(
        function(resource) {

            const copy = {
                ...resource,

                id:
                    "admin_" +
                    resource.id
            };


            resourceList.appendChild(
                createResourceCard(
                    copy
                )
            );

        }
    );


    // =================================================
    // APPLY CATEGORY FILTER
    // =================================================

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

    const semesterElement =
        document.getElementById(
            "semester"
        );

    const subjectElement =
        document.getElementById(
            "subject"
        );


    if (
        !semesterElement ||
        !subjectElement
    ) {
        return;
    }


    const selectedSemester =
        semesterElement.value;


    const selectedSubject =
        subjectElement.value;


    const cards =
        document.querySelectorAll(
            "#resourceList .resource-item"
        );


    cards.forEach(
        function(card) {

            const cardSemester =
                String(
                    card.dataset.semester ||
                    ""
                );


            const cardSubject =
                card.dataset.subject ||
                "";


            const cardCategory =
                card.dataset.category ||
                "materials";


            const subjectMatches =
                (
                    cardSemester ===
                    String(
                        selectedSemester
                    ) &&

                    cardSubject ===
                    selectedSubject
                );


            const categoryMatches =
                (
                    currentResourceCategory ===
                    "all" ||

                    cardCategory ===
                    currentResourceCategory
                );


            if (
                subjectMatches &&
                categoryMatches
            ) {

                card.style.display =
                    "";

            } else {

                card.style.display =
                    "none";

            }

        }
    );

}


// =====================================================
// SEARCH
// =====================================================

function searchResources() {

    const searchInput =
        document.getElementById(
            "resourceSearch"
        );

    const semesterElement =
        document.getElementById(
            "semester"
        );

    const subjectElement =
        document.getElementById(
            "subject"
        );


    if (!searchInput) {
        return;
    }


    const searchText =
        searchInput.value
        .trim()
        .toLowerCase();


    const selectedSemester =
        semesterElement
        ? semesterElement.value
        : "";


    const selectedSubject =
        subjectElement
        ? subjectElement.value
        : "";


    const cards =
        document.querySelectorAll(
            "#resourceList .resource-item"
        );


    cards.forEach(
        function(card) {

            const cardText =
                card.textContent
                .toLowerCase();


            const cardSemester =
                String(
                    card.dataset.semester ||
                    ""
                );


            const cardSubject =
                card.dataset.subject ||
                "";


            const cardCategory =
                card.dataset.category ||
                "materials";


            const subjectMatches =
                (
                    cardSemester ===
                    String(
                        selectedSemester
                    ) &&

                    cardSubject ===
                    selectedSubject
                );


            const categoryMatches =
                (
                    currentResourceCategory ===
                    "all" ||

                    cardCategory ===
                    currentResourceCategory
                );


            const searchMatches =
                (
                    searchText === "" ||

                    cardText.includes(
                        searchText
                    )
                );


            if (
                subjectMatches &&
                categoryMatches &&
                searchMatches
            ) {

                card.style.display =
                    "";

            } else {

                card.style.display =
                    "none";

            }

        }
    );

}


// =====================================================
// THEME
// =====================================================

function applyTheme() {

    const button =
        document.getElementById(
            "themeToggle"
        );


    const savedTheme =
        localStorage.getItem(
            "college_theme"
        ) || "light";


    if (
        savedTheme ===
        "dark"
    ) {

        document.body.classList.add(
            "dark-theme"
        );

        document.body.classList.remove(
            "light-theme"
        );


        if (button) {

            button.textContent =
                "☀️ Light";

        }

    } else {

        document.body.classList.remove(
            "dark-theme"
        );

        document.body.classList.add(
            "light-theme"
        );


        if (button) {

            button.textContent =
                "🌙 Dark";

        }

    }

}


function toggleTheme() {

    const isDark =
        document.body.classList.contains(
            "dark-theme"
        );


    localStorage.setItem(
        "college_theme",
        isDark
            ? "light"
            : "dark"
    );


    applyTheme();

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


    if (!sessionUser) {

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

        return;

    }


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


    const storedUsers =
        localStorage.getItem(
            "login_auth_users"
        );


    if (!storedUsers) {
        return;
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


        if (!loggedUser) {
            return;
        }


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
            adminPanelLink &&
            loggedUser.username &&
            loggedUser.username
            .toLowerCase() ===
            "admin"
        ) {

            adminPanelLink.style.display =
                "inline-block";

        } else if (adminPanelLink) {

            adminPanelLink.style.display =
                "none";

        }

    } catch (error) {

        console.log(
            "Unable to load user."
        );

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
// SCROLL HERO
// =====================================================

function setupScrollHero() {

    const hero =
        document.querySelector(
            ".scroll-hero"
        );


    const content =
        document.querySelector(
            ".scroll-content"
        );


    const person =
        document.querySelector(
            ".scroll-person"
        );


    const notes =
        document.querySelector(
            ".notes-card"
        );


    const labs =
        document.querySelector(
            ".lab-card"
        );


    const papers =
        document.querySelector(
            ".paper-card"
        );


    const materials =
        document.querySelector(
            ".material-card"
        );


    const finalSection =
        document.querySelector(
            ".scroll-final"
        );


    const indicator =
        document.querySelector(
            ".scroll-indicator"
        );


    if (
        !hero ||
        !content ||
        !person
    ) {

        return;

    }


    function updateScrollAnimation() {

        const rect =
            hero.getBoundingClientRect();


        const total =
            hero.offsetHeight -
            window.innerHeight;


        if (
            total <= 0
        ) {

            return;

        }


        let progress =
            -rect.top /
            total;


        progress =
            Math.max(
                0,
                Math.min(
                    1,
                    progress
                )
            );


        // TEXT

        if (
            progress < 0.18
        ) {

            const fade =
                1 -
                (
                    progress /
                    0.18
                );


            content.style.opacity =
                fade;


            content.style.transform =
                `
                translateY(
                    ${progress * -100}px
                )
                `;

        } else {

            content.style.opacity =
                "0";

        }


        // PERSON

        const personProgress =
            Math.min(
                1,
                progress /
                0.35
            );


        person.style.left =
            `${-200 + (
                personProgress *
                420
            )}px`;


        person.style.transform =
            `
            translateY(
                ${
                    Math.sin(
                        personProgress *
                        Math.PI *
                        4
                    ) * -8
                }px
            )
            `;


        // NOTES

        if (notes) {

            if (
                progress > 0.25
            ) {

                const p =
                    Math.min(
                        1,
                        (
                            progress -
                            0.25
                        ) /
                        0.15
                    );


                notes.style.opacity =
                    p;


                notes.style.transform =
                    `
                    translateX(
                        ${
                            -120 +
                            (
                                120 *
                                p
                            )
                        }px
                    )
                    rotate(
                        ${
                            -8 +
                            (
                                8 *
                                p
                            )
                        }deg
                    )
                    `;

            } else {

                notes.style.opacity =
                    "0";

            }

        }


        // LAB

        if (labs) {

            if (
                progress > 0.38
            ) {

                const p =
                    Math.min(
                        1,
                        (
                            progress -
                            0.38
                        ) /
                        0.15
                    );


                labs.style.opacity =
                    p;


                labs.style.transform =
                    `
                    translateX(
                        ${
                            120 -
                            (
                                120 *
                                p
                            )
                        }px
                    )
                    rotate(
                        ${
                            8 -
                            (
                                8 *
                                p
                            )
                        }deg
                    )
                    `;

            } else {

                labs.style.opacity =
                    "0";

            }

        }


        // PAPERS

        if (papers) {

            if (
                progress > 0.52
            ) {

                const p =
                    Math.min(
                        1,
                        (
                            progress -
                            0.52
                        ) /
                        0.15
                    );


                papers.style.opacity =
                    p;


                papers.style.transform =
                    `
                    translateX(
                        ${
                            -120 +
                            (
                                120 *
                                p
                            )
                        }px
                    )
                    translateY(
                        ${
                            50 -
                            (
                                50 *
                                p
                            )
                        }px
                    )
                    `;

            } else {

                papers.style.opacity =
                    "0";

            }

        }


        // MATERIALS

        if (materials) {

            if (
                progress > 0.65
            ) {

                const p =
                    Math.min(
                        1,
                        (
                            progress -
                            0.65
                        ) /
                        0.15
                    );


                materials.style.opacity =
                    p;


                materials.style.transform =
                    `
                    translateX(
                        ${
                            120 -
                            (
                                120 *
                                p
                            )
                        }px
                    )
                    translateY(
                        ${
                            50 -
                            (
                                50 *
                                p
                            )
                        }px
                    )
                    `;

            } else {

                materials.style.opacity =
                    "0";

            }

        }


        // FINAL

        if (finalSection) {

            if (
                progress > 0.80
            ) {

                const p =
                    Math.min(
                        1,
                        (
                            progress -
                            0.80
                        ) /
                        0.20
                    );


                finalSection.style.opacity =
                    p;


                finalSection.style.transform =
                    `
                    translateY(
                        ${
                            60 -
                            (
                                60 *
                                p
                            )
                        }px
                    )
                    `;

            } else {

                finalSection.style.opacity =
                    "0";

            }

        }


        // INDICATOR

        if (indicator) {

            indicator.style.opacity =
                progress > 0.10
                    ? "0"
                    : "1";

        }

    }


    window.addEventListener(
        "scroll",
        updateScrollAnimation,
        {
            passive: true
        }
    );


    updateScrollAnimation();

}


// =====================================================
// INITIALIZATION
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        // Login status

        updateLoginStatus();


        // Logout

        const logoutButton =
            document.getElementById(
                "mainLogoutBtn"
            );


        if (logoutButton) {

            logoutButton.addEventListener(
                "click",
                mainLogout
            );

        }


        // Profile dropdown

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


        // Theme

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


        // Scroll hero

        setupScrollHero();

    }
);