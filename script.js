const mainPage = document.querySelector("#mainPage");
const loginSection = document.querySelector("#loginSection");
const dashboardSection = document.querySelector("#dashboardSection");
const navbar = document.querySelector("#navbar");
const mainContent = document.querySelector("#main-content");

const serialID = document.querySelector("#serialID");
const serialID_error = document.querySelector("#serialID_error");
const searchBtn = document.querySelector("#searchBtn");
const computeBTN = document.querySelector("#computeBTN");
const userInfoTable = document.querySelector("#userInfoTable");

/* 🏠 ENTER SYSTEM */
function enterSystem() {
    mainPage.style.display = "none";
    loginSection.style.display = "block";
}

/* 🏠 BACK TO MAIN PAGE */
function backToMain() {
    loginSection.style.display = "none";
    dashboardSection.style.display = "none";
    navbar.style.display = "none";
    mainContent.style.display = "none";

    mainPage.style.display = "flex";
}

/* 🏠 HOME */
function homePage() {
    dashboardSection.style.display = "none";
    mainContent.style.display = "none";
    loginSection.style.display = "block";
    navbar.style.display = "none";
}

/* ℹ️ ABOUT */
function aboutPage() {
    loginSection.style.display = "none";
    dashboardSection.style.display = "none";
    navbar.style.display = "flex";
    mainContent.style.display = "block";

    mainContent.innerHTML = `
        <div style="background:white;padding:20px;border-radius:10px;">
            <h2>About System</h2>
            <p>Water Billing System using SPA approach.</p>
        </div>
    `;
}

/* 📞 CONTACT */
function contactPage() {
    alert("Contact Page Coming Soon");
}

/* 🔍 SEARCH SERIAL */
searchBtn.addEventListener("click", function () {

    if (serialID.value.trim() === "") {
        serialID_error.textContent = "Empty Serial ID";
        return;
    }

    serialID_error.textContent = "";

    loginSection.style.display = "none";
    dashboardSection.style.display = "block";
    navbar.style.display = "flex";

    document.getElementById("welcomeText").innerText =
        "Welcome " + serialID.value;
});

/* ⚡ COMPUTE BILL */
computeBTN.addEventListener("click", function () {
    let usage = document.querySelector("#Payment").value;

    userInfoTable.innerHTML = `
        <tr>
            <td>Water Usage</td>
            <td>${usage}</td>
        </tr>
    `;
});