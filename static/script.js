const audioPlayer = document.getElementById("audio-player");
const audioSource = document.getElementById("audio-source");
const rotatingImage = document.getElementById("rotatingImage");
let isPlaying = false;

function updatePlaybackState() {
  if (audioPlayer.paused) {
    isPlaying = false;
    rotatingImage.classList.remove("rotate");
  } else {
    isPlaying = true;
    rotatingImage.classList.add("rotate");
  }
}

audioPlayer.addEventListener("play", updatePlaybackState);
audioPlayer.addEventListener("pause", updatePlaybackState);
audioPlayer.addEventListener("ended", updatePlaybackState);

// handle music play
function playMusic(url) {
  document.querySelectorAll(".music-buttons .button_m").forEach((button) => {
    button.classList.remove("playing");
  });
  audioSource.src = url;
  audioPlayer.load();
  audioPlayer.play();
  isPlaying = true;
  updatePauseButtonIcon();
  const currentButton = document.querySelector(
    `.music-buttons .button_m[data-url="${url}"]`
  );
  if (currentButton) {
    currentButton.classList.add("playing");
  }
}

audioPlayer.addEventListener("ended", function () {
  skipTo("forward");
});

// button pause and play
function togglePlayback() {
  if (isPlaying) {
    audioPlayer.pause();
  } else {
    audioPlayer.play();
  }
  isPlaying = !isPlaying;
  updatePauseButtonIcon();
}

audioPlayer.addEventListener("click", function (event) {
  const mouseX = event.pageX - this.getBoundingClientRect().left;
  const barWidth = this.offsetWidth;
  const newTime = (mouseX / barWidth) * this.duration;
  this.currentTime = newTime;
});
//-------------------------------------------------------------------------------------------------------
let currentIndex = -1;

// function to skip forwards or backwards the music list
function skipTo(direction) {
  const audioUrl = audioSource.src; // Get the current audio URL
  console.log("Current audio URL:", audioUrl);

  const musicButtons = document.querySelectorAll(".music-buttons .button_m");
  console.log("Music buttons:", musicButtons);
  console.log("Current index:", currentIndex);

  let newIndex = 0;

  if (direction === "forward") {
    newIndex = (currentIndex + 1) % musicButtons.length; // Calculate the index of the next music button
  } else if (direction === "backward") {
    newIndex = (currentIndex - 1 + musicButtons.length) % musicButtons.length; // Calculate the index of the previous music button
  }

  const newUrl = musicButtons[newIndex].getAttribute("data-url");
  playMusic(newUrl);

  // Update the currentIndex
  currentIndex = newIndex;
}

//-------------------------------------------------------------------------------------------------------
function updatePauseButtonIcon() {
  const pauseButton = document.querySelector(".button-pause");
  pauseButton.innerHTML = isPlaying ? "||" : "&#9658;"; // Unicode symbols for pause and play
}

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".button");

  // Attach event listeners to buttons
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const musicUrl = this.getAttribute("data-url");
      if (musicUrl) {
        playMusic(musicUrl);
      }
    });
  });
});


