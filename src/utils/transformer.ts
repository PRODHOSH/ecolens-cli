export function transformUrl(url: string, cloudName: string, baseUrl?: string): string {
  // Rules for exclusion
  if (!url) return url;
  if (url.endsWith('.svg')) return url;
  if (url.includes('cloudinary.com')) return url;
  if (url.startsWith('data:')) return url;
  if (url.startsWith('blob:')) return url;

  let finalUrl = url;
  
  // Handle relative URLs
  if (url.startsWith('/') && baseUrl) {
    const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    finalUrl = `${base}${url}`;
  } else if (!url.startsWith('http') && !url.startsWith('/') && baseUrl) {
    const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    finalUrl = `${base}${url}`;
  }

  // Build transformations
  const transformations = 'f_auto,q_auto,w_auto,dpr_auto';

  return `https://res.cloudinary.com/${cloudName}/image/fetch/${transformations}/${finalUrl}`;
}

export function rewriteContent(content: string, cloudName: string, baseUrl?: string): { newContent: string; count: number } {
  let count = 0;
  
  // Regex to find src="..." or src='...'
  // This covers <img>, <Image>, and general src attributes in JSX/HTML
  const srcRegex = /src=(["'])(?:(?!\1).)*\.(?:png|jpg|jpeg|webp|avif|gif)\1/gi;

  const newContent = content.replace(srcRegex, (match, quote) => {
    const url = match.slice(5, -1); // Extract URL between quotes
    
    // Check exclusions again just in case
    if (url.endsWith('.svg') || url.includes('cloudinary.com') || url.startsWith('data:') || url.startsWith('blob:')) {
      return match;
    }

    const transformed = transformUrl(url, cloudName, baseUrl);
    count++;
    return `src=${quote}${transformed}${quote}`;
  });

  return { newContent, count };
}
