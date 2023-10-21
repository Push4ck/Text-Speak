// Initialize variables for voice selection and download button
let voices = [];
let voiceSelect = document.querySelector("select");
let downloadButton = document.getElementById("downloadButton");

// Function to convert text to speech and create a download link
function convertTextToSpeech() {
    // Get the selected voice and text from the user input
    const selectedVoice = voices[voiceSelect.value];
    const text = document.querySelector("textarea").value;

    // Check if a voice and text are selected
    if (selectedVoice && text) {
        // Create a SpeechSynthesisUtterance with the selected text and voice
        const speech = new SpeechSynthesisUtterance(text);
        speech.voice = selectedVoice;

        // Trigger the speech synthesis
        window.speechSynthesis.speak(speech);

        // When speech synthesis is complete, create a download link
        speech.onend = () => {
            // Create a Blob from the synthesized text
            const audioBlob = new Blob([new Uint8Array(new TextEncoder().encode(speech.text))], { type: 'audio/mpeg' });
            const audioUrl = URL.createObjectURL(audioBlob);

            // Create a download link for the user
            const a = document.createElement('a');
            a.href = audioUrl;
            a.download = 'speech.mp3';
            a.textContent = 'Download';
            a.style.display = 'block';
            downloadButton.style.display = 'block';
            downloadButton.innerHTML = ''; // Clear the previous content
            downloadButton.appendChild(a);
        };
    }
}

// Event listeners
// Update available voices when they change
window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    voiceSelect.options.length = 0;

    // Populate the voice selection dropdown with available voices
    voices.forEach((voice, i) => {
        voiceSelect.options[i] = new Option(voice.name, i);
    });
};

// Call the convertTextToSpeech function when the voice selection or button is clicked
voiceSelect.addEventListener("change", convertTextToSpeech);
document.querySelector("button").addEventListener("click", convertTextToSpeech);
