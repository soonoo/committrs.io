const fetchWithErrorHandling = async ({ url, method = 'GET', options = {}}) => {
  const response = await fetch(url, {
    ...options,
    method,
  });
  if(!response.ok) throw new FetchResponseError(response);

  const json = await response.json();
  return json;
};

const FetchResponseError = (response) => {
  return new Error(`${response.status} ${response.statusText} - ${response.url}`);
}

export const GET = ({ url, options }) => fetchWithErrorHandling({ url, options });
export const POST = ({ url, options }) => fetchWithErrorHandling({ url, options, method: 'POST' });

