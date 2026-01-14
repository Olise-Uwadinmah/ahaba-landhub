const API_URL = "http://localhost:5000";

// REGISTER
const registerForm = document.getElementById("registerForm");
if(registerForm){
  registerForm.addEventListener("submit", async e => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;

    if(password !== confirm){
      alert("Passwords do not match!");
      return;
    }

    try{
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      if(res.ok){
        alert(data.message);
        window.location.href = "login.html";
      } else {
        alert(data.message);
      }
    } catch(err){
      alert("Server error. Try again.");
    }
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");
if(loginForm){
  loginForm.addEventListener("submit", async e => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try{
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if(res.ok){
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        alert(`Welcome back, ${data.name}!`);
        window.location.href = "index.html";
      } else {
        alert(data.message);
      }
    } catch(err){
      alert("Server error. Try again.");
    }
  });
}
