// app/my-projects/next-js/ReduxToolkitContent/page.tsx
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Content from "@/components/ContentFormat03";
import Advertisements from "@/components/Advertisements";
import ReduxToolkitContent from "@/components/ReduxToolkitContent";
import { sidebarLinks } from "@/lib/sidebarLinks";

export default function BootstrapHome() {
  return (
    <>
      <Header />
      <div className="flex-grow-1 d-flex">
        <Sidebar title="My projects" links={sidebarLinks} />
        <Content
          title="Redux Toolkit"
          description="Redux Toolkit là thư viện chính thức giúp đơn giản hóa Redux, giảm boilerplate code và tích hợp các best practices."
        >
          <ReduxToolkitContent />
        </Content>
        <Advertisements />
      </div>
    </>
  );
}