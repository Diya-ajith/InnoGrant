
// Handle login and signup using localStorage
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let user = localStorage.getItem(username);
    if (user) {
        let userData = JSON.parse(user);
        if (userData.password === password) {
            localStorage.setItem("currentUser", username);
            window.location.href = "profile.html";
        } else {
            alert("Incorrect password.");
        }
    } else {
        alert("User not found. Please sign up.");
    }
}

function signup() {
    let username = document.getElementById("signup-username").value;
    let password = document.getElementById("signup-password").value;

    if (!localStorage.getItem(username)) {
        // Collect profile data
        let stream = document.getElementById("signup-stream").value;
        let percentage = document.getElementById("signup-percentage").value;
        let religion = document.getElementById("signup-religion").value;
        let caste = document.getElementById("signup-caste").value;

        let newUser = {
            username: username,
            password: password,
            stream: stream,
            percentage: percentage,
            religion: religion,
            caste: caste
        };

        // Store the new user and their profile data
        localStorage.setItem(username, JSON.stringify(newUser));
        localStorage.setItem("currentUser", username);
        window.location.href = "profile.html";
    } else {
        alert("User already exists. Please login.");
    }
}

// Profile Page: Save stream, percentage, religion, and caste into localStorage
function saveProfile() {
    let user = localStorage.getItem("currentUser");

    if (!user) {
        alert("Please log in to save your profile.");
        return;
    }

    let stream = document.getElementById("stream").value;
    let percentage = document.getElementById("percentage").value;
    let religion = document.getElementById("religion").value;
    let caste = document.getElementById("caste").value;

    // Get the existing user data from localStorage
    let userData = JSON.parse(localStorage.getItem(user));

    // Update the user data with the new profile details
    userData.stream = stream;
    userData.percentage = percentage;
    userData.religion = religion;
    userData.caste = caste;

    // Save the updated user data back to localStorage
    localStorage.setItem(user, JSON.stringify(userData));

    alert("Profile saved!");
}

// Fetch scholarships based on the user's profile
function fetchScholarships() {
    let user = localStorage.getItem("currentUser");
    let userData = JSON.parse(localStorage.getItem(user));

    // Ensure userData is not null
    if (!userData) {
        alert("User data not found. Please log in again.");
        return;
    }

    let stream = userData.stream;
    let percentage = userData.percentage;
    let religion = userData.religion || "";  // If religion is empty, use an empty string
    let caste = userData.caste || ""; 
    let gender = userData.gender || "";       // If gender is empty, use an empty string

    // Sample engineering scholarships for illustration
    const scholarships = [
        {
            name: "IEEE Scholarship",
            link: "https://www.ieee.org",
            description: "A scholarship for engineering students based on merit."
        },
        {
            name: "ONGC Scholarship",
            link: "https://www.ongcindia.com",
            description: "Offered by ONGC to support students pursuing engineering and technical fields."
        },
        {
            name: "IEE Scholarship",
            link: "https://www.iee.org",
            description: "Scholarships offered to students pursuing electrical engineering studies."
        },
        {
            name: "L&T Build India Scholarship",
            link: "https://www.lntecc.com",
            description: "An opportunity for engineering students in construction, engineering, and management fields."
        },
        {
            name: "BHEL Scholarship",
            link: "https://www.bhel.com",
            description: "BHEL offers scholarships to students pursuing engineering studies in mechanical and electrical streams."
        }
    ];

    // Filter scholarships based on user profile data (stream, percentage, etc.)
    const filteredScholarships = scholarships.filter(scholarship => {
        return scholarship.description.toLowerCase().includes(stream.toLowerCase()) ||
               scholarship.description.toLowerCase().includes("engineering");
    });

    // Display the filtered scholarships
    let list = document.getElementById("scholarshipList");
    list.innerHTML = "";  // Clear any previous content

    if (filteredScholarships.length > 0) {
        // If scholarships found, display them
        filteredScholarships.forEach(sch => {
            let item = document.createElement("p");
            item.innerHTML = `<a href="${sch.link}" target="_blank">${sch.name}</a><br><small>${sch.description}</small>`;
            list.appendChild(item);
        });
    } else {
        list.innerHTML = "<p>No scholarships available for your criteria.</p>";
    }
}
