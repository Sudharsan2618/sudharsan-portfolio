// Input validation: Ensure no numbers are allowed in first and last name fields
function validateNameInput(input) {
    if (/\d/.test(input.value)) {
        input.setCustomValidity("Numbers are not allowed.");
        input.style.border = "2px solid red";
    } else {
        input.setCustomValidity("");
        input.style.border = "";
    }
}

// Input validation: Ensure proper domain format
function validateDomainInput(input) {
    const domainPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!domainPattern.test(input.value)) {
        input.setCustomValidity("Enter a valid domain.");
        input.style.border = "2px solid red";
    } else {
        input.setCustomValidity("");
        input.style.border = "";
    }
}

// Find Email Button Click Event
document.getElementById("find-email").addEventListener("click", async function () {
    const firstNameInput = document.getElementById("first-name");
    const lastNameInput = document.getElementById("last-name");
    const domainInput = document.getElementById("company-domain");
    const responseDisplay = document.getElementById("response-display");

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const domain = domainInput.value.trim();

    if (!firstName || !lastName || !domain) {
        responseDisplay.value = "Error: All fields are required.";
        return;
    }
    responseDisplay.value = "Sorry, this service is temporarily stop. Please be patient.";

    // responseDisplay.value = "Processing... Please wait.";
    console.log("Sending request to find email...");

//     try {
//         const response = await fetch("http://127.0.0.1:5000/find-email", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",  // Make sure this is set
//             },
//             body: JSON.stringify({
//                 first_name: firstName,
//                 last_name: lastName,
//                 domain: domain,
//             }),
//         });

//         if (!response.ok) {
//             console.error(`Server responded with status: ${response.status}`);
//             responseDisplay.value = `Error: Server responded with status ${response.status}`;
//             console.log("executes sucessfully - email finder")
//             return;

//         }

//         const responseText = await response.text(); // Read the response as text
//         try {
//             const data = JSON.parse(responseText); // Attempt to parse it as JSON
//             if (response.ok) {
//                 responseDisplay.value = data.valid_email
//                     ? `Valid Email Found: ${data.valid_email}`
//                     : data.message || "No valid email found.";
//             } else {
//                 responseDisplay.value = data.error || "Error: Could not get a response from the server.";
//             }
//         } catch (jsonError) {
//             console.error("Error parsing JSON:", responseText);
//             responseDisplay.value = "Error: Server returned an invalid response.";
//         }
//     } catch (error) {
//         console.error("Error processing query:", error);
//         if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
//             responseDisplay.value = "Error: Failed to fetch from server (502 Bad Gateway or server unavailable).";
//         } else {
//             responseDisplay.value = "Error: Could not reach the server.";
//         }
//     }
});


// Mock loading indicators
function showLoading() {
    console.log("Loading...");
}

function hideLoading() {
    console.log("Loading complete.");
}
