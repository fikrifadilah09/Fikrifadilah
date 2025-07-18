onload = () => {
  document.body.classList.remove("container");

  const audio = document.getElementById("audio");
  const playPauseBtn = document.getElementById("play-pause");
  const progress = document.getElementById("progress");
  const volume = document.getElementById("volume");
  const lyrics = document.getElementById("lyrics");
  const lyricLines = lyrics.querySelectorAll("p");

  let isPlaying = false;

  // Play/pause toggle
  playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  });

  // Update play/pause button icon
  audio.addEventListener("play", () => {
    isPlaying = true;
    playPauseBtn.innerHTML = "&#10074;&#10074;"; // pause icon
  });

  audio.addEventListener("pause", () => {
    isPlaying = false;
    playPauseBtn.innerHTML = "&#9658;"; // play icon
  });

  // Update progress bar as audio plays
  audio.addEventListener("timeupdate", () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;

    // Highlight current lyric line
    for (let i = 0; i < lyricLines.length; i++) {
      const currentTime = audio.currentTime;
      const startTime = parseFloat(lyricLines[i].getAttribute("data-time"));
      const nextStartTime =
        i + 1 < lyricLines.length
          ? parseFloat(lyricLines[i + 1].getAttribute("data-time"))
          : audio.duration;

      if (currentTime >= startTime && currentTime < nextStartTime) {
        lyricLines.forEach((line) => line.classList.remove("active"));
        lyricLines[i].classList.add("active");
        break;
      }
    }
  });

  // Seek audio on progress bar change
  progress.addEventListener("input", () => {
    const seekTime = (progress.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  });

  // Volume control
  volume.addEventListener("input", () => {
    audio.volume = volume.value;
  });

  // Autoplay audio on page load (may be blocked by browser)
  audio.play().catch(() => {
    // Autoplay blocked, user must click play
  });
};
