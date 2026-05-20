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

//storage at max users 3
const STORAGE_KEY = "WaterBilling_Users";
const MAX_USERS = 3;

const adminAccount = {
    username: "bistaykol",
    password: "IT102"
};

function getAllUsers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveAllUsers(users) {
    const data = JSON.stringify(users);
    localStorage.setItem(STORAGE_KEY, data);
    sessionStorage.setItem(STORAGE_KEY, data); 
}

function adminLogin() {
    let user = document.getElementById("adminUser").value.trim();
    let pass = document.getElementById("adminPass").value.trim();
    let error = document.getElementById("adminError");

    error.textContent = "";

    if (!user || !pass) {
        error.style.color = "red";
        error.textContent = "Fields cannot be empty";
        return;
    }

    if (user === adminAccount.username && pass === adminAccount.password) {

        error.style.color = "green";
        error.textContent = "Login successful!";

        document.getElementById("adminLoginBox").style.display = "none";
        document.getElementById("adminDashboard").style.display = "block";

        admin.style.display = "flex";

        loadAdminData();

    } else {
        error.style.color = "red";
        error.textContent = "Invalid credentials";
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

function addUser() {
    let id = document.getElementById("addUserID").value.trim();
    let usage = document.getElementById("addUserUsage").value.trim();
    let addError = document.getElementById("addUserError");

    addError.textContent = "";

    if (!id || !usage) {
        addError.textContent = "All fields are required.";
        return;
    }

    if (!/^[0-9]+$/.test(id) || !/^[0-9]+$/.test(usage)) {
        addError.textContent = "Use numbers only.";
        return;
    }

    let users = getAllUsers();

    if (users.length >= MAX_USERS) {
        addError.textContent = `Maximum ${MAX_USERS} users only.`;
        return;
    }

    if (users.find(u => u.ID === id)) {
        addError.textContent = "Serial ID already exists.";
        return;
    }

    let total = parseInt(usage) * 70;
    users.push({ ID: id, usage: usage, total: "P" + total });
    saveAllUsers(users);

    document.getElementById("addUserID").value = "";
    document.getElementById("addUserUsage").value = "";

    loadAdminData();
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

function enterSystem() {
    mainPage.style.display = "none";
    loginSection.style.display = "flex";
}

function backToMain() {
    dashboardSection.style.display = "none";
    mainContent.style.display = "none";
    loginSection.style.display = "flex";
    navbar.style.display = "none";
}

function homePage() {
    dashboardSection.style.display = "none";
    mainContent.style.display = "none";
    loginSection.style.display = "flex";
    navbar.style.display = "none";
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

function exitPage() {
    exitBtn.addEventListener('click', function () {
        loginSection.style.display = "none";
        dashboardSection.style.display = "none";
        navbar.style.display = "none";
        mainContent.style.display = "none";
        mainPage.style.display = "flex";
        document.getElementById("serialID_error").style.color = "white";
    });
}
exitPage();

function contactPage() {
    alert("Contact Page Coming Soon");
}

function search_Btn() {
    searchBtn.addEventListener("click", function () {
        let valueID = serialID.value.trim();

        if (valueID === "") {
            document.getElementById("serialID_error").style.color = "red";
            return;
        }

        if (!/^[0-9]+$/.test(valueID)) {
            serialID_error.textContent = "Use Number Only!";
            serialID_error.style.color = "red";
            serialID_error.style.display = "block";
            return;
        }

        //max nito 3 users lang 
        let users = getAllUsers();
        let isExisting = users.find(u => u.ID === valueID);

        if (!isExisting && users.length >= MAX_USERS) {
            serialID_error.textContent = `Maximum ${MAX_USERS} users reached. Contact admin.`;
            serialID_error.style.color = "red";
            serialID_error.style.display = "block";
            return;
        }

        loginSection.style.display = "none";
        dashboardSection.style.display = "block";
        navbar.style.display = "flex";
        document.getElementById("serialID_error").style.color = "white";
        document.getElementById("welcomeText").innerText = "Welcome " + valueID;
    });
}
search_Btn();

function computation_Btn() {
    computeBTN.addEventListener("click", function () {
        let usage = document.querySelector("#Payment").value.trim();

        if (usage === "") {
            usageBtn.textContent = "Empty Cubic Used, Please Enter the Number BAI";
            usageBtn.style.color = "red";
            usageBtn.style.display = "block";
            return;
        }

        if (/[^0-9]/g.test(usage)) {
            usageBtn.textContent = "Use Integer Only! hahahaha";
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
                <td>${usage}m³</td>
            </tr>
            <tr>
                <td>Total Bill</td>
                <td>P${totalUsage}</td>
            </tr>
        `;

        let currentID = serialID.value.trim();
        let users = getAllUsers();
        let existingIndex = users.findIndex(u => u.ID === currentID);

        let record = {
            ID: currentID,
            usage: usage,
            total: "P" + totalUsage
        };

        if (existingIndex !== -1) {
            users[existingIndex] = record; //update existing user record
        } else if (users.length < MAX_USERS) {
            users.push(record);            //add new user record
        }

        saveAllUsers(users); //saves to both localStorage at sessionStorage
    });
}
computation_Btn();

function enter_serialID() {
    let valueID = document.querySelector("#Payment");
    valueID.addEventListener('input', function () {
        let value = this.value;
        if (/[^0-9]/g.test(value)) {
            serialID_error.textContent = "Use Number Only!";
            serialID_error.style.color = "red";
            serialID_error.style.display = "block";
            return;
        }
    });
}
enter_serialID();