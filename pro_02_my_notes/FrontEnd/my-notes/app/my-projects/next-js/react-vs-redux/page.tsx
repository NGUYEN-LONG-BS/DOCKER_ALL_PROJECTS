// app/my-projects/next-js/react-vs-redux/page.tsx
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Content from "@/components/ContentFormat03";
import Advertisements from "@/components/Advertisements";
import ReactVsRedux from "@/components/ReactVsRedux";
import { sidebarLinks } from "@/lib/sidebarLinks";

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