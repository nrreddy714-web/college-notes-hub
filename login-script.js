// =====================================================
// COLLEGE NOTES HUB - LOGIN SCRIPT
// =====================================================


// =====================================================
// STORAGE KEYS
// =====================================================

const USERS_KEY =
    "login_auth_users";

const SESSION_KEY =
    "login_auth_session";

const REMEMBER_KEY =
    "remembered_user";


// =====================================================
// VARIABLES
// =====================================================

let generatedOtp = null;

let otpUser = null;


// =====================================================
// GET USERS
// =====================================================

function getUsers() {

    const storedUsers =
        localStorage.getItem(
            USERS_KEY
        );


    if (!storedUsers) {

        return [];

    }


    try {

        const users =
            JSON.parse(
                storedUsers
            );


        return Array.isArray(users)
            ? users
            : [];

    }

    catch (error) {

        console.error(
            "Error reading users:",
            error
        );

        return [];

    }

}


// =====================================================
// SAVE USERS
// =====================================================

function saveUsers(users) {

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );

}


// =====================================================
// SHOW MESSAGE
// =====================================================

function setMessage(
    element,
    text,
    type
) {

    if (!element) {

        return;

    }


    element.textContent =
        text;


    element.className =
        "login-message " +
        type;

}


// =====================================================
// SHOW LOGIN CARD
// =====================================================

function showLoginCard() {

    const loginForm =
        document.getElementById(
            "loginForm"
        );


    const registerCard =
        document.getElementById(
            "registerCard"
        );


    const otpCard =
        document.getElementById(
            "otpCard"
        );


    if (loginForm) {

        loginForm.closest(
            ".login-card"
        ).style.display =
            "block";

    }


    if (registerCard) {

        registerCard.style.display =
            "none";

    }


    if (otpCard) {

        otpCard.style.display =
            "none";

    }

}


// =====================================================
// SHOW REGISTER CARD
// =====================================================

function showRegisterCard() {

    const loginForm =
        document.getElementById(
            "loginForm"
        );


    const registerCard =
        document.getElementById(
            "registerCard"
        );


    const otpCard =
        document.getElementById(
            "otpCard"
        );


    if (loginForm) {

        loginForm.closest(
            ".login-card"
        ).style.display =
            "none";

    }


    if (registerCard) {

        registerCard.style.display =
            "block";

    }


    if (otpCard) {

        otpCard.style.display =
            "none";

    }

}


// =====================================================
// SHOW OTP CARD
// =====================================================

function showOtpCard() {

    const loginForm =
        document.getElementById(
            "loginForm"
        );


    const registerCard =
        document.getElementById(
            "registerCard"
        );


    const otpCard =
        document.getElementById(
            "otpCard"
        );


    if (loginForm) {

        loginForm.closest(
            ".login-card"
        ).style.display =
            "none";

    }


    if (registerCard) {

        registerCard.style.display =
            "none";

    }


    if (otpCard) {

        otpCard.style.display =
            "block";

    }

}


// =====================================================
// WELCOME ANIMATION
// =====================================================

function showWelcomeAnimation() {

    const welcomeOverlay =
        document.getElementById(
            "welcomeOverlay"
        );


    // If overlay is missing,
    // go directly to dashboard.

    if (!welcomeOverlay) {

        redirectAfterLogin();

        return;

    }


    welcomeOverlay.style.display =
        "flex";


    welcomeOverlay.style.opacity =
        "1";


    welcomeOverlay.style.transition =
        "opacity 0.4s ease";


    // Keep welcome screen visible
    // for about 2.3 seconds.

    setTimeout(
        function() {

            welcomeOverlay.style.opacity =
                "0";


            setTimeout(
                function() {

                    redirectAfterLogin();

                },
                400
            );

        },
        2300
    );

}


// =====================================================
// REDIRECT AFTER LOGIN
// =====================================================

function redirectAfterLogin() {

    if (!otpUser) {

        window.location.href =
            "index.html";

        return;

    }


    const username =
        (
            otpUser.username ||
            ""
        )
        .toLowerCase();


    // Administrator

    if (
        username ===
        "admin"
    ) {

        window.location.href =
            "admin.html";

        return;

    }


    // Normal student

    window.location.href =
        "student-dashboard.html";

}


