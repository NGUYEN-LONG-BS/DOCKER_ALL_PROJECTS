import Sidebar from "@/components/Sidebar";
import Content from "@/components/ContentFormat01";
import Advertisements from "@/components/Advertisements";

export default function BootstrapHome() {
  const sidebarLinks = [
    { href: "/bootstrap/home", label: "Chính sách tài khoá" },
    { href: "/kinh-te-vi-mo", label: "Bộ ba bất khả thi" },
    { href: "/bootstrap/containers", label: "Cơ chế tỷ giá" },
    { href: "/bootstrap/grid", label: "Vĩ mô tiền tệ" },
    { href: "/bootstrap/typography", label: "Cung tiền" },
    { href: "/bootstrap/colors", label: "Đường con lợi suất" },
    { href: "/bootstrap/tables", label: "Công cụ điều hành tỷ giá" },
    { href: "/bootstrap/images", label: "Cơ chế điều hành lãi suất" },
  ];

  return (
    <div className="flex-grow-1 d-flex">
      <Sidebar title="Kinh tế vĩ mô" links={sidebarLinks} />
      <Content
        title="Chính sách tài khoá"
        description="Chính sách tài khóa là việc sử dụng chi tiêu và thu thuế của chính phủ để ảnh hưởng đến nền kinh tế."
      >
        <p>Learn about fiscal policy and its impact on macroeconomics.</p>
      </Content>
      <Advertisements />
    </div>
  );
}