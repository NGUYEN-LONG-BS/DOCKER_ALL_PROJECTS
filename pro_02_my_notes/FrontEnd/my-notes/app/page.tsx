// app/page.tsx
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Content from "@/components/ContentFormat02";
import Advertisements from "@/components/Advertisements";

export default function HomePage() {
  const sidebarLinks = [
    { href: "/cfa", label: "CFA" },
    { href: "/acca", label: "ACCA" },
    { href: "/da", label: "Data Analyst" },
    { href: "/my-projects", label: "My projects" },
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