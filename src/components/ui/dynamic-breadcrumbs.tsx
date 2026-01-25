import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface Step {
  label: string;
  href?: string;
}

export function DynamicBreadcrumbs({ steps }: { steps: Step[] }) {
  return (
    <Breadcrumb className="my-5.5">
      <BreadcrumbList className="text-sm md:text-base capitalize">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {steps.map((step) => (
          <React.Fragment key={step.href || step.label}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {step.href ? (
                <BreadcrumbLink href={step.href}>{step.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{step.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
