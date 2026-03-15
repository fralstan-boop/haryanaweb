"use client";

import type { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <div className="service-card flex flex-col items-start">
      <div className="service-icon-wrapper">
        <Icon />
      </div>
      <h3 className="text-base font-semibold text-text-primary">
        {service.title}
      </h3>
      <p className="mt-2 text-sm text-text-secondary leading-relaxed flex-1">
        {service.description}
      </p>
    </div>
  );
}
