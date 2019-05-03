const delimiters = [
  '---committrs/hash---\n',
  '---committrs/date---\n',
  '---committrs/subject---\n',
  '---committrs/body---\n',
  '---committrs/files_changed---\n'
];
const BACKEND_HOST = process.env.NODE_ENV === 'production' ? 'https://committrs.io' : 'http://localhost:8000';

export { delimiters, BACKEND_HOST };

