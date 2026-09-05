export const site = {
  name: 'The Snooker Calendar',
  origin: (process.env.NEXT_PUBLIC_SITE_URL || 'https://snooker-calendar.lamkun-7559.chatgpt.site').replace(/\/$/, ''),
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  email: 'jieliang17@gmail.com',
  github: 'https://github.com/AirJay-dl',
  checked: '2026-09-05',
};
export const href = (path: string) => `${site.basePath}${path}`;
export const absolute = (path: string) => `${site.origin}${path}`;
export function metadata(title:string, description:string, path:string) {return {title,description,alternates:{canonical:absolute(path)},openGraph:{title,description,url:absolute(path),siteName:site.name,type:'website' as const,locale:'en_GB'},twitter:{card:'summary' as const,title,description}};}
export function jsonLd(data:unknown){return JSON.stringify(data).replace(/</g,'\\u003c');}
