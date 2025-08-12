import axios from "axios";

export function getVariantShortUidFromCookie(): string | null {
  if (typeof document === "undefined") return null;

  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith("cs-personalize-manifest="));

  if (!raw) return null;

  try {
    const json = decodeURIComponent(raw.split("=", 2)[1]);
    const manifest = JSON.parse(json) as {
      activeVariants?: Record<string, string>;
      experiences?: Array<{ shortUid: string; activeVariantShortUid: string }>;
    };

    if (manifest?.activeVariants) {
      const exp = Object.keys(manifest.activeVariants)[0];
      const variant = manifest.activeVariants[exp];
      if (exp && variant) return `${exp}_${variant}`;
    }

    const exp = manifest?.experiences?.[0]?.shortUid;
    const variant = manifest?.experiences?.[0]?.activeVariantShortUid;
    return exp && variant ? `${exp}_${variant}` : null;
  } catch {
    return null;
  }
}

export function setVariantUID(variantUID: string | null): string | null {
  return variantUID ? `cs_personalize_${variantUID}` : null;
}

export async function fetchPageEntryByUid(
  contentTypeUid: string,
  entryUid: string,
  variantUid?: string | null
) {
  const base = `https://cdn.contentstack.io/v3/content_types/${contentTypeUid}/entries`;
  const url = `${base}/${entryUid}`;

  const headers: Record<string, string> = {
    api_key: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
    access_token: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN as string,
    "Content-Type": "application/json",
  };

  if (variantUid) {
    headers["x-cs-variant-uid"] = variantUid;
  }

  const res = await axios.get(url, { headers });
  return res.data.entry;
}
