// components/Sidebar.tsx
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  title: string;
  links: { href: string; label: string }[];
}

export default function Sidebar({ title, links }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="bg-light p-3" style={{ width: "250px" }}>
      <h2 className="mb-3">{title}</h2>
      <ul className="list-unstyled">
        {links.map((link) => (
          <li key={link.href} className="mb-2">
            <Link
              href={link.href}
              className={`text-decoration-none ${
                pathname === link.href ? "text-primary fw-bold" : "text-dark"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}