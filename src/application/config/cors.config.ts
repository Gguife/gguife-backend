const frontendUrl = process.env.FRONTEND_URL?.replace(/\/$/, '') || '';

const allowedOrigin: any[] = [
  frontendUrl,
  'http://localhost:8080',
  'http://localhost:5173'
];

export default allowedOrigin;