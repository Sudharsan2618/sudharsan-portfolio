function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}



function showMsgPopup() {
  document.getElementById('popup-message').style.display = 'block';
  document.body.style.overflow = 'hidden'; // Disable scrolling
}

function closeMsgPopup() {
  document.getElementById('popup-message').style.display = 'none';
  document.body.style.overflow = ''; // Restore scrolling
}


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


