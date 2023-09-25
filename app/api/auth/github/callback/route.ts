export async function GET(req: Request) {
  return new Response("Hello World", {
    status: 200,
  });
}
