const mainPage = document.querySelector("#mainPage");
const loginSection = document.querySelector("#loginSection");
const dashboardSection = document.querySelector("#dashboardSection");
const navbar = document.querySelector("#navbar");
const mainContent = document.querySelector("#main-content");
const admin = document.querySelector("#adminPage");

const serialID = document.getElementById("serialID");
const error = document.getElementById("serialID_error");
const searchBtn = document.querySelector("#searchBtn");
const computeBTN = document.querySelector("#computeBTN");
const usageBtn = document.querySelector("#usageBtn-error");
const userInfoTable = document.querySelector("#userInfoTable");
const exitBtn = document.querySelector('#exitBtn');
const adminExitBtn = document.querySelector("#adminExitBtn");

let activeUserID = null;

const STORAGE_KEY = "WaterBilling_Users";
const MAX_USERS = 10;

const adminAccount = {
    username: "ruiz",
    password: "1234"
};

/* ============================
   STORAGE HELPERS
============================ */
function getAllUsers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveAllUsers(users) {
    const data = JSON.stringify(users);
    localStorage.setItem(STORAGE_KEY, data);
    sessionStorage.setItem(STORAGE_KEY, data);
}

/* ============================
   TAB SWITCHING
============================ */
function switchTab(tab) {
    const loginTab = document.getElementById("tabLogin");
    const registerTab = document.getElementById("tabRegister");
    const loginBtn = document.getElementById("tabLoginBtn");
    const registerBtn = document.getElementById("tabRegisterBtn");

    // reset errors
    error.textContent = "";
    error.style.color = "white";
    document.getElementById("reg_error").style.display = "none";
    document.getElementById("reg_error").textContent = "";

    if (tab === "login") {
        loginTab.style.display = "flex";
        loginTab.style.flexDirection = "column";
        loginTab.style.gap = "14px";
        registerTab.style.display = "none";
        loginBtn.classList.add("active");
        registerBtn.classList.remove("active");
    } else {
        registerTab.style.display = "flex";
        registerTab.style.flexDirection = "column";
        registerTab.style.gap = "14px";
        loginTab.style.display = "none";
        registerBtn.classList.add("active");
        loginBtn.classList.remove("active");
    }
}

/* ============================
   REGISTER
============================ */
document.getElementById("registerBtn").addEventListener("click", function () {
    let newID = document.getElementById("regSerialID").value.trim();
    let newName = document.getElementById("regName").value.trim();
    let regError = document.getElementById("reg_error");

    regError.textContent = "";
    regError.style.display = "none";

    if (!newID || !newName) {
        regError.textContent = "All fields are required.";
        regError.style.color = "red";
        regError.style.display = "block";
        return;
    }

    if (!/^[0-9]+$/.test(newID)) {
        regError.textContent = "Serial ID must be numbers only.";
        regError.style.color = "red";
        regError.style.display = "block";
        return;
    }

    let users = getAllUsers();

    if (users.length >= MAX_USERS) {
        regError.textContent = `Maximum ${MAX_USERS} users reached.`;
        regError.style.color = "red";
        regError.style.display = "block";
        return;
    }

    if (users.find(u => u.ID === newID)) {
        regError.textContent = "Serial ID already exists. Try another.";
        regError.style.color = "red";
        regError.style.display = "block";
        return;
    }

    // Add new user with 0 usage
    users.push({ ID: newID, name: newName, usage: "0", total: "P0" });
    saveAllUsers(users);

    regError.textContent = "Account created! You can now log in.";
    regError.style.color = "green";
    regError.style.display = "block";

    document.getElementById("regSerialID").value = "";
    document.getElementById("regName").value = "";

    // Auto-switch to login tab after 1.2s
    setTimeout(() => switchTab("login"), 1200);
});

// Exit button on register tab
document.getElementById("exitRegBtn").addEventListener("click", function () {
    loginSection.style.display = "none";
    dashboardSection.style.display = "none";
    navbar.style.display = "none";
    mainContent.style.display = "none";
    mainPage.style.display = "flex";
});

/* ============================
   ADMIN
============================ */
function adminLogin() {
    let user = document.getElementById("adminUser").value.trim();
    let pass = document.getElementById("adminPass").value.trim();
    let err = document.getElementById("adminError");

    err.textContent = "";

    if (!user || !pass) {
        err.style.color = "red";
        err.textContent = "Fields cannot be empty";
        return;
    }

    if (user === adminAccount.username && pass === adminAccount.password) {
        err.style.color = "green";
        err.textContent = "Login successful!";

        document.getElementById("adminLoginBox").style.display = "none";
        document.getElementById("adminDashboard").style.display = "block";

        admin.style.display = "flex";
        loadAdminData();
    } else {
        err.style.color = "red";
        err.textContent = "Invalid credentials";
    }
}

function adminPage() {
    loginSection.style.display = "none";
    dashboardSection.style.display = "none";
    mainPage.style.display = "none";
    admin.style.display = "flex";
}

adminExitBtn.addEventListener("click", function () {
    admin.style.display = "none";
    mainPage.style.display = "flex";
});

