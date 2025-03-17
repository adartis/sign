/*
  script.js
  This file handles dynamic generation of event cards, the sign-up process,
  and the removal of registered attendees.
*/

// ==================================================================
// EVENT SIGN-UP CODE (unchanged from your original implementation)
// ==================================================================

// Define an array with sample events, each containing event details and an array for registered attendees.
let events = [
    {
      id: 1,
      name: "Highland Games",
      location: "Inverness",
      time: "14:00",
      date: "2025-04-15",
      capacity: 10,
      registered: [],
      image: "pic2.jpeg" // Update the path as necessary
    },
    {
      id: 2,
      name: "Scottish Festival",
      location: "Edinburgh",
      time: "18:00",
      date: "2025-05-01",
      capacity: 20,
      registered: [],
      image: "pic1.jpeg" // Update the path as necessary
    }
  ];
  
  // Variable to track the event currently being signed up for.
  let currentEventId = null;
  
  /**
   * Renders the event cards on the page.
   * Clears the container and then iterates through the events array,
   * creating and appending each event card with its details and buttons.
   */
  function renderEvents() {
    const container = document.getElementById('events-container');
    container.innerHTML = ''; // Clear existing content
  
    events.forEach(event => {
      // Create a card for the event.
      const card = document.createElement('div');
      card.className = 'event-card';
  
      // Create the image placeholder div.
      const imgPlaceholder = document.createElement('div');
      imgPlaceholder.className = 'image-placeholder';
      if (event.image) {
        // If an image path is provided, create an image element.
        const img = document.createElement('img');
        img.src = event.image;
        img.alt = event.name;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        imgPlaceholder.appendChild(img);
      } else {
        // Otherwise, show placeholder text.
        imgPlaceholder.textContent = 'Picture Placeholder';
      }
      card.appendChild(imgPlaceholder);
  
      // Create a div to hold event details.
      const detailsDiv = document.createElement('div');
      detailsDiv.className = 'event-details';
      detailsDiv.innerHTML = `
        <p><strong>Name:</strong> ${event.name}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Time:</strong> ${event.time}</p>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>People Registered:</strong> ${event.registered.length}</p>
        <p><strong>Places Left:</strong> ${event.capacity - event.registered.length}</p>
      `;
      card.appendChild(detailsDiv);
  
      // Create a "Sign Up" button and set up its click handler.
      const signUpBtn = document.createElement('button');
      signUpBtn.textContent = 'Sign Up';
      signUpBtn.addEventListener('click', () => openModal(event.id));
      card.appendChild(signUpBtn);
  
      // If there are registered attendees, list them with a "Remove" button for each.
      if (event.registered.length > 0) {
        const regDiv = document.createElement('div');
        regDiv.className = 'registered-users';
        const title = document.createElement('p');
        title.innerHTML = '<strong>Registered Users:</strong>';
        regDiv.appendChild(title);
  
        const list = document.createElement('ul');
        event.registered.forEach((attendee, index) => {
          const listItem = document.createElement('li');
          listItem.textContent = attendee;
  
          // Create a "Remove" button for the attendee.
          const removeBtn = document.createElement('button');
          removeBtn.textContent = 'Remove';
          removeBtn.addEventListener('click', () => {
            if (confirm(`Are you sure you want to remove ${attendee}?`)) {
              removeAttendee(event.id, index);
            }
          });
          listItem.appendChild(removeBtn);
          list.appendChild(listItem);
        });
        regDiv.appendChild(list);
        card.appendChild(regDiv);
      }
  
      // Append the event card to the container.
      container.appendChild(card);
    });
  }
  
  /**
   * Opens the sign-up modal and sets the current event ID.
   * @param {number} eventId - The identifier of the event for which to sign up.
   */
  function openModal(eventId) {
    currentEventId = eventId;
    const modal = document.getElementById('signup-modal');
    modal.style.display = 'flex'; // Make the modal visible (using flex layout)
  }
  
  /**
   * Closes the sign-up modal and resets the form.
   */
  function closeModal() {
    const modal = document.getElementById('signup-modal');
    modal.style.display = 'none';
    // Clear the input field.
    document.getElementById('attendee-name').value = '';
    currentEventId = null;
  }
  
  /**
   * Removes an attendee from a specific event.
   * @param {number} eventId - The identifier of the event.
   * @param {number} attendeeIndex - The index of the attendee to remove.
   */
  function removeAttendee(eventId, attendeeIndex) {
    events = events.map(event => {
      if (event.id === eventId) {
        // Remove the attendee using splice.
        event.registered.splice(attendeeIndex, 1);
      }
      return event;
    });
    renderEvents();
  }
  
  // Handle the sign-up form submission.
  document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const nameInput = document.getElementById('attendee-name');
    const attendeeName = nameInput.value.trim();
  
    if (attendeeName === '') {
      alert('Please enter your name.');
      return;
    }
  
    // Update the event with the new registration if there is available capacity.
    events = events.map(event => {
      if (event.id === currentEventId) {
        if (event.registered.length < event.capacity) {
          event.registered.push(attendeeName);
        } else {
          alert('No more places available for this event.');
        }
      }
      return event;
    });
  
    renderEvents(); // Re-render events to update counts and lists.
    closeModal();   // Close the sign-up modal.
  });
  
  // Event listener for the Cancel button in the modal.
  document.getElementById('cancel-btn').addEventListener('click', function() {
    closeModal();
  });
  
  // Initial rendering of events on page load.
  renderEvents();
  
  // ==================================================================
  // BOUNCING IMAGE CODE
  // ==================================================================
  
  /*
    The following code creates a bouncing image that moves across the page.
    When any bouncing image is clicked, it clones itself. Each clone is given
    a random velocity so that images move in different directions. A placeholder
    image reference is used (update 'path/to/your/placeholder.png' as needed).
  */
  
  // Array to store objects representing each bouncing image
  let bouncingImages = [];
  
  /**
   * Creates a bouncing image element and returns an object representing its state.
   * @param {number} x - The initial x-coordinate.
   * @param {number} y - The initial y-coordinate.
   * @param {number} vx - The horizontal velocity.
   * @param {number} vy - The vertical velocity.
   * @returns {Object} The bouncing image object.
   */
  function createBouncingImage(x, y, vx, vy) {
    // Create an image element
    const img = document.createElement('img');
    img.src = 'irnbru2.jpeg';  // Placeholder image source
    img.alt = 'Bouncing Image';
    // Set the image's CSS to allow absolute positioning
    img.style.position = 'absolute';
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    // Change the cursor to indicate the image is clickable
    img.style.cursor = 'pointer';
  
    // Add a click event listener to clone the image when clicked
    img.addEventListener('click', function(event) {
      // Prevent the click event from affecting other page elements
      event.stopPropagation();
      // Clone the image with a new random velocity
      cloneBouncingImage(this);
    });
  
    // Append the image element to the document body
    document.body.appendChild(img);
  
    // Return an object representing the image's state
    return { x, y, vx, vy, element: img };
  }
  
  /**
   * Clones an existing bouncing image and adds the new clone to the bouncingImages array.
   * @param {HTMLElement} originalImgElement - The original image element that was clicked.
   */
  function cloneBouncingImage(originalImgElement) {
    // Find the corresponding bouncing image object
    let originalObj = bouncingImages.find(imgObj => imgObj.element === originalImgElement);
    if (!originalObj) return;
  
    // Generate new random velocities (between -2 and 2, avoiding zero)
    const newVx = (Math.random() * 4) - 2;
    const newVy = (Math.random() * 4) - 2;
  
    // Create the new bouncing image clone at the same position as the original
    const cloneObj = createBouncingImage(originalObj.x, originalObj.y, newVx, newVy);
    bouncingImages.push(cloneObj);
  }
  
  /**
   * Animation loop that updates the position of each bouncing image and handles boundary collisions.
   */
  function animateBouncingImages() {
    bouncingImages.forEach(imgObj => {
      // Update position based on velocity
      imgObj.x += imgObj.vx;
      imgObj.y += imgObj.vy;
  
      // Get the current dimensions of the image
      const imgWidth = imgObj.element.offsetWidth;
      const imgHeight = imgObj.element.offsetHeight;
  
      // Check for collisions with the left and right boundaries
      if (imgObj.x <= 0) {
        imgObj.x = 0;
        imgObj.vx = -imgObj.vx;
      } else if (imgObj.x + imgWidth >= window.innerWidth) {
        imgObj.x = window.innerWidth - imgWidth;
        imgObj.vx = -imgObj.vx;
      }
  
      // Check for collisions with the top and bottom boundaries
      if (imgObj.y <= 0) {
        imgObj.y = 0;
        imgObj.vy = -imgObj.vy;
      } else if (imgObj.y + imgHeight >= window.innerHeight) {
        imgObj.y = window.innerHeight - imgHeight;
        imgObj.vy = -imgObj.vy;
      }
  
      // Update the element's CSS to reflect the new position
      imgObj.element.style.left = `${imgObj.x}px`;
      imgObj.element.style.top = `${imgObj.y}px`;
    });
  
    // Request the next animation frame
    requestAnimationFrame(animateBouncingImages);
  }
  
  // Create an initial bouncing image with a starting position and velocity
  // Starting at position (100, 100) with velocity (2, 2)
  bouncingImages.push(createBouncingImage(100, 100, 2, 2));
  
  // Start the animation loop for bouncing images
  animateBouncingImages();
  