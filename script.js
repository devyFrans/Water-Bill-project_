const mainPage = document.querySelector("#mainPage");
const loginSection = document.querySelector("#loginSection");
const dashboardSection = document.querySelector("#dashboardSection");
const navbar = document.querySelector("#navbar");
const mainContent = document.querySelector("#main-content");

const serialID = document.getElementById("serialID");
const error = document.getElementById("serialID_error");
const searchBtn = document.querySelector("#searchBtn");
const computeBTN = document.querySelector("#computeBTN");
const usageBtn = document.querySelector("#usageBtn-error");
const userInfoTable = document.querySelector("#userInfoTable");
const exitBtn = document.querySelector('#exitBtn');

function enterSystem() {
    mainPage.style.display = "none";
    loginSection.style.display = "flex";
}

function backToMain() {
    loginSection.style.display = "none";
    dashboardSection.style.display = "none";
    navbar.style.display = "none";
    mainContent.style.display = "none";
    mainPage.style.display = "flex";
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

    mainContent.style.display = "flex"; //to show yung about page 
    mainContent.style.justifyContent = "center";
    mainContent.style.alignItems = "flex-start"
    mainContent.style.padding = "40px" //pang spacing
    mainContent.style.marginleft = "250px"; //iwas sidebar overlap

    mainContent.innerHTML = `
        <div style="background:white;padding:20px;border-radius:10px;">
            <h2>About System</h2>
            <p>Basic Water Billing Computation project in IntProg.</p>
            <br>
            <h2><b>MEMBERS</h2>
            <p>1. Francis F. Niog</p>
            <p>2. Joshua C. Ruiz</p>
            <p>2. Raffy J. Amosco</p>
            <br>
            <p>Pre lagyan mo ng about sa system natin kung paano gumagana at kung para saan sya</p>
        </div>
    `;
}

function exitPage(){
    exitBtn.addEventListener('click', function(){
        loginSection.style.display = "none";
        dashboardSection.style.display = "none";
        navbar.style.display = "none";
        mainContent.style.display = "none";
        mainPage.style.display = "flex";

    });
}
exitPage();

function adminPage (){
    //Dito kana lng mag add kol para mas madali basahin HAHAHA inaral ko pa kanina yung code e mas madali ganto
}

function contactPage() {
    alert("Contact Page Coming Soon");
}

function search_Btn() {
    searchBtn.addEventListener("click", function () {
        let valueID = serialID.value.trim()

        if (valueID === "") {                     //check kung empty 
            serialID_error.textContent = "Empty Serial ID";
            return;
        }

        if (!/^[0-9]+$/.test(valueID)) {          //validation for number only, not allowed strings
            serialID_error.textContent = "Use Number Only!";
            serialID_error.style.color = "red";
            serialID_error.style.display = "block";
            return;
        }

        serialID_error.textContent = "";

        loginSection.style.display = "none";
        dashboardSection.style.display = "block";
        navbar.style.display = "flex";

        document.getElementById("welcomeText").innerText =
            "Welcome " + valueID;

    });
}
search_Btn()

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

        let rate_per_Cubic = 70   //70 per cubic then multiply sa input ni user
        let totalUsage = usage * rate_per_Cubic

        userInfoTable.innerHTML = `
            <tr>
                <td>Water Usage</td>
                <td>${usage}m³</td>
            </tr>
            <tr>
                <td>Total Bill</td>
                <td>P${totalUsage}</td>
        `;

        let save_in_SessionStorage = sessionStorage.setItem(      //temporary save ng item
            "Customer Usage",
            JSON.stringify({
                ID: valueID.value,      //may bug sa .value, simula nung naglagay din ako localStorage
                usage: usage,
                total: "P" + totalUsage
            })
        )

        let save_in_LocalStorage = localStorage.setItem(        //permanent save ng item
            "Customer Usage",
            JSON.stringify({
                ID: valueID.value,
                usage: usage,
                total: "P" + totalUsage
            })
        )
    });
}
computation_Btn()

function enter_serialID(){
    let valueID = document.querySelector("#Payment");   //running bug kapag walang ganito, di gumagana si storage
    valueID.addEventListener('input', function(){

        let value = this.value;

        if(/[^0-9]/g.test(value)){        
            serialID_error.textContent = "Use Number Only!";
            serialID_error.style.color = "red";
            serialID_error.style.display = "block";
            return;
        }    
    });
    }
enter_serialID()
