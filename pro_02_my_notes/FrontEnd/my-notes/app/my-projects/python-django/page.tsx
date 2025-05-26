import Sidebar from "@/components/sideBar/Sidebar";
import Content from "@/components/content/ContentFormat01";
import Advertisements from "@/components/advertisement/Advertisements";

export default function BootstrapHome() {
  const sidebarLinks = [
    { href: "/my-projects/Django", label: "Python - Django" },
    { href: "/my-projects/Data-Analysis", label: "Python - Data Analysis" },
    
  ];

  return (
    <div className="flex-grow-1 d-flex">
      <Sidebar title="My projects" links={sidebarLinks} />
      <Content
        title="Xây dựng Backend server với Python Django"
        description="Sử dụng Python và Django để xây dựng một backend server để lưu trữ dữ liệu và truy vấn dữ liệu."
      >
        <p>Cách xây dựng một backend server với Python Django.</p>
      </Content>
      <Advertisements />
    </div>
  );
}