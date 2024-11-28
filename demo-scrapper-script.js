document.getElementById("generate-feedback").addEventListener("click", async function () {
    const jobDescriptionInput = document.getElementById("job-description");
    const jobDescriptionText = jobDescriptionInput.value.trim();

    if (!jobDescriptionText) {
        alert("Please enter a job description.");
        return;
    }

    let file_key = localStorage.getItem("file_key");
    if (!file_key) {
        alert("Please upload a document first.");
        return;
    }

    // Show a loading message in the response-display textarea
    const responseDisplay = document.getElementById("response-display");
    responseDisplay.value = "Processing... Please wait.";

    try {
        const response = await fetch("https://chatbot-backend-wvi9.onrender.com/cvSuggesion", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                job_description: jobDescriptionText,
                file_key: file_key,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            
            // Check if suggestions are in an array or a string
            if (Array.isArray(data.suggestions)) {
                // If suggestions are an array, join them with line breaks
                responseDisplay.value = data.suggestions.join("\n");
            } else if (data.result) {
                // If it's a single string in the `result` field, display it
                responseDisplay.value = data.result;
            } else {
                responseDisplay.value = "No suggestions available.";
            }
        } else {
            console.error("Failed to process query:", await response.text());
            responseDisplay.value = "Error: Could not get a response from the server.";
        }
    } catch (error) {
        console.error("Error processing query:", error);
        responseDisplay.value = "Error: Could not reach the server.";
    }
});




// Handle file upload with backend interaction
document.getElementById("file-upload").addEventListener("change", async function () {
    let fileInput = document.getElementById("file-upload").files[0];
    let formData = new FormData();
    formData.append("file", fileInput);

    const uploadStatus = document.getElementById("upload-status");
    showLoading(); // Show loading indicator before starting the request

    try {
        const response = await fetch("https://chatbot-backend-wvi9.onrender.com/upload", {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("file_key", data.file_key);
            console.log("File uploaded successfully:", data.file_key);

            // Display success message
            uploadStatus.style.display = "block";
            uploadStatus.style.color = "green";
            uploadStatus.textContent = "File uploaded successfully!";
        } else {
            console.error("Failed to upload file:", await response.text());

            // Display error message
            uploadStatus.style.display = "block";
            uploadStatus.style.color = "red";
            uploadStatus.textContent = "Failed to upload file.";
        }
    } catch (error) {
        console.error("Error uploading file:", error);

        // Display error message
        uploadStatus.style.display = "block";
        uploadStatus.style.color = "red";
        uploadStatus.textContent = "An error occurred while uploading.";
    } finally {
        hideLoading(); // Hide loading indicator after the request completes
    }
});


// Mock loading indicators
function showLoading() {
    console.log("Loading...");
}

function hideLoading() {
    console.log("Loading complete.");
}