function loadAdminData() {
    let users = getAllUsers();
    let container = document.getElementById("adminData");

    if (users.length === 0) {
        container.innerHTML = "<p class='admin-no-records'>No records found.</p>";
        return;
    }

    let rows = users.map((u, i) => `
        <tr>
            <td>${u.ID || "N/A"}</td>
            <td>${u.name || "—"}</td>
            <td>${u.usage} m³</td>
            <td>${u.total}</td>
            <td>
                <button class="admin-delete-btn" onclick="deleteUser(${i})">🗑 Delete</button>
            </td>
        </tr>
    `).join("");

    container.innerHTML = `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Serial ID</th>
                    <th>Name</th>
                    <th>Usage</th>
                    <th>Total Bill</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
        <p class="admin-count">${users.length} / ${MAX_USERS} users stored</p>
    `;
}

function deleteUser(index) {
    let users = getAllUsers();
    users.splice(index, 1);
    saveAllUsers(users);
    loadAdminData();
}

function logoutAdmin() {
    document.getElementById("adminLoginBox").style.display = "block";
    document.getElementById("adminDashboard").style.display = "none";
    admin.style.display = "none";
    mainPage.style.display = "flex";
}

/* ============================
   NAVIGATION
============================ */
function enterSystem() {
    mainPage.style.display = "none";
    loginSection.style.display = "flex";
    switchTab("login");
}

function backToMain() {
    dashboardSection.style.display = "none";
    mainContent.style.display = "none";
    loginSection.style.display = "flex";
    navbar.style.display = "none";
    switchTab("login");
}

function homePage() {
    dashboardSection.style.display = "none";
    mainContent.style.display = "none";
    loginSection.style.display = "flex";
    navbar.style.display = "none";
    switchTab("login");
}

function aboutPage() {
    loginSection.style.display = "none";
    dashboardSection.style.display = "none";
    navbar.style.display = "flex";

    mainContent.style.display = "flex";
    mainContent.style.justifyContent = "center";
    mainContent.style.alignItems = "flex-start";
    mainContent.style.padding = "40px";
    mainContent.style.marginLeft = "250px";

    mainContent.innerHTML = `
        <div style="background:white;padding:20px;border-radius:10px;">
            <h2>About System</h2>
            <p>Basic Water Billing Computation project in Integrative Programming.</p>
            <br>
            <h2>MEMBERS</h2>
            <p>1. Francis F. Niog</p>
            <p>2. Joshua C. Ruiz</p>
            <p>3. Raffy J. Amosco</p>
        </div>
    `;
}

function contactPage() {
    alert("Contact Page Coming Soon");
}

/* ============================
   EXIT (LOGIN TAB)
============================ */
exitBtn.addEventListener('click', function () {
    loginSection.style.display = "none";
    dashboardSection.style.display = "none";
    navbar.style.display = "none";
    mainContent.style.display = "none";
    mainPage.style.display = "flex";
    error.textContent = "";
    error.style.color = "white";
});

/* ============================
   SEARCH / LOGIN
============================ */
searchBtn.addEventListener("click", function () {
    let valueID = serialID.value.trim();

    if (valueID === "") {
        error.textContent = "Empty Serial ID";
        error.style.color = "red";
        return;
    }

    if (!/^[0-9]+$/.test(valueID)) {
        error.textContent = "Use Numbers Only!";
        error.style.color = "red";
        return;
    }

    let users = getAllUsers();
    let foundUser = users.find(u => u.ID === valueID);

    if (!foundUser) {
        error.textContent = "Serial ID not found! Please register first.";
        error.style.color = "red";
        return;
    }

    activeUserID = foundUser.ID;

    loginSection.style.display = "none";
    dashboardSection.style.display = "block";
    navbar.style.display = "flex";

    document.getElementById("welcomeText").innerText =
        "Welcome, " + (foundUser.name || foundUser.ID);

    error.textContent = "";
    error.style.color = "white";
    serialID.value = "";
});

/* ============================
   COMPUTE BILL
============================ */
computeBTN.addEventListener("click", function () {
    let usage = document.querySelector("#Payment").value.trim();

    if (usage === "") {
        usageBtn.textContent = "Please enter cubic used.";
        usageBtn.style.color = "red";
        usageBtn.style.display = "block";
        return;
    }

    if (/[^0-9]/g.test(usage)) {
        usageBtn.textContent = "Use numbers only!";
        usageBtn.style.color = "red";
        usageBtn.style.display = "block";
        return;
    }

    usageBtn.textContent = "";
    usageBtn.style.display = "none";

    let rate_per_Cubic = 70;
    let totalUsage = usage * rate_per_Cubic;

    userInfoTable.innerHTML = `
        <tr>
            <td>Water Usage</td>
            <td>${usage} m³</td>
        </tr>
        <tr>
            <td>Total Bill</td>
            <td>P${totalUsage}</td>
        </tr>
    `;

    let users = getAllUsers();
    let index = users.findIndex(u => u.ID === activeUserID);

    if (index === -1) {
        usageBtn.textContent = "User not found in system!";
        usageBtn.style.color = "red";
        return;
    }

    users[index].usage = usage;
    users[index].total = "P" + totalUsage;
    saveAllUsers(users);
});