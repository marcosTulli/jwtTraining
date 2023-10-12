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

exports.decode = (token, secret) => {
  const segments = token.split('.');
  if (segments.length !== 3) {
    throw new Error('Token structure incorrect');
  }
  const header = JSON.parse(base64Decode(segments[0]));
  const payload = JSON.parse(base64Decode(segments[1]));
  const rawSignature = `${segments[0]}.${segments[1]}`;
  if (!verify(rawSignature, secret, segments[2])) {
    throw new Error('Verification failed');
  }
  return payload;
};

const verify = (raw, secret, signature) => {
  return signature === sign(raw, secret);
};

const sign = (str, key) => {
  return crypto.createHmac('sha256', key).update(str).digest('base64');
};

const base64Encode = (str) => {
  return Buffer.from(str).toString('base64');
};

const base64Decode = (str) => {
  return Buffer.from(str, 'base64').toString();
};
