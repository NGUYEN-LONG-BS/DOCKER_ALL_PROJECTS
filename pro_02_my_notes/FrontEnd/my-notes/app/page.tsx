// app/page.tsx
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Content from "@/components/ContentFormat02";
import Advertisements from "@/components/Advertisements";

export default function HomePage() {
  const sidebarLinks = [
    { href: "/kinh-te-vi-mo", label: "CFA" },
    { href: "/nguyen-ly-ke-toan", label: "ACCA" },
    { href: "/nguyen-ly-ke-toan", label: "Data Analyst" },
    { href: "/nguyen-ly-ke-toan", label: "My projects" },
  ];

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1 d-flex">
        <Sidebar title="MY NOTES" links={sidebarLinks} />
        <Content
          title="Tổng quan về web"
          description="Nơi tổng hợp kiến thức chuyên ngành."
          htmlFilePath="/home/intro.html"
        />
        <Advertisements />
      </main>
    </div>
  );
}