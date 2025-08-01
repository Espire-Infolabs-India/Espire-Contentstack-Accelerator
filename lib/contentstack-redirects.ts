
import { RedirectProps } from "../model/Redirect";
export async function fetchRedirectEntry(path: string,locale: string): Promise<RedirectProps| null> { 

    //console.log(`Fetching redirect entry for path: ${path} and locale: ${locale}`);
    const environment = process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT;
    const apiKey = process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY;
    const accessToken = process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN;
    const host = "cdn.contentstack.io";

    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Site-1";

    //const redirectApi = `https://${host}/v3/content_types/_redirect/entries?environment=${environment}&locale=${locale}&include_count=true&query={"from_url":"${path}"}`;  
    //{"$and":[{"title": "Redmi Note 3"},{"color": "Gold"}]}
    const redirectApi = `https://${host}/v3/content_types/_redirect/entries?environment=${environment}&locale=${locale}&include_count=true&query={"$and":[{"from_url": "${path}"},{"site_configuration.site_section": "${siteName}"}]}`;  


     
     
    const response = await fetch(redirectApi, {
      headers: {
        api_key: apiKey!,
        access_token: accessToken!,
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  
    if (!response.ok) {
      console.error(`Redirect check failed: ${response.statusText}`);
      return null;
    }
  
    const data = await response.json();
    return data.entries && data.entries.length > 0 ? data.entries[0] : null;
  } 