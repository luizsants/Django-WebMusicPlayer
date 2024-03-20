document.addEventListener("DOMContentLoaded", function () {
  const titleInput = document.getElementById("id_title");
  const titleLengthDisplay = document.getElementById("titleLength");
  const maxLength = 12; // Change this value to set the maximum length

  // Event listener to track changes in the title input
  titleInput.addEventListener("input", function () {
    const titleLength = titleInput.value.length;
    if (titleLength > maxLength) {
      titleInput.value = titleInput.value.slice(0, maxLength);
    }
    titleLengthDisplay.textContent = `${titleLength}/${maxLength} characters`;
  });
});
