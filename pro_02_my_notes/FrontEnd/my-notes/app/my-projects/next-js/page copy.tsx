// app/my-projects/next-js/page.tsx
import Sidebar from "@/components/Sidebar";
import Content from "@/components/ContentFormat03";
import Advertisements from "@/components/Advertisements";
import ReduxToolkitContent from "@/components/ReduxToolkitContent";

export default function BootstrapHome() {
  const sidebarLinks = [
    { href: "/my-projects/next-js/ReduxToolkitContent", label: "redux-toolkit" },
    { href: "/my-projects/next-js/UseStateVsUseReducer", label: "UseState Vs UseReducer" },
    
  ];

  return (
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
  );
}