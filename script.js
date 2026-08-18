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
        "Feature Engineering",
        "English",
        "Indian Constitution Value 1"
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
        existingIndex !== -1
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


    // =================================================
    // ADD SUBJECTS FROM ADMIN RESOURCES
    // =================================================

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


    // =================================================
    // NO SUBJECTS
    // =================================================

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


    // =================================================
    // ADD SUBJECT OPTIONS
    // =================================================

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
        resource.type ||
        "materials";


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
            (
                resource.subject ||
                ""
            )
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


    const buttonContainer =
        document.createElement(
            "div"
        );


    // =================================================
    // VIEW / DOWNLOAD
    // =================================================

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

        viewButton.rel =
            "noopener";

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


    // =================================================
    // FAVORITE BUTTON
    // =================================================

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
            isFavorite(
                resource.id
            )
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


    // =================================================
    // SHOW CATEGORY FILTERS
    // =================================================

    if (categoryBox) {

        categoryBox.style.display =
            "flex";

    }


    currentResourceCategory =
        "all";

    resetCategoryButtons();


    // =================================================
    // ADMIN RESOURCES
    // =================================================

    let adminResources =
        [];


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

            resourceList.appendChild(

                createResourceCard(
                    {
                        ...resource,

                        id:
                            "admin_" +
                            resource.id

                    }
                )

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
                "resources/3rd-semester/dbms/dbms-unit-1.pdf"

        };


        const dbmsUnit1Materials = {

            id:
                "dbms_unit_1_materials",

            name:
                "DBMS Study Materials - Unit 1",

            semester:
                "3",

            subject:
                "DBMS",

            type:
                "materials",

            description:
                "DBMS study materials for Unit 1.",

            fileName:
                "dbms-unit-1-materials.pdf",

            path:
                "resources/3rd-semester/dbms/dbms-unit-1-materials.pdf"

        };


        const dbmsUnit2Materials = {

            id:
                "dbms_unit_2_materials",

            name:
                "DBMS Study Materials - Unit 2",

            semester:
                "3",

            subject:
                "DBMS",

            type:
                "materials",

            description:
                "DBMS study materials for Unit 2.",

            fileName:
                "dbms-unit-2-materials.pdf",

            path:
                "resources/3rd-semester/dbms/dbms-unit-2-materials.pdf"

        };


        const dbmsUnit3Materials = {

            id:
                "dbms_unit_3_materials",

            name:
                "DBMS Study Materials - Unit 3",

            semester:
                "3",

            subject:
                "DBMS",

            type:
                "materials",

            description:
                "DBMS study materials for Unit 3.",

            fileName:
                "dbms-unit-3-materials.pdf",

            path:
                "resources/3rd-semester/dbms/dbms-unit-3-materials.pdf"

        };


        const dbmsUnit4Materials = {

            id:
                "dbms_unit_4_materials",

            name:
                "DBMS Study Materials - Unit 4",

            semester:
                "3",

            subject:
                "DBMS",

            type:
                "materials",

            description:
                "DBMS study materials for Unit 4.",

            fileName:
                "dbms-unit-4-materials.pdf",

            path:
                "resources/3rd-semester/dbms/dbms-unit-4-materials.pdf"

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
                "resources/3rd-semester/lab%20programs/dbms/dbms-lab-programs.pdf"

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
                "resources/3rd-semester/question%20papers/dbms/dbms-question-papers.pdf"

        };


        const dbmsModelQuestionPapers = {

            id:
                "dbms_model_question_papers",

            name:
                "DBMS Model Question Papers",

            semester:
                "3",

            subject:
                "DBMS",

            type:
                "papers",

            description:
                "DBMS model question papers for exam preparation.",

            fileName:
                "dbms-model-question-papers.pdf",

            path:
                "resources/3rd-semester/question%20papers/dbms/dbms-model-question-papers.pdf"

        };


        resourceList.appendChild(
            createResourceCard(
                dbmsNotes
            )
        );


        resourceList.appendChild(
            createResourceCard(
                dbmsUnit1Materials
            )
        );


        resourceList.appendChild(
            createResourceCard(
                dbmsUnit2Materials
            )
        );


        resourceList.appendChild(
            createResourceCard(
                dbmsUnit3Materials
            )
        );


        resourceList.appendChild(
            createResourceCard(
                dbmsUnit4Materials
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


        resourceList.appendChild(
            createResourceCard(
                dbmsModelQuestionPapers
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
                "resources/3rd-semester/ai/ai-unit-1.pdf"

        };


        const aiChapter3And4Notes = {

            id:
                "ai_chapter_3_and_4_notes",

            name:
                "AI Chapter 3 and 4 Notes",

            semester:
                "3",

            subject:
                "Artificial Intelligence",

            type:
                "notes",

            description:
                "Artificial Intelligence notes covering Chapter 3 and Chapter 4.",

            fileName:
                "ai-chapter-3-and-4-notes.pdf",

            path:
                "resources/3rd-semester/ai/ai-chapter-3-and-4-notes.pdf"

        };


        const aiSyllabusAndContents = {

            id:
                "ai_syllabus_and_contents",

            name:
                "AI Syllabus and Contents",

            semester:
                "3",

            subject:
                "Artificial Intelligence",

            type:
                "notes",

            description:
                "Artificial Intelligence syllabus and course contents.",

            fileName:
                "ai-syllabus-and-contents.pdf",

            path:
                "resources/3rd-semester/ai/ai-syllabus-and-contents.pdf"

        };


        const aiUnit1Questions = {

            id:
                "ai_unit_1_questions",

            name:
                "AI Unit 1 Questions",

            semester:
                "3",

            subject:
                "Artificial Intelligence",

            type:
                "notes",

            description:
                "Artificial Intelligence Unit 1 important questions.",

            fileName:
                "ai-unit-1-questions.pdf",

            path:
                "resources/3rd-semester/ai/ai-unit-1-questions.pdf"

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
                "resources/3rd-semester/ai%20programs/ai/ai-programs.pdf"

        };


        const aiQuestionPapers = {

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
                "resources/3rd-semester/question%20paper/ai/ai-question-papers.pdf"

        };


        const aiModelQuestionPapers = {

            id:
                "ai_model_question_papers",

            name:
                "AI Model Question Papers",

            semester:
                "3",

            subject:
                "Artificial Intelligence",

            type:
                "papers",

            description:
                "Artificial Intelligence model question papers for exam preparation.",

            fileName:
                "ai-model-question-papers.pdf",

            path:
                "resources/3rd-semester/question%20papers/ai/ai-model-question-papers.pdf"

        };


        resourceList.appendChild(
            createResourceCard(
                aiNotes
            )
        );


        resourceList.appendChild(
            createResourceCard(
                aiChapter3And4Notes
            )
        );


        resourceList.appendChild(
            createResourceCard(
                aiSyllabusAndContents
            )
        );


        resourceList.appendChild(
            createResourceCard(
                aiUnit1Questions
            )
        );


        resourceList.appendChild(
            createResourceCard(
                aiLab
            )
        );


        resourceList.appendChild(
            createResourceCard(
                aiQuestionPapers
            )
        );


        resourceList.appendChild(
            createResourceCard(
                aiModelQuestionPapers
            )
        );

    }
    // ---------------------------------------------
// AI STUDY MATERIAL - UNIT 1
// ---------------------------------------------

const aiUnit1Materials = {

    id:
        "ai_unit_1_materials",

    name:
        "AI Study Materials - Unit 1",

    semester:
        "3",

    subject:
        "Artificial Intelligence",

    type:
        "materials",

    description:
        "Artificial Intelligence study materials for Unit 1.",

    fileName:
        "ai-unit-1-materials.pdf",

    path:
        "resources/3rd-semester/ai/ai-unit-1-materials.pdf"

};


// ---------------------------------------------
// AI STUDY MATERIAL - UNIT 2
// ---------------------------------------------

const aiUnit2Materials = {

    id:
        "ai_unit_2_materials",

    name:
        "AI Study Materials - Unit 2",

    semester:
        "3",

    subject:
        "Artificial Intelligence",

    type:
        "materials",

    description:
        "Artificial Intelligence study materials for Unit 2.",

    fileName:
        "ai-unit-2-materials.pdf",

    path:
        "resources/3rd-semester/ai/ai-unit-2-materials.pdf"

};


// ---------------------------------------------
// AI STUDY MATERIAL - UNIT 3
// ---------------------------------------------

const aiUnit3Materials = {

    id:
        "ai_unit_3_materials",

    name:
        "AI Study Materials - Unit 3",

    semester:
        "3",

    subject:
        "Artificial Intelligence",

    type:
        "materials",

    description:
        "Artificial Intelligence study materials for Unit 3.",

    fileName:
        "ai-unit-3-materials.pdf",

    path:
        "resources/3rd-semester/ai/ai-unit-3-materials.pdf"

};


// ---------------------------------------------
// AI STUDY MATERIAL - UNIT 4
// ---------------------------------------------

const aiUnit4Materials = {

    id:
        "ai_unit_4_materials",

    name:
        "AI Study Materials - Unit 4",

    semester:
        "3",

    subject:
        "Artificial Intelligence",

    type:
        "materials",

    description:
        "Artificial Intelligence study materials for Unit 4.",

    fileName:
        "ai-unit-4-materials.pdf",

    path:
        "resources/3rd-semester/ai/ai-unit-4-materials.pdf"
};
resourceList.appendChild(
    createResourceCard(
        aiUnit1Materials
    )
);

resourceList.appendChild(
    createResourceCard(
        aiUnit2Materials
    )
);

resourceList.appendChild(
    createResourceCard(
        aiUnit3Materials
    )
);

resourceList.appendChild(
    createResourceCard(
        aiUnit4Materials
    )
);


    // =================================================
    // PROBABILITY AND STATISTICS
    // =================================================

    if (
        subject ===
        "Probability and Statistics"
    ) {

        const probabilityAssignment = {

            id:
                "probability_statistics_assignment",

            name:
                "Probability and Statistics Assignment",

            semester:
                "3",

            subject:
                "Probability and Statistics",

            type:
                "notes",

            description:
                "3rd Semester Probability and Statistics Assignment.",

            fileName:
                "probability-statistics-assignment.pdf",

            path:
                "resources/3rd-semester/probability-statistics/probability-statistics-assignment.pdf"

        };


        resourceList.appendChild(
            createResourceCard(
                probabilityAssignment
            )
        );

    }


    // =================================================
    // ENGLISH
    // =================================================

    if (
        subject ===
        "English"
    ) {

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

    }


    // =================================================
    // FEATURE ENGINEERING
    // =================================================

    if (
        subject ===
        "Feature Engineering"
    ) {

        const featureEngineeringModelPaper = {

            id:
                "feature_engineering_model_question_paper",

            name:
                "Feature Engineering Model Question Paper",

            semester:
                "3",

            subject:
                "Feature Engineering",

            type:
                "papers",

            description:
                "3rd Semester Feature Engineering model question paper.",

            fileName:
                "feature-engineering-model-question-paper.pdf",

            path:
                "resources/3rd-semester/question%20papers/feature-engineering/feature-engineering-model-question-paper.pdf"

        };


        resourceList.appendChild(
            createResourceCard(
                featureEngineeringModelPaper
            )
        );

    }


    // =================================================
    // INDIAN CONSTITUTION VALUE 1
    // =================================================

    if (
        subject ===
        "Indian Constitution Value 1"
    ) {

        const indianConstitutionQuestionPaper = {

            id:
                "indian_constitution_value_1_question_paper",

            name:
                "Indian Constitution Value 1 Question Paper",

            semester:
                "3",

            subject:
                "Indian Constitution Value 1",

            type:
                "papers",

            description:
                "3rd Semester Indian Constitution Value 1 question paper.",

            fileName:
                "indian-constitution-value-1-question-paper.pdf",

            path:
                "resources/3rd-semester/question%20papers/indian-constitution-value-1/indian-constitution-value-1-question-paper.pdf"

        };


        resourceList.appendChild(
            createResourceCard(
                indianConstitutionQuestionPaper
            )
        );

    }


    // =================================================
    // APPLY CURRENT CATEGORY
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
        "Please make sure the PDF is stored in the resources folder."
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
// DARK / LIGHT THEME
// =====================================================

function applyTheme() {

    const savedTheme =
        localStorage.getItem(
            "college_theme"
        ) || "light";

    const button =
        document.getElementById(
            "themeToggle"
        );


    if (
        savedTheme === "dark"
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

    }

    else {

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


    if (isDark) {

        localStorage.setItem(
            "college_theme",
            "light"
        );

    }

    else {

        localStorage.setItem(
            "college_theme",
            "dark"
        );

    }


    applyTheme();

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


        applyTheme();


        const themeButton =
            document.getElementById(
                "themeToggle"
            );


        if (
            themeButton
        ) {

            themeButton.addEventListener(
                "click",
                toggleTheme
            );

        }

    }
);
// =====================================================
// SCROLL CONTROLLED HERO ANIMATION
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

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


            // ---------------------------------------------
            // TEXT
            // ---------------------------------------------

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

            }

            else {

                content.style.opacity =
                    "0";

            }


            // ---------------------------------------------
            // PERSON
            // ---------------------------------------------

            const personProgress =
                Math.min(
                    1,
                    progress /
                    0.35
                );


            person.style.left =
                `${-200 + (personProgress * 420)}px`;


            person.style.transform =
                `
                translateY(
                    ${Math.sin(personProgress * Math.PI * 4) * -8}px
                )
                `;


            // ---------------------------------------------
            // NOTES
            // ---------------------------------------------

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
                        ${-120 + (120 * p)}px
                    )
                    rotate(
                        ${-8 + (8 * p)}deg
                    )
                    `;

            }


            // ---------------------------------------------
            // LAB
            // ---------------------------------------------

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
                        ${120 - (120 * p)}px
                    )
                    rotate(
                        ${8 - (8 * p)}deg
                    )
                    `;

            }


            // ---------------------------------------------
            // QUESTION PAPERS
            // ---------------------------------------------

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
                        ${-120 + (120 * p)}px
                    )
                    translateY(
                        ${50 - (50 * p)}px
                    )
                    `;

            }


            // ---------------------------------------------
            // STUDY MATERIALS
            // ---------------------------------------------

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
                        ${120 - (120 * p)}px
                    )
                    translateY(
                        ${50 - (50 * p)}px
                    )
                    `;

            }


            // ---------------------------------------------
            // FINAL MESSAGE
            // ---------------------------------------------

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
                        ${60 - (60 * p)}px
                    )
                    `;

            }

            else {

                finalSection.style.opacity =
                    "0";

            }


            // ---------------------------------------------
            // SCROLL INDICATOR
            // ---------------------------------------------

            if (
                indicator
            ) {

                indicator.style.opacity =
                    progress >
                    0.10
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
);