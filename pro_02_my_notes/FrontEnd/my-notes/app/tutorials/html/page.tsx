import Sidebar from "@/components/sideBar/Sidebar";
import Content from "@/components/content/ContentFormat01";
import Advertisements from "@/components/advertisement/Advertisements";

export default function HtmlTutorial() {
  const sidebarLinks = [
    { href: "/tutorials/html/intro", label: "Introduction" },
    { href: "/tutorials/html/elements", label: "Elements" },
    { href: "/tutorials/html/attributes", label: "Attributes" },
  ];

  return (
    <div className="flex-grow-1 d-flex">
      <Sidebar title="HTML Tutorials" links={sidebarLinks} />
      <Content
        title="HTML Tutorial"
        description="HTML is the standard markup language for creating Web pages."
      >
        <p>Learn HTML with our comprehensive tutorials.</p>
      </Content>
      <Advertisements />
    </div>
  );
}