// wakeLock.js
async function requestWakeLock() {
    try {
      const wakeLock = await navigator.wakeLock.request("screen");
      console.log('wakeLock is working')
      // Тут ви можете робити що завгодно у вашому додатку, і екран не вимикатиметься.
    } catch (err) {
      console.error("Неможливо отримати дозвіл на утримання екрану увімкненим: " + err.message);
    }
  }
  
  export default requestWakeLock;