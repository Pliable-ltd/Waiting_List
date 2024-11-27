document.addEventListener('DOMContentLoaded', function() {

    const FORM_API = "/api/submitToSheety";

    const form = document.getElementById('waitListForm');
    const output = document.getElementById('output');

    console.log(form); 
    console.log(output);  

    if (!form) {
        console.error("Form element with id 'waitingListForm' not found.");
        return;
    }

    // Function to validate email format
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); 

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

        if (isValid) {
            try {
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

                if (response.ok) {
                    showMessage(`Thank you, ${companyName}! You've joined the waiting list.`, "white");
                    form.reset();  
                } else {
                    showMessage("Error: Unable to submit. Please try again later.", "red");
                }
            } catch (error) {
                showMessage("Network error: Please check your connection and try again.", "red");
                console.error("Error:", error);
            }
        }
    });

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


function handleScrollFade() {
    const scrollPosition = window.scrollY + window.innerHeight; 
    const documentHeight = document.documentElement.scrollHeight; 

    const cmToPx = 37.8;
    const triggerDistance = 10 * cmToPx; 

    const form = document.getElementById('form');
    const footerDiv = document.getElementById('footer_div');
    const waitingListDiv = document.getElementById('waitingListDiv');

    if (scrollPosition >= documentHeight - triggerDistance) {
        form.classList.add('fade-in');
        footerDiv.classList.add('fade-in');
        waitingListDiv.classList.add('fade-in'); 
    } else {
        form.classList.remove('fade-in');
        footerDiv.classList.remove('fade-in');
        waitingListDiv.classList.remove('fade-in'); 
    }
}

window.addEventListener('scroll', handleScrollFade);

handleScrollFade();
