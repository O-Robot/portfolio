export const pageRouteMap = {
  home: "/",
  about: "/about",
  experience: "/experience",
  projects: "/projects",
  resume: "/resume",
  "contact-me": "/contact",
} as const;

export function getPageRoute(href: string) {
  return pageRouteMap[href as keyof typeof pageRouteMap] ?? href;
}

export function getNavHref(href: string) {
  return getPageRoute(href);
}

export function isNavItemActive(href: string, pathname: string) {
  const pageRoute = getPageRoute(href);

  return pathname === pageRoute;
}