// =====================================================
// LOGIN FORM
// =====================================================

const loginForm =
    document.getElementById(
        "loginForm"
    );


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const username =
                document
                .getElementById(
                    "loginUsername"
                )
                .value
                .trim();


            const password =
                document
                .getElementById(
                    "loginPassword"
                )
                .value;


            const message =
                document.getElementById(
                    "loginMessage"
                );


            // Check empty fields

            if (
                !username ||
                !password
            ) {

                setMessage(
                    message,
                    "Please enter username and password.",
                    "error"
                );

                return;

            }


            const users =
                getUsers();


            // Find user

            const user =
                users.find(
                    function(item) {

                        return (

                            (
                                item.username ||
                                ""
                            )
                            .toLowerCase() ===
                            username.toLowerCase()

                            &&

                            item.password ===
                            password

                        );

                    }
                );


            // Invalid login

            if (!user) {

                setMessage(
                    message,
                    "Invalid username or password.",
                    "error"
                );

                return;

            }


            // =================================================
            // GENERATE OTP
            // =================================================

            generatedOtp =
                String(
                    Math.floor(
                        100000 +
                        Math.random() *
                        900000
                    )
                );


            otpUser =
                user;


            const otpDisplay =
                document.getElementById(
                    "otpDisplay"
                );


            const otpInput =
                document.getElementById(
                    "otpInput"
                );


            const otpMessage =
                document.getElementById(
                    "otpMessage"
                );


            if (otpDisplay) {

                otpDisplay.textContent =
                    generatedOtp;

            }


            if (otpInput) {

                otpInput.value =
                    "";

                otpInput.focus();

            }


            if (otpMessage) {

                otpMessage.textContent =
                    "";

                otpMessage.className =
                    "login-message";

            }


            // Show OTP

            showOtpCard();

        }
    );

}


// =====================================================
// OTP FORM
// =====================================================

const otpForm =
    document.getElementById(
        "otpForm"
    );


if (otpForm) {

    otpForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const input =
                document
                .getElementById(
                    "otpInput"
                )
                .value
                .trim();


            const message =
                document.getElementById(
                    "otpMessage"
                );


            // Check user

            if (!otpUser) {

                setMessage(
                    message,
                    "Login session expired. Please login again.",
                    "error"
                );

                return;

            }


            // Check OTP exists

            if (!generatedOtp) {

                setMessage(
                    message,
                    "OTP is not available. Please login again.",
                    "error"
                );

                return;

            }


            // Check OTP

            if (
                input !==
                generatedOtp
            ) {

                setMessage(
                    message,
                    "Incorrect OTP. Please try again.",
                    "error"
                );

                return;

            }


            // =================================================
            // LOGIN SUCCESS
            // =================================================

            localStorage.setItem(
                SESSION_KEY,
                otpUser.name
            );


            localStorage.setItem(
                REMEMBER_KEY,
                otpUser.username
            );


            setMessage(
                message,
                "✅ Login successful!",
                "success"
            );


            // =================================================
            // WELCOME ANIMATION
            // =================================================

            showWelcomeAnimation();

        }
    );

}
// =================================================
// WELCOME ANIMATION
// =================================================

function showWelcomeAnimation() {

    const welcomeOverlay =
        document.getElementById(
            "welcomeOverlay"
        );


    if (!welcomeOverlay) {

        redirectAfterLogin();

        return;

    }


    welcomeOverlay.style.display =
        "flex";

    welcomeOverlay.style.opacity =
        "1";

    welcomeOverlay.style.transition =
        "opacity 0.4s ease";


    setTimeout(
        function() {

            welcomeOverlay.style.opacity =
                "0";


            setTimeout(
                function() {

                    redirectAfterLogin();

                },
                400
            );

        },
        2300
    );

}


// =================================================
// REDIRECT AFTER LOGIN
// =================================================

function redirectAfterLogin() {

    if (!otpUser) {

        window.location.href =
            "index.html";

        return;

    }


    const username =
        (
            otpUser.username ||
            ""
        )
        .toLowerCase();


    if (
        username === "admin"
    ) {

        window.location.href =
            "admin.html";

    }

    else {

        window.location.href =
            "student-dashboard.html";

    }

}


