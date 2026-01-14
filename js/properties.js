const properties = [
  {
    id: 1,
    title: "Premium Land at Iyabi",
    location: "Off Asaba - Ibuza, Delta",
    price: "5,000,000",
    size: "600sqm",
    status: "Available",
    description: "Secure, verified land in a fast-growing area.",
    images: ["assets/images/1.jpg","assets/images/2.jpg","assets/images/3.jpg"],
    video: "assets/videos/video1.mp4"
  },
  {
    id: 2,
    title: "Land at Asaba",
    location: "Asaba, Delta",
    price: "3,200,000",
    size: "500sqm",
    status: "Available",
    description: "Beautiful land ready for investment.",
    images: ["assets/images/4.jpg","assets/images/5.jpg","assets/images/6.jpg"],
    video: "assets/videos/video2.mp4"
  }
];

const grid = document.getElementById("properties-grid");

if(grid){
  properties.forEach(prop => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${prop.images[0]}" alt="Land">
      <div class="card-body">
        <h3>${prop.location}</h3>
        <p>₦${prop.price}</p>
        <span class="badge bg-accent">${prop.status}</span>
      </div>
    `;
    card.addEventListener("click", ()=>{
      localStorage.setItem("selectedProperty", JSON.stringify(prop));
      window.location.href = "property-details.html";
    });
    grid.appendChild(card);
  });
}
