const crypto = require('crypto');

exports.encode = (payload, secret) => {
  const algorithm = 'HS256';
  const header = {
    typ: 'JWT',
    alg: algorithm,
  };

  let jwt = `${base64Encode(JSON.stringify(header))}.${base64Encode(JSON.stringify(payload))}`;
  return (jwt += `.${sign(jwt, secret)}`);
};

const sign = (str, key) => {
  return crypto.createHmac('sha256', key).update(str).digest('base64');
};

const base64Encode = (str) => {
  return Buffer.from(str).toString('base64');
};
