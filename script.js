// Select elements
const homePage = document.getElementById('homePage');
const birthdayMessage = document.getElementById('birthdayMessage');
const startButton = document.getElementById('startButton');
const questionContainer = document.getElementById('questionContainer');
const questionText = document.getElementById('questionText');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const endScreen = document.getElementById('endScreen');
const bgMusic = document.getElementById('bgMusic');

// Response pop-up element
const responsePopup = document.createElement('div');
responsePopup.id = 'responsePopup';
responsePopup.style.position = 'fixed';
responsePopup.style.top = '50%';
responsePopup.style.left = '50%';
responsePopup.style.transform = 'translate(-50%, -50%)';
responsePopup.style.backgroundColor = '#fff';
responsePopup.style.padding = '20px';
responsePopup.style.borderRadius = '10px';
responsePopup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
responsePopup.style.zIndex = '1000';
responsePopup.style.display = 'none';
document.body.appendChild(responsePopup);

// Error pop-up element
const errorPopup = document.createElement('div');
errorPopup.id = 'errorPopup';
errorPopup.textContent = "Are you serious?! Try again! 😡";
errorPopup.style.position = 'fixed';
errorPopup.style.top = '20px';
errorPopup.style.left = '50%';
errorPopup.style.transform = 'translateX(-50%)';
errorPopup.style.backgroundColor = '#ff4d4d';
errorPopup.style.color = '#fff';
errorPopup.style.padding = '10px 20px';
errorPopup.style.borderRadius = '5px';
errorPopup.style.zIndex = '1000';
errorPopup.style.display = 'none';
document.body.appendChild(errorPopup);

// Questions array with custom responses
const questions = [
  {
    question: "Do you know I adore you so much?",
    yesResponse: "I knew it! You’re my everything. ❤️",
    noResponse: "Liar! Your smile says otherwise. 😏",
    requireYes: false, // Doesn't require a "yes" answer
    gif: "gifs/0.gif", // Path to GIF for this question
  },
  {
    question: "Would you like to travel the world with me?",
    yesResponse: "Pack your bags, love! Let’s make memories. 🌎✈️",
    noResponse: "Too bad, I’m kidnapping you anyway. 😈",
    requireYes: false,
    gif: "gifs/1.gif",
  },
  {
    question: "Do you believe in soulmates? Because I think we're one.",
    yesResponse: "I knew you’d agree. We’re written in the stars. ✨",
    noResponse: "Well, I’ll just have to convince you every day. 😘",
    requireYes: true, // Requires a "yes" answer
    gif: "gifs/2.gif",
  },
  {
    question: "Is there anything in the world you'd rather do - than spend time with me?",
    yesResponse: "Ouch! But I’ll still win you over. 😉",
    noResponse: "That’s what I thought. You’re stuck with me. 😌",
    requireYes: false,
    gif: "gifs/3.gif",
  },
  {
    question: "Now that you’re 23, does that mean I get 23 kisses today?",
    yesResponse: "Deal! But I might sneak in a few extra. 😘",
    noResponse: "Too bad, I’m taking them anyway. 😈",
    requireYes: true, // Requires a "yes" answer
    gif: "gifs/4.gif",
  },
  {
    question: "Do I still give you butterflies… or have they all turned into birthday cake crumbs?",
    yesResponse: "Aww, you’re my forever butterfly. 🦋",
    noResponse: "Guess I’ll have to work harder to impress you. 😏",
    requireYes: false,
    gif: "gifs/5.gif",
  },
  {
    question: "Is your name ‘Birthday Queen’ today, or should I bow to ‘Her Majesty’ anyway?",
    yesResponse: "All hail the Birthday Queen! 👑🎉",
    noResponse: "Too late, I’m already on my knees. 😌",
    requireYes: false,
    gif: "gifs/6.gif",
  },
  {
    question: "If I steal a bite of your cake, will you punish me… or reward me?",
    yesResponse: "Reward it is! Here’s a kiss. 😘",
    noResponse: "Punishment? Fine, but I’ll still steal a bite. 😈",
    requireYes: false,
    gif: "gifs/7.gif",
  },
  {
    question: "If I told you I’m your birthday gift, would you promise to unwrap me slowly?",
    yesResponse: "I’ll take my time, love. You’re worth it. 🎁❤️",
    noResponse: "Too bad, I’m unwrapping you anyway. 😏",
    requireYes: false,
    gif: "gifs/8.gif",
  },
  {
    question: "Can I be the candle on your cake tonight? (I promise I’ll melt for you.)",
    yesResponse: "Melt away, my love. You’re the sweetest. 🕯️",
    noResponse: "Too bad, I’m already lighting up your life. 😏",
    requireYes: true, // Requires a "yes" answer
    gif: "gifs/9.gif",
  },
];

