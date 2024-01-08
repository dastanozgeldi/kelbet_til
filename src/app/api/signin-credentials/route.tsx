export async function POST(request: Request) {
  const data = await request.json();

  const user = {
    id: 1,
    username: data.username,
    password: data.password,
  };

  return Response.json(user);
}
