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

  useEffect(() => {
    if (pathname !== location.pathname) {
      setPathname(location.pathname);
    }
  }, [location.pathname]);

  const pathParts = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {pathParts.length > 0 && <BreadcrumbSeparator />}
        {pathParts.map((part, index) => {
          const isLast = index === pathParts.length - 1;
          const path = "/" + pathParts.slice(0, index + 1).join("/");

          return (
            <div key={path} className="flex items-center gap-1.5">
              <BreadcrumbItem>
                <BreadcrumbLink href={isLast ? undefined : path}>
                  {capitalizeFirstLetter(part)}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
