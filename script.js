document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("inputForm");
  const responseContainer = document.getElementById("responseContainer");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const input = document.getElementById("inputBox");
    const text = input.value.trim();

    responseContainer.textContent = "Wait...";

    if (text !== "") {
      const data = {
        text: text,
      };

      fetch("http://localhost:3000/api/v1/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            // Handle successful response
            responseContainer.textContent = "";
            return response.json();
          } else {
            // Handle error response
            responseContainer.textContent = "Error occurred. Please try again.";
            throw new Error("Error sending post request");
          }
        })
        .then((json) => {
          responseContainer.textContent = json.response;
        })
        .catch((error) => {
          // Handle network error
          responseContainer.textContent = "Error. Sue the developer.";
          console.log("Network error:", error);
        });
    }
  });
});
