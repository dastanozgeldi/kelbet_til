"use client";

import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import { links } from "@/data/config";

export default function AdminHeader() {
  const pathname = usePathname();

  // Split pathname into segments, removing empty strings
  const pathSegments = pathname.split("/").filter(Boolean);

  // Build breadcrumb items
  const breadcrumbItems = [];

  // Always add "Админ" as the root
  breadcrumbItems.push({
    label: "Админ",
    href: "/admin",
    isCurrentPage: pathname === "/admin",
  });

  // If we have more than just /admin, add subsequent segments
  if (pathSegments.length > 1) {
    // Check if the second segment matches a known item
    const itemUrl = `/${pathSegments[0]}/${pathSegments[1]}`;
    const matchedItem = links.find((item) => item.url === itemUrl);

    if (matchedItem) {
      const isLastSegment = pathSegments.length === 2;
      breadcrumbItems.push({
        label: matchedItem.title,
        href: matchedItem.url,
        isCurrentPage: isLastSegment,
      });

      // Add any additional dynamic segments (like IDs)
      if (pathSegments.length > 2) {
        let currentPath = itemUrl;
        for (let i = 2; i < pathSegments.length; i++) {
          currentPath += `/${pathSegments[i]}`;
          const isLast = i === pathSegments.length - 1;
          breadcrumbItems.push({
            label: pathSegments[i],
            href: currentPath,
            isCurrentPage: isLast,
          });
        }
      }
    }
  }

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((breadcrumb, index) => (
            <Fragment key={breadcrumb.href}>
              <BreadcrumbItem
                className={index === 0 ? "hidden md:block" : undefined}
              >
                {breadcrumb.isCurrentPage ? (
                  <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={breadcrumb.href}>
                    {breadcrumb.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbItems.length - 1 && (
                <BreadcrumbSeparator
                  key={`sep-${index}`}
                  className={index === 0 ? "hidden md:block" : undefined}
                />
              )}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
