const isProduction = process.env.NODE_ENV === 'production';

export const SERVER_HOST = isProduction ? 'https://api.committrs.io' : 'http://localhost:8000';
export const CLIENT_HOST = isProduction ? 'https://committrs.io' : 'http://localhost:3000';
export const GITHUB_ID = isProduction ? '435deb42a14081c0a9bf' : '0625adcece6c5651d9ea';

