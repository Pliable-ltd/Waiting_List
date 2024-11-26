document.addEventListener('DOMContentLoaded', function() {

    const FORM_API = "/api/submitToSheety";  // Call the serverless function instead of Sheety directly

    const form = document.getElementById('waitListForm');
    const output = document.getElementById('output');

    console.log(form); 
    console.log(output);  

    if (!form) {
        console.error("Form element with id 'waitingListForm' not found.");
        return;  // Exit if the form is not found to prevent further errors
    }

    // Function to validate email format
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    form.addEventListener('submit', async function(event) {
        event.preventDefault();  // Prevent default form submission

        const companyName = document.getElementById('company_name').value;
        const email = document.getElementById('email').value.trim();

        output.textContent = "";
        output.style.color = "";

        let isValid = true;
        if (!companyName) {
            isValid = false;
            showMessage("Company name is required.", "red");
        }
        if (!email) {
            isValid = false;
            showMessage("Email is required.", "red");
        } else if (!isValidEmail(email)) {
            isValid = false;
            showMessage("Please enter a valid email address.", "red");
        }

        // If form is valid, proceed with API call
        if (isValid) {
            try {
                // Make API call to submit data using the serverless function
                const response = await fetch(FORM_API, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        companyName: companyName,
                        email: email
                    })
                });

                // Handle API response
                if (response.ok) {
                    showMessage(`Thank you, ${companyName}! You've joined the waiting list.`, "white");
                    form.reset();  // Clear form fields
                } else {
                    showMessage("Error: Unable to submit. Please try again later.", "red");
                }
            } catch (error) {
                // Handle fetch error
                showMessage("Network error: Please check your connection and try again.", "red");
                console.error("Error:", error);
            }
        }
    });

    // Helper function to show messages
    function showMessage(message, color) {
        output.textContent = message;
        output.style.color = color;
    }

//     const sentences = [
//         "All in good time.",
//         "Good things come to those who wait.",
//         "Patience is a virtue.",
//         "Great things take time."
//     ];
//     let currentIndex = 0;
//     let charIndex = 0;
//     let isDeleting = false;
//     const minTypingSpeed = 50; 
//     const maxTypingSpeed = 100; 
//     const erasingSpeed = 50; 
//     const pauseBetweenSentences = 1500; 
//     const pauseBeforeDeleting = 1000; 
//     const targetElement = document.getElementById('slogan_text');
    
//     function type() {
//         const currentSentence = sentences[currentIndex];
//         const delay = isDeleting ? erasingSpeed : getRandomTypingSpeed();
    
//         if (!isDeleting) {
//             // Typing the characters
//             targetElement.textContent = currentSentence.substring(0, charIndex + 1);
//             charIndex++;
//             if (charIndex === currentSentence.length) {
//                 // When the entire sentence is typed, pause before deleting
//                 isDeleting = true;
//                 setTimeout(type, pauseBeforeDeleting);
//             } else {
//                 // Continue typing
//                 setTimeout(type, delay);
//             }
//         } else {
//             // Erasing the characters
//             targetElement.textContent = currentSentence.substring(0, charIndex - 1);
//             charIndex--;
//             if (charIndex === 0) {
//                 // When the entire sentence is erased, move to the next sentence
//                 isDeleting = false;
//                 currentIndex = (currentIndex + 1) % sentences.length; // Loop back to the first sentence
//                 setTimeout(type, minTypingSpeed);
//             } else {
//                 // Continue erasing
//                 setTimeout(type, delay);
//             }
//         }
//     }
    
//     function getRandomTypingSpeed() {
//         return Math.floor(Math.random() * (maxTypingSpeed - minTypingSpeed + 1)) + minTypingSpeed;
//     }
    
//     type(); // Start the typing effect
});

function updateVLineGradient() {
    // Get the viewport height
    const viewportHeight = window.innerHeight;

    // Calculate the top and bottom positions of the viewport
    const viewportTop = window.scrollY;
    const viewportBottom = viewportTop + viewportHeight;

    // Get the center of the viewport
    const viewportCenter = viewportTop + viewportHeight / 2;

    // Calculate the gradient
    const gradient = `
        linear-gradient(
            to bottom,
            #333333 ${viewportTop}px,
            #D16CA7 ${viewportCenter}px,
            #333333 ${viewportBottom}px
        )
    `;

    // Apply the gradient to the .vline element
    const vline = document.querySelector('.vline');
    if (vline) {
        vline.style.backgroundImage = gradient;
    }
}

// Attach the function to the scroll event
window.addEventListener('scroll', updateVLineGradient);

// Initial call to set the gradient on page load
updateVLineGradient();
