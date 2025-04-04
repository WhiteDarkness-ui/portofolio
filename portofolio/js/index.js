document.addEventListener("DOMContentLoaded", () => {
    gsap.from("#hero h1", { opacity: 0, y: -50, duration: 1 });
    gsap.from("#hero p", { opacity: 0, y: 50, duration: 1, delay: 0.5 });
    gsap.from(".btn", { opacity: 0, scale: 0.8, duration: 0.8, delay: 1 });

    // Project Cards Animation on Hover
    document.querySelectorAll(".project-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
            gsap.to(card, { scale: 1.05, duration: 0.3 });
        });
        card.addEventListener("mouseleave", () => {
            gsap.to(card, { scale: 1, duration: 0.3 });
        });
    });
});

// //github projects  
// function fetchGitHubProjects() {
//     const username = "your-github-username"; // Replace with your GitHub username
//     fetch(`https://api.github.com/users/${username}/repos`)
//         .then(response => response.json())
//         .then(data => {
//             const projectList = document.getElementById("project-list");
//             projectList.innerHTML = ""; // Clear existing projects

//             data.slice(0, 5).forEach(repo => {
//                 const projectCard = document.createElement("div");
//                 projectCard.classList.add("project-card");
//                 projectCard.innerHTML = `
//                     <h3>${repo.name}</h3>
//                     <p>${repo.description || "No description available."}</p>
//                     <a href="${repo.html_url}" target="_blank" class="btn">View Project</a>
//                 `;
//                 projectList.appendChild(projectCard);
//             });
//         })
//         .catch(error => console.error("Error fetching GitHub data:", error));
// }

// // Call function on page load
// document.addEventListener("DOMContentLoaded", fetchGitHubProjects);

