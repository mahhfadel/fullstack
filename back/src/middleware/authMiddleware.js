const jwt = require('jsonwebtoken');
require('dotenv').config();

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) return res.status(401).json({ message: 'Token não fornecido.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) return res.status(403).json({ message: 'Token inválido.' });

    req.usuario = usuario; 
    next();
  });
}

function autorizarRoles(...rolesPermitidas) {
  return (req, res, next) => {
    if (!rolesPermitidas.includes(req.usuario.role)) {
      return res.status(403).json({ message: 'Acesso negado. Permissão insuficiente.' });
    }
    next();
  };
}

module.exports = { autenticarToken, autorizarRoles };