// =====================================================
// REGISTER FORM
// =====================================================

const registerForm =
    document.getElementById(
        "registerForm"
    );


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document
                .getElementById(
                    "registerName"
                )
                .value
                .trim();


            const username =
                document
                .getElementById(
                    "registerUsername"
                )
                .value
                .trim();


            const email =
                document
                .getElementById(
                    "registerEmail"
                )
                .value
                .trim();


            const password =
                document
                .getElementById(
                    "registerPassword"
                )
                .value;


            const confirmPassword =
                document
                .getElementById(
                    "registerConfirmPassword"
                )
                .value;


            const message =
                document.getElementById(
                    "registerMessage"
                );


            // =================================================
            // VALIDATION
            // =================================================

            if (
                !name ||
                !username ||
                !email ||
                !password ||
                !confirmPassword
            ) {

                setMessage(
                    message,
                    "Please fill in all fields.",
                    "error"
                );

                return;

            }


            if (
                password !==
                confirmPassword
            ) {

                setMessage(
                    message,
                    "Passwords do not match.",
                    "error"
                );

                return;

            }


            if (
                password.length <
                4
            ) {

                setMessage(
                    message,
                    "Password must contain at least 4 characters.",
                    "error"
                );

                return;

            }


            const users =
                getUsers();


            // =================================================
            // USERNAME CHECK
            // =================================================

            const usernameExists =
                users.some(
                    function(user) {

                        return (

                            (
                                user.username ||
                                ""
                            )
                            .toLowerCase() ===
                            username.toLowerCase()

                        );

                    }
                );


            if (
                usernameExists
            ) {

                setMessage(
                    message,
                    "Username already exists.",
                    "error"
                );

                return;

            }


            // =================================================
            // EMAIL CHECK
            // =================================================

            const emailExists =
                users.some(
                    function(user) {

                        return (

                            (
                                user.email ||
                                ""
                            )
                            .toLowerCase() ===
                            email.toLowerCase()

                        );

                    }
                );


            if (
                emailExists
            ) {

                setMessage(
                    message,
                    "Email already exists.",
                    "error"
                );

                return;

            }


            // =================================================
            // CREATE USER
            // =================================================

            const newUser = {

                id:
                    Date.now(),

                name:
                    name,

                username:
                    username,

                email:
                    email,

                password:
                    password

            };


            users.push(
                newUser
            );


            saveUsers(
                users
            );


            setMessage(
                message,
                "✅ Account created successfully!",
                "success"
            );


            registerForm.reset();


            // Go back to login

            setTimeout(
                function() {

                    showLoginCard();

                },
                1200
            );

        }
    );

}


// =====================================================
// SHOW REGISTER BUTTON
// =====================================================

const showRegisterButton =
    document.getElementById(
        "showRegisterButton"
    );


if (showRegisterButton) {

    showRegisterButton.addEventListener(
        "click",
        function() {

            showRegisterCard();

        }
    );

}


// =====================================================
// BACK TO LOGIN BUTTON
// =====================================================

const backToLoginButton =
    document.getElementById(
        "backToLoginButton"
    );


if (backToLoginButton) {

    backToLoginButton.addEventListener(
        "click",
        function() {

            showLoginCard();

        }
    );

}


// =====================================================
// CANCEL OTP
// =====================================================

const cancelOtpButton =
    document.getElementById(
        "cancelOtpButton"
    );


if (cancelOtpButton) {

    cancelOtpButton.addEventListener(
        "click",
        function() {

            generatedOtp =
                null;


            otpUser =
                null;


            showLoginCard();

        }
    );

}


// =====================================================
// DARK / LIGHT THEME
// =====================================================

function applyLoginTheme() {

    const savedTheme =
        localStorage.getItem(
            "college_theme"
        );


    if (
        savedTheme ===
        "dark"
    ) {

        document.body.classList.add(
            "dark-theme"
        );

    }

    else {

        document.body.classList.remove(
            "dark-theme"
        );

    }

}


// =====================================================
// START
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        showLoginCard();

        applyLoginTheme();

    }
);