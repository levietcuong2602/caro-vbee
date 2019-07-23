export default function calculateTimer(secondCount) {
  const minutes = Math.floor(secondCount / 60);
  const seconds = Math.floor(secondCount % 60);

  return {
    min: minutes < 10 ? "0" + minutes : minutes,
    sec: seconds < 10 ? "0" + seconds : seconds
  };
}
