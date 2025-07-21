// utils/beep.js
let beep;

export const prepareBeep = () => {
  beep = new Audio("/beep.mp3");
  beep.load();
  beep.play().then(() => {
    beep.pause();
    beep.currentTime = 0;
  }).catch(() => {
    // Expected to fail silently until user clicks
  });
};

export const playBeep = () => {
  if (!beep) beep = new Audio("/beep.mp3");
  beep.currentTime = 0;
  beep.play().catch(err => {
    console.warn("Beep failed:", err.message);
  });
};
