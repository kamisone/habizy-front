import { NextRequest, NextResponse } from 'next/server';

const BACKEND = process.env.API_BASE_URL_SERVER ?? 'http://127.0.0.1:4000';

type Context = { params: Promise<{ path: string[] }> };

async function handler(request: NextRequest, { params }: Context): Promise<NextResponse> {
  const { path } = await params;
  const upstream = `${BACKEND}/${path.join('/')}${request.nextUrl.search}`;

  const headers = new Headers();
  for (const key of ['authorization', 'content-type', 'accept', 'x-request-id']) {
    const val = request.headers.get(key);
    if (val) headers.set(key, val);
  }

  const hasBody = !['GET', 'HEAD'].includes(request.method);

  try {
    const res = await fetch(upstream, {
      method: request.method,
      headers,
      body: hasBody ? await request.arrayBuffer() : undefined,
      cache: 'no-store',
    });

    const body = await res.arrayBuffer();
    return new NextResponse(body, {
      status: res.status,
      headers: {
        'Content-Type': res.headers.get('Content-Type') ?? 'application/json',
      },
    });
  } catch {
    return NextResponse.json({ message: 'Service indisponible' }, { status: 503 });
  }
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
