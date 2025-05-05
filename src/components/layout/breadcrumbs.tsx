import { capitalizeFirstLetter } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export function Breadcrumbs() {
  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);

  // Update state when pathname changes
  useEffect(() => {
    if (pathname !== location.pathname) {
      setPathname(location.pathname); // Manually update the state
    }
  }, [location.pathname]);

  const pathParts = pathname.split("/").filter(Boolean);

  const breadcrumbs = pathParts.map((part, index) => ({
    name: capitalizeFirstLetter(part),
    path: "/" + pathParts.slice(0, index + 1).join("/"),
  }));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {breadcrumbs.map((breadcrumb) => (
          <BreadcrumbItem key={breadcrumb.path}>
            <BreadcrumbLink href={breadcrumb.path}>
              {breadcrumb.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
