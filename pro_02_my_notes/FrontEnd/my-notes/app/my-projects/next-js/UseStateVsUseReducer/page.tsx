// app/my-projects/next-js/UseStateVsUseReducer/page.tsx
import Sidebar from "@/components/sideBar/Sidebar";
import Content from "@/components/content/ContentFormat03";
import Advertisements from "@/components/advertisement/Advertisements";
import UseStateVsUseReducer from "@/components/reduxToolKit/UseStateVsUseReducer";
import { sidebarLinks } from "@/lib/sidebarLinks";

export default function BootstrapHome() {
  return (
    <div className="flex-grow-1 d-flex">
      <Sidebar title="My projects" links={sidebarLinks} />
      <Content
        title="Redux Toolkit"
        description="Redux Toolkit là thư viện chính thức giúp đơn giản hóa Redux, giảm boilerplate code và tích hợp các best practices."
      >
        <UseStateVsUseReducer />
      </Content>
      <Advertisements />
    </div>
  );
}