// app/my-projects/next-js/react-vs-redux/page.tsx
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Content from "@/components/ContentFormat03";
import Advertisements from "@/components/Advertisements";
import ReactVsRedux from "@/components/ReactVsRedux";

export default function ReactVsReduxPage() {
  const sidebarLinks = [
    { href: "/my-projects/next-js/redux-toolkit", label: "Redux Toolkit" },
    { href: "/my-projects/next-js/use-state-vs-use-reducer", label: "UseState Vs UseReducer" },
    { href: "/my-projects/next-js/react-vs-redux", label: "React Vs Redux" },
  ];

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