export const pageRouteMap = {
  home: "/",
  about: "/about",
  experience: "/experience",
  projects: "/projects",
  resume: "/resume",
  "contact-me": "/contact",
} as const;

const homeSectionRouteMap: Partial<Record<keyof typeof pageRouteMap, string>> =
  {
    about: "/#about",
    experience: "/#experience",
    "contact-me": "/#contact",
  };

export function getPageRoute(href: string) {
  return pageRouteMap[href as keyof typeof pageRouteMap] ?? href;
}

export function getNavHref(href: string, pathname: string) {
  // const normalizedPath = pathname === "/home" ? "/" : pathname;
  const pageRoute = getPageRoute(href);

  // if (normalizedPath === "/") {
  //   return (
  //     homeSectionRouteMap[href as keyof typeof pageRouteMap] ?? pageRoute
  //   );
  // }

  return pageRoute;
}

export function isNavItemActive(href: string, pathname: string) {
  // const normalizedPath = pathname === "/home" ? "/" : pathname;
  const pageRoute = getPageRoute(href);

  // if (normalizedPath === "/" && href in homeSectionRouteMap) {
  //   return false;
  // }

  return pathname === pageRoute;
}
