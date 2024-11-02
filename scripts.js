document.addEventListener('DOMContentLoaded', function() {

    const FORM_API = "/api/submitToSheety";  // Call the serverless function instead of Sheety directly

    // Get the form and output elements
    const form = document.getElementById('waitListForm');
    const output = document.getElementById('output');

    console.log(form);  // This should log the form element. If it logs `null`, the form id might be incorrect.
    console.log(output);  // This should log the output element.

    if (!form) {
        console.error("Form element with id 'waitingListForm' not found.");
        return;  // Exit if the form is not found to prevent further errors
    }

    // Function to validate email format
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Function to handle form submission and make an API call
    form.addEventListener('submit', async function(event) {
        event.preventDefault();  // Prevent default form submission

        // Gather form data
        const companyName = document.getElementById('company_name').value;
        const email = document.getElementById('email').value.trim();

        // Clear previous output messages
        output.textContent = "";
        output.style.color = "";

        // Validate required fields
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

    const sentences = [
        "All in good time.",
        "Good things come to those who wait.",
        "Patience is a virtue.",
        "Great things take time."
    ];
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const minTypingSpeed = 50; // Minimum speed of typing (in ms)
    const maxTypingSpeed = 100; // Maximum speed of typing (in ms)
    const erasingSpeed = 50; // Speed of erasing (in ms)
    const pauseBetweenSentences = 1500; // Pause before typing the next sentence
    const pauseBeforeDeleting = 1000; // Pause before deleting after typing a sentence
    const targetElement = document.getElementById('slogan_text');
    
    function type() {
        const currentSentence = sentences[currentIndex];
        const delay = isDeleting ? erasingSpeed : getRandomTypingSpeed();
    
        if (!isDeleting) {
            // Typing the characters
            targetElement.textContent = currentSentence.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentSentence.length) {
                // When the entire sentence is typed, pause before deleting
                isDeleting = true;
                setTimeout(type, pauseBeforeDeleting);
            } else {
                // Continue typing
                setTimeout(type, delay);
            }
        } else {
            // Erasing the characters
            targetElement.textContent = currentSentence.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                // When the entire sentence is erased, move to the next sentence
                isDeleting = false;
                currentIndex = (currentIndex + 1) % sentences.length; // Loop back to the first sentence
                setTimeout(type, minTypingSpeed);
            } else {
                // Continue erasing
                setTimeout(type, delay);
            }
        }
    }
    
    function getRandomTypingSpeed() {
        return Math.floor(Math.random() * (maxTypingSpeed - minTypingSpeed + 1)) + minTypingSpeed;
    }
    
    type(); // Start the typing effect
});