// app/my-projects/next-js/page.tsx
import Header from "@/components/header/Header";
import Sidebar from "@/components/sideBar/Sidebar";
import Content from "@/components/content/ContentFormat03";
import Advertisements from "@/components/advertisement/Advertisements";
import { sidebarTitle, sidebarLinks } from "@/lib/sideBar/marketing_sidebar";

export default function NextJsProjectHome() {
  return (
    <>
      <Header />
      <div className="flex-grow-1 d-flex">
        <Sidebar title={sidebarTitle} links={sidebarLinks} />
        <Content
          title="Marketing trong doanh nghiệp"
          description="Các vấn đề mà mình quan tâm."
        >
          <p>Chọn vấn đề từ danh sách bên cạnh.</p>
        </Content>
        <Advertisements />
      </div>
    </>
  );
}