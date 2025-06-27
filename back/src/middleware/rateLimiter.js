const rateLimitMap = new Map(); // { ip: { count: 0, timestamp: Date } }

function rateLimiter(req, res, next) {
  const ip = req.ip;
  const now = Date.now();

  const limite = 5; 
  const janela = 60 * 1000; 

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return next();
  }

  const data = rateLimitMap.get(ip);

  if (now - data.timestamp < janela) {
    if (data.count >= limite) {
      return res.status(429).json({ message: 'Muitas requisições. Tente novamente em 1 minuto.' });
    }
    data.count++;
  } else {
    data.count = 1;
    data.timestamp = now;
  }

  rateLimitMap.set(ip, data);
  next();
}

module.exports = rateLimiter;
