export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  const { endpoint } = req.query;
  if (!endpoint) return res.status(400).json({ error: 'Missing endpoint' });

  const url = 'https://v3.football.api-sports.io' + decodeURIComponent(endpoint);
  
  try {
    const r = await fetch(url, {
      headers: { 'x-apisports-key': 'd8d400006ba2c8b5303f770659b87862' }
    });
    const data = await r.json();
    res.setHeader('Cache-Control', 's-maxage=3600');
    return res.status(200).json(data);
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}
