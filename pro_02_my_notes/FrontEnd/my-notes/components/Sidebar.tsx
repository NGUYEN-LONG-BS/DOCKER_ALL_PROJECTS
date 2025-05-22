import Link from "next/link";

export default function Sidebar({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <aside className="border-end d-none d-md-block overflow-auto" style={{ width: "250px" }}>
      <div className="p-3 border-bottom">
        <h2 className="fw-bold fs-5 mb-0">{title}</h2>
      </div>
      <nav className="p-0">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`d-block px-3 py-2 text-decoration-none ${
              index === 0 ? "bg-success text-white" : "hover-bg-light"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}