function debugLogger(message: string[], title?: string) {
  const env = process.env["NODE_ENV"];
  if (env === "production") return;

  console.log("=== DEBUG START ===");
  if (title) console.log(`||> ${title} <||`);
  message.forEach((msg) => console.log(msg));
  console.log("=== DEBUG END ===");
}

export default debugLogger;
