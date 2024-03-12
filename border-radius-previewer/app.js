// Get references to the box element and input fields
const box = document.getElementById('box');
const copyCssButton = document.getElementById('copy-css');
const radiusInputs = document.querySelectorAll('.radius-input');

// Function to update the box with the specified border-radius
function updateBox() {
    // Get the values from each input field
    const tl = document.getElementById('top-left').value + 'px';
    const tr = document.getElementById('top-right').value + 'px';
    const bl = document.getElementById('bottom-left').value + 'px';
    const br = document.getElementById('bottom-right').value + 'px';

    // Construct the border-radius CSS property value
    const cssValue = `${tl} ${tr} ${br} ${bl}`

    // Apply the border-radius to the box
    box.style.borderRadius = cssValue;
}

// Function to copy the CSS border-radius value to the clipboard
function copyCSS() {
    const tl = document.getElementById('top-left').value + 'px';
    const tr = document.getElementById('top-right').value + 'px';
    const bl = document.getElementById('bottom-left').value + 'px';
    const br = document.getElementById('bottom-right').value + 'px';

    // Construct the CSS border-radius property
    const cssValue = `border-radius: ${tl} ${tr} ${br} ${bl};`;

    // Copy the CSS value to the clipboard
    navigator.clipboard.writeText(cssValue)
        .then(() => alert('CSS copied to clipboard'))
        .catch(err => console.error('Error copying CSS: ', err));
}



// Function to validate input values and update the box
function validateInput(input) {
    console.log(123)
    const value = parseInt(input.value);
    // Check if the value is valid (not NaN and not negative)
    if (isNaN(value) || value < 0) {
        input.value = 0; // Set value to 0 if invalid
    }
    updateBox(); // Update the box with the new values
}


// Add event listeners for input fields to handle input changes
radiusInputs.forEach(input => {
    input.addEventListener('input', () => validateInput(input));
});

// Add event listener for the "Copy CSS" button
copyCssButton.addEventListener('click', copyCSS);
