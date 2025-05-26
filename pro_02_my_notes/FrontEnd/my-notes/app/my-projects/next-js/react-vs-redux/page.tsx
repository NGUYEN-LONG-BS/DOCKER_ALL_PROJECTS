// app/my-projects/next-js/react-vs-redux/page.tsx
import Header from "@/components/header/Header";
import Sidebar from "@/components/sideBar/Sidebar";
import Content from "@/components/content/ContentFormat03";
import Advertisements from "@/components/advertisement/Advertisements";
import ReactVsRedux from "@/components/reduxToolKit/ReactVsRedux";
import { sidebarLinks } from "@/lib/sideBar/sidebarLinks";

export default function ReactVsReduxPage() {
  return (
    <>
      <Header />
      <div className="flex-grow-1 d-flex">
        <Sidebar title="My projects" links={sidebarLinks} />
        <Content
          title="React vs Redux"
          description="Explore the differences between React, a UI library, and Redux, a state management library."
        >
          <ReactVsRedux />
        </Content>
        <Advertisements />
      </div>
    </>
  );
}