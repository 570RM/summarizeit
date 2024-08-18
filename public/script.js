const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");

submitButton.disabled = true;

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);

function verifyTextLength() {
    const textarea = textArea.value;

    if (textarea.length > 200 && textarea.length < 100000) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

function submitData() {
    submitButton.classList.add("submit-button--loading");

    const text_to_summarize = textArea.value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "text_to_summarize": text_to_summarize
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch('/summarize', requestOptions)
        .then(response => response.text())
        .then(summary => {
            summarizedTextArea.value = summary;
            submitButton.classList.remove("submit-button--loading");
        })
        .catch(error => {
            console.error("Error:", error.message);
            submitButton.classList.remove("submit-button--loading");
        });
}

document.getElementById("custom-toggle").addEventListener("change", function() {
    const aboutSection = document.getElementById("about-section");
    const mainSection = document.querySelector("main");

    if (this.checked) {
        aboutSection.classList.remove("hidden");
        mainSection.classList.add("hidden");
    } else {
        aboutSection.classList.add("hidden");
        mainSection.classList.remove("hidden");
    }
});