let currentQuestionIndex = 0;

// Typing effect for birthday message
function typeWriter(text, element, callback) {
    let index = 0;
    element.textContent = ""; // Clear any existing text
    const interval = setInterval(() => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(interval);
        if (callback) callback();
      }
    }, 50);
  }

// // Start the celebration
// document.addEventListener('DOMContentLoaded', () => {
//   const message = "Happy Birthday SHRUVU, My Love! 🎂💖\nYou're turning 23 today, and I couldn't be happier to celebrate this special day with you. You light up my life in ways I never thought possible. Thank you for being you—kind, beautiful, and absolutely amazing.";
//   typeWriter(message, birthdayMessage, () => {
//     startButton.classList.remove('hidden');
//   });
// });

// Start the game
startButton.addEventListener('click', () => {
  homePage.classList.add('hidden');
  questionContainer.classList.remove('hidden');
  questionContainer.style.opacity = 0;
  setTimeout(() => {
    questionContainer.style.opacity = 1;
    questionContainer.style.transform = 'scale(1)';
  }, 100);
  bgMusic.play();
  showNextQuestion();
});

// Show next question
function showNextQuestion() {
  if (currentQuestionIndex < questions.length) {
    // Update question text
    questionText.textContent = questions[currentQuestionIndex].question;

    // Add GIF to the card
    const gifElement = document.createElement('img');
    gifElement.src = questions[currentQuestionIndex].gif; // Load GIF from the question object
    gifElement.alt = "GIF for the question";
    gifElement.classList.add('question-gif');

    // Clear previous GIF
    const existingGif = questionContainer.querySelector('img');
    if (existingGif) {
      existingGif.remove();
    }

    // Append new GIF to the card
    questionContainer.insertBefore(gifElement, questionText);
  } else {
    questionContainer.classList.add('hidden');
    endScreen.classList.remove('hidden');
    endScreen.style.opacity = 0;
    setTimeout(() => {
      endScreen.style.opacity = 1;
      endScreen.style.transform = 'scale(1)';
    }, 100);
  }
}

// Handle yes button
yesButton.addEventListener('click', () => {
  // Show response pop-up with "yes" response
  responsePopup.innerHTML = `
    <p>${questions[currentQuestionIndex].yesResponse}</p>
    <button id="closeResponsePopup">Close</button>
  `;
  responsePopup.style.display = 'block';

  // Close response pop-up
  const closeResponsePopup = document.getElementById('closeResponsePopup');
  closeResponsePopup.addEventListener('click', () => {
    responsePopup.style.display = 'none';
    currentQuestionIndex++;
    showNextQuestion();
  });
});

// Handle no button
noButton.addEventListener('click', () => {
  if (questions[currentQuestionIndex].requireYes) {
    // Show error pop-up if "yes" is required
    errorPopup.style.display = 'block';
    noButton.classList.add('shake'); // Add shake animation
    setTimeout(() => {
      errorPopup.style.display = 'none';
      noButton.classList.remove('shake'); // Remove shake animation
    }, 2000);
  } else {
    // Show response pop-up with "no" response
    responsePopup.innerHTML = `
      <p>${questions[currentQuestionIndex].noResponse}</p>
      <button id="closeResponsePopup">Close</button>
    `;
    responsePopup.style.display = 'block';

    // Close response pop-up and proceed to the next question
    const closeResponsePopup = document.getElementById('closeResponsePopup');
    closeResponsePopup.addEventListener('click', () => {
      responsePopup.style.display = 'none';
      currentQuestionIndex++;
      showNextQuestion();
    });
  }
});

