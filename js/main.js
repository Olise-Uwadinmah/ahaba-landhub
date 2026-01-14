const property = JSON.parse(localStorage.getItem("selectedProperty"));

if(property){
  document.getElementById("title").textContent = property.title;
  document.getElementById("location").textContent = property.location;
  document.getElementById("price").textContent = `₦${property.price}`;
  document.getElementById("description").textContent = property.description;
  document.getElementById("size").textContent = property.size;
  document.getElementById("status").textContent = property.status;

  const imagesDiv = document.getElementById("images");
  property.images.forEach(img => {
    const image = document.createElement("img");
    image.src = img;
    imagesDiv.appendChild(image);
  });

  document.getElementById("video").src = property.video;
}

// show logged-in user and admin link
const nav = document.querySelector("nav ul");
if(nav){
  const token = localStorage.getItem("token");
  if(token){
    const payload = JSON.parse(atob(token.split('.')[1])); // decode JWT
    const liUser = document.createElement("li");
    liUser.innerHTML = `<span class="primary">Hi, ${payload.name}</span>`;
    nav.appendChild(liUser);

    // hide login/register links
    nav.querySelectorAll("a[href='login.html'], a[href='register.html']").forEach(el => el.style.display = "none");

    // show admin panel link if admin
    if(payload.role === "admin"){
      const liAdmin = document.createElement("li");
      liAdmin.innerHTML = `<a href="admin.html" class="btn btn-accent">Admin Panel</a>`;
      nav.appendChild(liAdmin);
    }

    // add logout button
    const liLogout = document.createElement("li");
    liLogout.innerHTML = `<button id="logoutBtn" class="btn btn-primary">Logout</button>`;
    nav.appendChild(liLogout);

    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      alert("Logged out successfully!");
      window.location.href = "index.html";
    });
  }
}