// Ensure projects are visible on load
function filterProjects(category) {
    let projects = document.querySelectorAll('.project-card');
    let buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[onclick="filterProjects('${category}')"]`).classList.add('active');

    projects.forEach(project => {
        if (category === "all" || project.classList.contains(category)) {
            project.style.display = "flex";
        } else {
            project.style.display = "none";
        }
    });
}


// AI Chatbot Functionality
function sendMessage() {
    const chatbox = document.getElementById("chatbox");
    const userInputField = document.getElementById("userInput");
    const userInput = userInputField.value.trim();
    
    if (userInput === "") return;

    chatbox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    let botResponse = "I'm still learning! Ask me about my projects.";
    if (userInput.toLowerCase().includes("hello")) {
        botResponse = "Hello! How can I help you today?";
    } else if (userInput.toLowerCase().includes("projects")) {
        botResponse = "You can view my projects in the Projects section above!";
    }

    setTimeout(() => {
        chatbox.innerHTML += `<p><strong>Bot:</strong> ${botResponse}</p>`;
        chatbox.scrollTop = chatbox.scrollHeight;
    }, 1000);

    userInputField.value = "";
}


// Three.js 3D Object
function initThreeJS() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("threeCanvas"), alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);  // Fill the entire screen or container
    document.getElementById("hero").appendChild(renderer.domElement);

    // Geometry: Torus Knot
    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    
    // Material: Using MeshStandardMaterial for more definition
    const material = new THREE.MeshStandardMaterial({
        color: 0x007bff,  // Bright blue color
        metalness: 0.7,   // Metalness to give a shiny appearance
        roughness: 0.2,   // A bit smoother surface
        emissive: 0x003366,  // Slight glowing effect for more definition
    });
    
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    camera.position.z = 50;

    // Lighting: Adding light to enhance material effects
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 1);  // Soft ambient light
    scene.add(ambientLight);

    // Animation loop for smooth movement
    function animate() {
        requestAnimationFrame(animate);

        // Slight rotation for the object
        torusKnot.rotation.x += 0.01;
        torusKnot.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    animate();
}

// Initialize Three.js when the page is ready
document.addEventListener("DOMContentLoaded", initThreeJS);



function filterProjects(category) {
    let projects = document.querySelectorAll('.project-card');
    let buttons = document.querySelectorAll('.filter-btn');

    // Remove active class from all buttons
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to the clicked button
    document.querySelector(`[onclick="filterProjects('${category}')"]`).classList.add('active');

    // Show/hide projects based on category
    projects.forEach(project => {
        if (category === "all" || project.classList.contains(category)) {
            project.style.display = "block";
        } else {
            project.style.display = "none";
        }
    });
}
// document.getElementById("contact-form").addEventListener("submit", function(event) {
//     event.preventDefault(); // Prevent page reload

//     let name = document.getElementById("name").value;
//     let email = document.getElementById("email").value;
//     let message = document.getElementById("message").value;

//     if (name && email && message) {
//         alert("Message sent successfully!");
//         this.reset(); // Clear form after submission
//     } else {
//         alert("Please fill in all fields.");
//     }
// });
//Chat bot function
function sendMessage() {
    const chatbox = document.getElementById("chatbox");
    const userInput = document.getElementById("userInput").value.trim();
    
    if (userInput === "") return;

    chatbox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    // Smart Responses Based on Keywords
    let botResponse = "I'm still learning! Ask me about my projects.";
    
    if (userInput.toLowerCase().includes("hello")) {
        botResponse = "Hello! How can I assist you today?";
    } else if (userInput.toLowerCase().includes("projects")) {
        botResponse = "You can view my projects in the Projects section above!";
    } else if (userInput.toLowerCase().includes("what is your name")) {
        botResponse = "I'm your friendly AI assistant. I don't have a personal name yet!";
    } else if (userInput.toLowerCase().includes("technology")) {
        botResponse = "I work with various technologies like JavaScript, Node.js, Three.js, and more!";
    }else if (userInput.toLowerCase().includes("Thank")) {
        botResponse = "My pleasure";
    } else if (userInput.toLowerCase().includes("what is your name")) {
        botResponse = "I'm your friendly AI assistant. I don't have a personal name yet!";
    }else {
        botResponse = "I didn't quite catch that. Could you rephrase?";
    }

    setTimeout(() => {
        chatbox.innerHTML += `<p><strong>Bot:</strong> ${botResponse}</p>`;
        chatbox.scrollTop = chatbox.scrollHeight;
    }, 1000);

    document.getElementById("userInput").value = "";
}

function filterProjects(category) {
    let projects = document.querySelectorAll('.project');
    let buttons = document.querySelectorAll('.filter-btn');

    // Remove active class from all buttons
    buttons.forEach(btn => btn.classList.remove('active'));

    // Add active class to the clicked button
    document.querySelector(`[onclick="filterProjects('${category}')"]`).classList.add('active');

    // Show/hide projects based on category
    projects.forEach(project => {
        if (category === "all" || project.classList.contains(category)) {
            project.style.display = "block";
        } else {
            project.style.display = "none";
        }
    });
}
emailjs.init('-t0-VFWF8G_Gz5sgK');  // Replace 'your_user_id' with your actual User ID from EmailJS

// Get the form element
const form = document.getElementById('contact-form');
const submitButton = form.querySelector('button');

// Handle form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior (page reload)

    // Disable the submit button and change text to "Sending..."
    submitButton.disabled = true;
    submitButton.innerText = 'Sending...';

    // Send the form data using emailjs.sendForm()
    emailjs.sendForm('service_yg8h93q', 'template_ijm3vhs', form) // Pass the form DOM element here
        .then(function(response) {
            console.log('Message sent successfully:', response);
            alert('Your message has been sent!');
            form.reset(); // Reset the form after successful submission
        })
        .catch(function(error) {
            console.error('Error sending message:', error);
            alert('Something went wrong. Please try again later.');
        })
        .finally(function() {
            // Re-enable the button and reset text
            submitButton.disabled = false;
            submitButton.innerText = 'Send Message';
        });
});