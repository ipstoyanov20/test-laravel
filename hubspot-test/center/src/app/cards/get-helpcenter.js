// functions/get-helpcenter-articles.js
export async function main(context, sendResponse) {
  const { apiKey } = context.body;
  const resp = await fetch(`https://api.helpcenter.io/v1/articles`, {
    headers: {
      'Accept': 'application/json',
      'apikey': apiKey
    }
  });
  const data = await resp.json();
  sendResponse({
    statusCode: resp.ok ? 200 : 500,
    body: resp.ok ? data : { error: data }
  });
}
