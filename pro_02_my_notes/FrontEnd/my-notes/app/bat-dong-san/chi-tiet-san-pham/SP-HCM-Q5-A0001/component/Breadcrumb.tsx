import React from "react";

export interface BreadcrumbItem {
  label: string;
  link?: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => (
  <nav aria-label="breadcrumb">
    <ol className="breadcrumb mb-0 small">
      {items.map((item, idx) => (
        <li
          key={idx}
          className={
            "breadcrumb-item" + (item.active ? " active" : "")
          }
        >
          {item.active || !item.link ? (
            item.label
          ) : (
            <a href={item.link} className="text-decoration-none">
              {item.label}
            </a>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumb;
