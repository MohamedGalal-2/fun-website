document.addEventListener("DOMContentLoaded", () => {
    let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let enteredKeys = [];
    let clickCounter = 0;

    const nerdZoneLink = document.getElementById("nerd-zone-link");
    const hintModal = document.getElementById("hint");
    const hintMessage = document.getElementById("hint-message");
    const answerDiv = document.getElementById("answer"); // The div that will show the answer
    const nerdStuffSection = document.getElementById("nerd-stuff");
    const rickrollVideo = document.getElementById("rickroll-video");
    let konamiCodeEntered = false; // To track if the Konami code has been entered

    // Listen for keydown events to detect Konami code
    document.addEventListener("keydown", (e) => {
        enteredKeys.push(e.keyCode);

        if (enteredKeys.toString().includes(konamiCode.toString())) {
            // Show the nerd stuff section
			nerdStuffSection.classList.remove("hidden");

			// Random nerd titles
			const nerdTitles = [
			"🕹️ Secret Level Unlocked!",
			"👾 You Found the Easter Egg!",
			"🎮 Developer Room Access Granted",
			"🔓 Developer Backdoor",
			"🎶 Rickrolled in Style",
			"Too Curious, Aren’t You?",
			"Oops... You Triggered the Trap!"
			];

			// Pick one randomly and set it as the heading
			const randomTitle = nerdTitles[Math.floor(Math.random() * nerdTitles.length)];
			document.querySelector('#nerd-stuff h2').innerHTML = `<i class="fas fa-microchip"></i> ${randomTitle}`;

			// Play video
			rickrollVideo.play();

			// Mark code as entered
			konamiCodeEntered = true;

			// Scroll smoothly
			nerdStuffSection.scrollIntoView({ behavior: "smooth" });

			// Reset input keys
			enteredKeys = [];
		}
    });

    // Listen for clicks on the Nerd Zone link in the navbar
    nerdZoneLink.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default link behavior
        clickCounter++; // Increment click counter

        if (konamiCodeEntered) {
            // If Konami code has been entered, scroll to the nerd-stuff section
            nerdStuffSection.scrollIntoView({ behavior: "smooth" });

            // Prevent the hint modal from opening when the user clicks the link after Konami code
            return; // Skip the rest of the logic
        }

        // Define your hints
		const hints = [
			"Psst... Try a classic cheat code to access the secret zone!", 
			"Think about something gamers from the '90s would know well.",
			"It's a sequence of arrows and buttons..."
		];

		// Show hints for the first 3 clicks, then reveal the answer
		if (clickCounter <= 3) {
			hintModal.style.display = "block";
			answerDiv.style.display = "none"; // Hide answer
			hintMessage.textContent = hints[clickCounter - 1]; // Show different hint each click
		} else {
			// On the 4th click and beyond, show the answer
			hintModal.style.display = "block";
			answerDiv.style.display = "block"; // Show answer
			hintMessage.textContent = ""; // Clear the hint message
		}
    });

    // Close the hint modal when the close button is clicked
    const closeBtn = document.getElementById("close-btn");
    closeBtn.addEventListener("click", () => {
        hintModal.style.display = "none"; // Hide the hint modal
    });
});
