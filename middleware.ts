import { NextRequest, NextResponse } from "next/server";
import { fetchRedirectEntry } from "./lib/contentstack-redirects";
import Personalize from "@contentstack/personalize-edge-sdk";

const ignoreRouteList = [
  "/favicon.ico",
  "/robots.txt",
  "/manifest.json",
  "/service-worker.js",
  "/_next",
  "/.well-known",
];

export async function middleware(request: NextRequest) {
  const { pathname, search, locale } = request.nextUrl;
  let path = pathname;
  let url = pathname + search;

  if (ignoreRouteList.some((route) => url.endsWith(route))) {
    return NextResponse.next();
  }

  const path2 = path.endsWith("/") ? path.slice(0, -1) : path + "/";
  if (search.includes("gh_id=")) {
    path = url;
  }
  const middlewarereredirectresponse = await fetchRedirectEntry(
    path,
    request.nextUrl.locale || "en-us"
  );
  const data = middlewarereredirectresponse;

  if (data && data.title != undefined) {
    const entry = data;
    const status = entry.status_code ? 302 : 301;
    return NextResponse.redirect(
      new URL(`${entry.to_url}`, request.url),
      status
    );
  }

  const projectUid = process.env
    .NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID as string;
  if (process.env.CONTENTSTACK_PERSONALIZE_EDGE_API_URL) {
    Personalize.setEdgeApiUrl(
      process.env.CONTENTSTACK_PERSONALIZE_EDGE_API_URL
    );
  }
  const personalizeSdk = await Personalize.init(projectUid, { request });
  const variantParam = personalizeSdk.getVariantParam();

  const parsedUrl = new URL(request.url);
  parsedUrl.searchParams.set(personalizeSdk.VARIANT_QUERY_PARAM, variantParam);

  const response = NextResponse.rewrite(parsedUrl);
  personalizeSdk.addStateToResponse(response);

  return response;
}

export const config = {
  matcher: ["/:path*"],
  runtime: "nodejs",
};
