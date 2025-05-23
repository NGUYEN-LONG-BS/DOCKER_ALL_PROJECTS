import Sidebar from "@/components/Sidebar";
import Content from "@/components/ContentFormat02";
import Advertisements from "@/components/Advertisements";

export default function BootstrapHome() {
  const sidebarLinks = [
    { href: "#", label: "redux-toolkit" },
    
  ];

  return (
    <div className="flex-grow-1 d-flex">
      <Sidebar title="My projects" links={sidebarLinks} />
      <Content
        title="Redux Toolkit"
        description="Redux Toolkit là thư viện chính thức giúp đơn giản hóa Redux."
        htmlFilePath="/nextjs/redux-toolkit.html"
      />
      <Advertisements />
    </div>
  );
}