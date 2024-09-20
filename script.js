function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}


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
