import Sidebar from "@/components/sideBar/Sidebar";
import Content from "@/components/content/ContentFormat01";
import Advertisements from "@/components/advertisement/Advertisements";

export default function BootstrapHome() {
  const sidebarLinks = [
    { href: "/nguyen-ly-ke-toan/cau-truc-tai-san", label: "Cấu trúc tài sản" },
    { href: "/nguyen-ly-ke-toan/get-started", label: "Bộ ba bất khả thi" },
    { href: "/nguyen-ly-ke-toan/containers", label: "Cơ chế tỷ giá" },
    { href: "/nguyen-ly-ke-toan/grid", label: "Vĩ mô tiền tệ" },
    { href: "/nguyen-ly-ke-toan/typography", label: "Cung tiền" },
    { href: "/nguyen-ly-ke-toan/colors", label: "Đường con lợi suất" },
    { href: "/nguyen-ly-ke-toan/tables", label: "Công cụ điều hành tỷ giá" },
    { href: "/nguyen-ly-ke-toan/images", label: "Cơ chế điều hành lãi suất" },
  ];

  return (
    <div className="flex-grow-1 d-flex">
      <Sidebar title="Nguyên lý kế toán" links={sidebarLinks} />
      <Content
        title="Nguyên lý kế toán - VAS"
        description="Nguyên lý kế toán đi kèm các văn bản pháp luật tại Việt Nam."
      >
        <p>Learn about fiscal policy and its impact on macroeconomics.</p>
      </Content>
      <Advertisements />
    </div>
  );
}