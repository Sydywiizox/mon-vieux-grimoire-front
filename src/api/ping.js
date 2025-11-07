export default async function handler(req, res) {
  const url = "https://mon-vieux-grimoire-6kf7.onrender.com"; // <-- remplace par ton URL Render

  try {
    const response = await fetch(url);
    console.log("Ping effectué :", response.status);
    return res.status(200).json({ success: true, status: response.status });
  } catch (err) {
    console.error("Erreur de ping :", err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
