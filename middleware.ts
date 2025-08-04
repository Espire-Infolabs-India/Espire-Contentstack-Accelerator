import { NextRequest, NextResponse } from "next/server";
import { fetchRedirectEntry } from "./lib/contentstack-redirects";
import Personalize from "@contentstack/personalize-edge-sdk";

// 🧹 Ignore unnecessary paths
const ignoreRouteList = [
  "/favicon.ico",
  "/robots.txt",
  "/manifest.json",
  "/service-worker.js",
  "/_next", // Next.js static files
  "/.well-known",
];

export async function middleware(request: NextRequest) {
  console.log("🔥 Middleware executing:", request.nextUrl.href);

  const { pathname, search } = request.nextUrl;
  const fullPath = pathname + search;

  // ⛔ Ignore static/internal paths
  if (ignoreRouteList.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // 📦 Handle redirects from Contentstack
  let checkPath = pathname;
  if (pathname.endsWith("/")) {
    checkPath = pathname.slice(0, -1);
  }
  if (search.includes("gh_id=")) {
    checkPath = fullPath;
  }

  const redirectEntry = await fetchRedirectEntry(
    checkPath,
    request.nextUrl.locale || "en-us"
  );

  if (redirectEntry?.title) {
    const status = redirectEntry.status_code ? 302 : 301;
    return NextResponse.redirect(new URL(redirectEntry.to_url, request.url), status);
  }

  // 🧪 Personalization
  const projectUid = process.env.NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID as string;
  if (process.env.CONTENTSTACK_PERSONALIZE_EDGE_API_URL) {
    Personalize.setEdgeApiUrl(process.env.CONTENTSTACK_PERSONALIZE_EDGE_API_URL);
  }

  const personalizeSdk = await Personalize.init(projectUid, { request });
  const variantParam = personalizeSdk.getVariantParam();

  // 📄 Path filter for logging clarity
  console.log("📱 User Agent:", request.headers.get("user-agent"));
  console.log("🧪 Variant Query Param:", variantParam);
  console.log("📦 Manifest:", personalizeSdk);

  // 🎯 Rewrite URL with personalization param
  const parsedUrl = new URL(request.url);
  parsedUrl.searchParams.set(personalizeSdk.VARIANT_QUERY_PARAM, variantParam);

  const response = NextResponse.rewrite(parsedUrl);
  personalizeSdk.addStateToResponse(response);

  return response;
}

export const config = {
  matcher: ["/:path*"], // match all routes
  runtime: "nodejs",
};
