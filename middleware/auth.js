const auth = (req, res, next) => {
  // Skip auth for root route
  if (req.path === '/') {
    return next();
  }

  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== (process.env.API_KEY || 'my-secret-key')) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
  }
  next();
};

module.exports = auth;