import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    console.log(`bắt đầu vào proxy: ` + req);
    const accessToken = req.headers.get("authorization");
    console.log(`accessToken: ` + accessToken);
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body =null;
    try {
      // Lấy request body
      body = await req.json();
      console.log("🔵 Request Body:", body);
    } catch (error) {
      console.error("🔴 JSON Parse Error:", error);
    }

    const apiUrl = "https://XXXXXXX";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${accessToken}`, //`Bearer ${accessToken.trim()}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    console.log("🟢 Response Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("🔴 API Error:", errorText);
      return NextResponse.json(
        { error: `HTTP error! Status: ${response.status} - ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("🔴 API Fetch Error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