// Custom Particle System (same as before)
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y, size, type, velocity) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.type = type; // 'heart', 'emoji', or 'image'
    this.velocity = velocity;
    if (this.type === 'image') {
      this.image = new Image();
      this.image.src = `images/${Math.floor(Math.random() * 5)}.jpg`; // Load random image
      this.image.onload = () => {
        this.isLoaded = true; // Mark image as loaded
      };
      this.isLoaded = false; // Track if the image is loaded
    }
  }

  draw() {
    if (this.type === 'heart') {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.bezierCurveTo(
        this.x - this.size / 2, this.y - this.size / 2,
        this.x - this.size, this.y + this.size / 3,
        this.x, this.y + this.size
      );
      ctx.bezierCurveTo(
        this.x + this.size, this.y + this.size / 3,
        this.x + this.size / 2, this.y - this.size / 2,
        this.x, this.y
      );
      ctx.fillStyle = '#ff6f61';
      ctx.fill();
      ctx.closePath();
    } else if (this.type === 'emoji') {
      ctx.font = `${this.size}px Arial`;
      ctx.fillStyle = '#ff6f61';
      ctx.fillText('❤️', this.x, this.y);
    } else if (this.type === 'image' && this.isLoaded) {
      ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    if (this.y > canvas.height + this.size) {
      this.y = -this.size; // Reset to top when it falls off the screen
      this.x = Math.random() * canvas.width; // Randomize horizontal position
    }
  }
}

const particles = [];
const types = ['heart', 'emoji', 'image'];

function createParticles() {
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 30 + 10;
    const type = types[Math.floor(Math.random() * types.length)];
    const velocity = {
      x: (Math.random() - 0.5) * 2, // Horizontal drift
      y: Math.random() * 2 + 1 // Falling speed
    };
    particles.push(new Particle(x, y, size, type, velocity));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  particles.forEach(particle => particle.update());
  requestAnimationFrame(animateParticles); // Loop the animation
}

createParticles();
animateParticles();

// Resize canvas on window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Restart button functionality
const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', () => {
  // Reset the game state
  currentQuestionIndex = 0;
  endScreen.classList.add('hidden');
  homePage.classList.remove('hidden');
  birthdayMessage.textContent = ""; // Clear the birthday message
  typeWriter(
    "Happy Birthday SHRUVU, My Love! 🎂💖\nYou're turning 23 today, and I couldn't be happier to celebrate this special day with you. You light up my life in ways I never thought possible. Thank you for being you—kind, beautiful, and absolutely amazing.",
    birthdayMessage,
    () => {
      startButton.classList.remove('hidden');
    }
  );
});

const termsList = document.querySelector('.terms-list');
const acceptButton = document.getElementById('acceptTerms');
const termsPage = document.getElementById('termsPage');
const app = document.getElementById('app');

termsList.addEventListener('scroll', () => {
    // Enable accept button only after scrolling to bottom
    if (termsList.scrollTop + termsList.clientHeight >= termsList.scrollHeight - 50) {
      acceptButton.disabled = false;
      acceptButton.innerHTML = "I Accept These Sweet Terms! 💋";
    }
  });
  
  acceptButton.addEventListener('click', () => {
    termsPage.style.display = 'none'; // Hide terms page
    app.classList.remove('hidden'); // Show the main app
  
    // Start typing the birthday message ONLY after accepting the terms
    const message = "Happy Birthday, My Small Bubu! 🎂💖\nYou're turning 23 today, and I couldn't be happier to celebrate this special day with you. You light up my life in ways I never thought possible. Thank you for being you—kind, beautiful, and absolutely amazing.";
    typeWriter(message, birthdayMessage, () => {
      startButton.classList.remove('hidden'); // Show the start button after typing is done
    });
  });