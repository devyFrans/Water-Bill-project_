const users = [
    {
        serial_ID: 505501200365,
        name: "Francis Niog",
        address: "Sta.Maria, Bulacan",
    },

    {
        serial_ID: 12345678912,
        name: "Joshua Ruiz",
        address: "North Caloocan, QC",
    },

    {
        serial_ID: 987560127418,
        name: "Raffy Amosco",
        address: "Sapang Palay, SJDM",
    }
];


const navbar = document.querySelector('#navbar'); // sa nav bar ba to sa left side ng main button naitn? (diko maalala pero alam ko left side talga yan)
const logoutBtn = document.querySelector('#logoutBtn');
const loginSection = document.querySelector('#loginSection');
const serialID = document.querySelector('#serialID');
const serialID_error = document.querySelector('#serialID_error');
const searchBtn = document.querySelector('#searchBtn');
const statusError = document.querySelector('#statusError');
const dashboardSection = document.querySelector('#dashboardSection');
const userInfoTable =  document.querySelector('#userInfoTable');
const computeBTN = document.querySelector('#computeBTN');

function homePage() {
    // alert("HOME PAGE")
//DAPAT KAPAG NAG CLICK TAYO NG HOME, LALABAS YUNG searchBtn
// PRE LIPAT NATIN SA FUNCTION ITONG searchBtn or PWEDE NATIN ILAGAY SA HOME FUNCTION ITO
//  MAGLALAGAY PA PALA TAYO NG SESSION AT LOCAL STORAGE
searchBtn.addEventListener('click', function(){
    
    if(serialID.value.trim() == ""){
        serialID_error.textContent = "Empty Serial ID";
        serialID_error.style.display = "block";
    } else {
        serialID_error.textContent = "";
        serialID_error.style.display = "none";
    }

});



}
function aboutPage() {
    // alert("ABOUT PAGE")
    const mainContent = document.querySelector(".container"); // hide dashboardSection at searchsection
    mainContent.style.display = "none";

        mainContent.innerHTML = `
        <div class="about-box"> 
            <h2>About Simple Water Billing Website</h2>

            <p>
                This is our final project called
                <b>Simple Water Billing Website</b>.
            </p>

            <p>
                The system helps manage customer billing,
                monitor water consumption, and compute bills efficiently.
            </p>
        </div>`;

    document.querySelector(".container").style.display = "block"; //show yung dashboardSection na original
    document.querySelector("main-content").style.display = "none"; //tatanggalin yung about content
}
function contactPage() {
    alert("CONTACT PAGE")
}
