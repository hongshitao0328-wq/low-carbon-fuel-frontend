export const onRequestPost: PagesFunction = async ({ request }) => {
  const backend = "http://47.100.168.211:8000/api/chat";

  const body = await request.text();
  const resp = await fetch(backend, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  const outHeaders = new Headers(resp.headers);
  outHeaders.set("Access-Control-Allow-Origin", "*");

  return new Response(resp.body, {
    status: resp.status,
    headers: outHeaders,
  });
};

// 处理预检（避免某些浏览器/环境报错）
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Max-Age": "86400",
    },
  });
};
