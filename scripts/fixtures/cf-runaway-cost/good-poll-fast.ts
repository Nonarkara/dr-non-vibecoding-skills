let delay = 2_000;

async function tick() {
  if (document.visibilityState === "hidden" || document.hidden) return;
  await fetch("https://my-worker.example.workers.dev/status");
  delay = Math.min(delay * 2, 60_000);
  setTimeout(tick, delay);
}

setInterval(tick, 2_000);
