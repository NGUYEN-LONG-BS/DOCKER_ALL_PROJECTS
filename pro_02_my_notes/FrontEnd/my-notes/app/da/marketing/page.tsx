// app/my-projects/next-js/page.tsx
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Content from "@/components/ContentFormat03";
import Advertisements from "@/components/Advertisements";
import { sidebarLinks } from "@/lib/marketing_sidebar";

export default function NextJsProjectHome() {
  return (
    <>
      <Header />
      <div className="flex-grow-1 d-flex">
        <Sidebar title="Marketing" links={sidebarLinks} />
        <Content
          title="Marketing"
          description="Các vấn đề mà mình quan tâm."
        >
          <p>Chọn vấn đề từ danh sách bên cạnh.</p>
        </Content>
        <Advertisements />
      </div>
    </>
  );
}