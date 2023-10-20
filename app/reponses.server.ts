export const badRequest = new Response(null, {
  status: 400,
  statusText: "Bad Request"
});

export const notFound = new Response(null, {
  status: 404,
  statusText: "Not Found"
});
