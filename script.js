function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}


// chatbot open-up and close function

function toggleChatbot() {
  const chatbotPopup = document.getElementById("chatbot-popup");
  chatbotPopup.style.display = chatbotPopup.style.display === "none" || !chatbotPopup.style.display ? "block" : "none";
}

// Handle file upload and store file_key
// document.getElementById("file-upload").addEventListener("change", async function () {
//   let fileInput = document.getElementById("file-upload").files[0];
//   let formData = new FormData();
//   formData.append("file", fileInput);

//   //http://127.0.0.1:5001/
//   try {
//       const response = await fetch("http://127.0.0.1:5002/upload", {
//           method: "POST",
//           body: formData
//       });

//       if (response.ok) {
//           const data = await response.json();
//           localStorage.setItem("file_key", data.file_key);
//           console.log("File uploaded successfully:", data.file_key); // Console log the file key
//       } else {
//           console.error("Failed to upload file:", await response.text());
//       }
//   } catch (error) {
//       console.error("Error uploading file:", error);
//   }
// });

// Show the popup for the selected skill item
function showPopup(popupId) {
  // Hide any open popups
  document.querySelectorAll('.popup').forEach(popup => {
      popup.style.display = 'none';
  });
  document.getElementById("overlay").style.display = "block"; // Show overlay

  // Show the clicked popup
  const popup = document.getElementById(popupId);
  if (popup) {
      popup.style.display = 'block';
  }
}

// Close the popup when clicking outside
document.getElementById("overlay").addEventListener("click", function() {
  // Hide all popups and overlay
  document.querySelectorAll('.popup').forEach(popup => {
      popup.style.display = 'none';
  });
  document.getElementById("overlay").style.display = "none";
});

document.getElementById("file-upload").addEventListener("change", async function () {
  let fileInput = document.getElementById("file-upload").files[0];
  let formData = new FormData();
  formData.append("file", fileInput);

  showLoading(); // Show loading indicator before starting the request

  try {
      const response = await fetch("http://127.0.0.1:5002/upload", {
          method: "POST",
          body: formData
      });

      if (response.ok) {
          const data = await response.json();
          localStorage.setItem("file_key", data.file_key);
          console.log("File uploaded successfully:", data.file_key);
      } else {
          console.error("Failed to upload file:", await response.text());
      }
  } catch (error) {
      console.error("Error uploading file:", error);
  } finally {
      hideLoading(); // Hide loading indicator after the request completes
  }
});



// Function to handle sending a question and receiving a response
// document.getElementById("send-query").addEventListener("click", async function () {
//   const questionInput = document.getElementById("question");
//   const questionText = questionInput.value.trim();

//   if (!questionText) {
//       alert("Please enter a question.");
//       return;
//   }

//   // Display the question in the chat interface
//   displayMessage(questionText, "question-message");

//   // Clear the input field
//   questionInput.value = '';

//   // Retrieve file_key from localStorage
//   let file_key = localStorage.getItem("file_key");
//   if (!file_key) {
//       alert("Please upload a document first.");
//       return;
//   }

//   try {
//       // Send the question to the server
//       const response = await fetch("http://127.0.0.1:5002/query", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ question: questionText, file_key })
//       });

//       if (response.ok) {
//           const data = await response.json();
//           const resultMessage = data.result || "No response from server.";
//           displayMessage(resultMessage, "response-message"); // Display server response
//       } else {
//           console.error("Failed to process query:", await response.text());
//           displayMessage("Error: Could not get a response.", "response-message");
//       }
//   } catch (error) {
//       console.error("Error processing query:", error);
//       displayMessage("Error: Could not reach the server.", "response-message");
//   }
// });

document.getElementById("send-query").addEventListener("click", async function () {
  const questionInput = document.getElementById("question");
  const questionText = questionInput.value.trim();

  if (!questionText) {
      alert("Please enter a question.");
      return;
  }

  displayMessage(questionText, "question-message");
  questionInput.value = '';

  let file_key = localStorage.getItem("file_key");
  if (!file_key) {
      alert("Please upload a document first.");
      return;
  }

  showLoading(); // Show loading indicator before starting the request

  try {
      const response = await fetch("http://127.0.0.1:5002/query", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: questionText, file_key })
      });

      if (response.ok) {
          const data = await response.json();
          const resultMessage = data.result || "No response from server.";
          displayMessage(resultMessage, "response-message");
      } else {
          console.error("Failed to process query:", await response.text());
          displayMessage("Error: Could not get a response.", "response-message");
      }
  } catch (error) {
      console.error("Error processing query:", error);
      displayMessage("Error: Could not reach the server.", "response-message");
  } finally {
      hideLoading(); // Hide loading indicator after the request completes
  }
});


function showLoading() {
  document.getElementById("loading-overlay").style.display = "flex";
}

function hideLoading() {
  document.getElementById("loading-overlay").style.display = "none";
}


// Function to display a message in the chat interface
function displayMessage(text, className) {
  const messageElement = document.createElement("div");
  messageElement.className = `response-message ${className}`;
  messageElement.textContent = text;

  // Append the message to the response container
  const responseContainer = document.getElementById("response-container");
  responseContainer.appendChild(messageElement);

  // Scroll to the bottom of the response container to show the latest message
  responseContainer.scrollTop = responseContainer.scrollHeight;
}



function displayResponse(message) {
    const responseContainer = document.getElementById("response-container");
    
    // Create a new response message element
    const responseMessage = document.createElement("div");
    responseMessage.classList.add("response-message");
    responseMessage.textContent = message;
    
    // Append the new message to the container
    responseContainer.appendChild(responseMessage);
    
    // Scroll to the bottom of the container to show the latest message
    responseContainer.scrollTop = responseContainer.scrollHeight;
    
    // Clear the input field after displaying the response
    document.getElementById("question").value = "";
}





//  Below if the function to get the medium post dynamically.


document.addEventListener('DOMContentLoaded', function () {
  const mediumFeedURL = 'https://medium.com/feed/@sudharsan2618'; // Replace with your username
  const mediumBlogsContainer = document.getElementById('medium-blogs');

  fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(mediumFeedURL)}`)
    .then(response => response.json())
    .then(data => {
      const posts = data.items; // Array of posts
      let blogPostsHTML = '';

      posts.forEach(post => {
        blogPostsHTML += `
          <div class="blog-post">
            <h2>${post.title}</h2>
            <p>${post.description.substring(0, 250)}...</p>
            <a href="${post.link}" class="button-style" target="_blank">Read More</a>
          </div>
        `;
      });

      mediumBlogsContainer.innerHTML = blogPostsHTML;
    })
    .catch(error => {
      console.error('Error fetching Medium RSS feed:', error);
    });
});


