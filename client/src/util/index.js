const fetchWithErrorHandling = ({ url, method = 'GET', options = {}}) => {
  return (
    fetch(url, {
      ...options,
      method,
    })
    .then(response => {
      if(!response.ok) throw new FetchResponseError(response);
      return response;
    })
    .then(response => response.json())
  );
};

const FetchResponseError = (response) => {
  return new Error(`${response.status} ${response.statusText} - ${response.url}`);
}

export const GET = ({ url, options }) => fetchWithErrorHandling({ url, options });
export const POST = ({ url, options }) => fetchWithErrorHandling({ url, options, method: 'POST' });
