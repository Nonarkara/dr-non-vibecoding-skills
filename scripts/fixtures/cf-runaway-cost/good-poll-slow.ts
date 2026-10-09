setInterval(async () => {
  await fetch("https://my-worker.example.workers.dev/status");
}, 10_000);
