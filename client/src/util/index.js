const fetchWithErrorHandling = ({ url, method, options } = { method: 'GET', options: {} }) => {
  return (
    fetch(url, {
      ...options,
      method,
    })
    .then(response => response.json())
    .catch(e => e)
  );
};

export const GET = ({ url, options }) => fetchWithErrorHandling({ url, options });
export const POST = ({ url, options }) => fetchWithErrorHandling({ url, options, method: 'POST' });
