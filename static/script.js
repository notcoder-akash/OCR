// Handle the form submission and display OCR result
document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from refreshing the page

    var formData = new FormData(this);
    var resultDiv = document.getElementById('result');
    var extractedText = document.getElementById('extracted-text');
    var loadingDiv = document.getElementById('loading');
    var copyButton = document.getElementById('copy-btn');
    
    resultDiv.style.display = 'none';  // Hide previous results
    loadingDiv.style.display = 'block';  // Show loading indicator
    copyButton.textContent = 'Copy Text';  // Reset button text

    // Send the image to the server using Fetch API
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        loadingDiv.style.display = 'none';  // Hide loading indicator

        if (data.text) {
            extractedText.textContent = data.text;
            resultDiv.style.display = 'block';  // Show the result section
        } else {
            extractedText.textContent = "No text extracted.";
            resultDiv.style.display = 'block';
        }
    })
    .catch(error => {
        loadingDiv.style.display = 'none';  // Hide loading on error
        console.error('Error:', error);
    });
});

// Add functionality for copying text to clipboard
document.getElementById('copy-btn').addEventListener('click', function() {
    var text = document.getElementById('extracted-text').textContent;
    
    // Copy the text to clipboard
    navigator.clipboard.writeText(text).then(function() {
        // Change the button text to a checked mark (✓) after copying
        document.getElementById('copy-btn').textContent = '✓ Copied';
        
        // Optionally, change the button color or style after copying
        document.getElementById('copy-btn').style.backgroundColor = '#4CAF50';  // Green color
        document.getElementById('copy-btn').style.color = '#fff';
        
        // Reset button after a short delay
        setTimeout(function() {
            document.getElementById('copy-btn').textContent = 'Copy Text';
            document.getElementById('copy-btn').style.backgroundColor = '';  // Reset background color
        }, 2000);  // Reset button text after 2 seconds
    }).catch(function(error) {
        console.error('Error copying text: ', error);
    });
});
