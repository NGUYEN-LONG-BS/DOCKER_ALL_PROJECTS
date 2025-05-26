// app/my-projects/next-js/[slug]/page.tsx
import Header from "@/components/header/Header";
import Sidebar from "@/components/sideBar/Sidebar";
import Content from "@/components/content/ContentFormat03";
import Advertisements from "@/components/advertisement/Advertisements";
import ReduxToolkitContent from "@/components/reduxToolKit/ReduxToolkitContent";
import UseStateVsUseReducer from "@/components/reduxToolKit/UseStateVsUseReducer";
import ReactVsRedux from "@/components/reduxToolKit/ReactVsRedux";
import ReactHooksCheatSheet from "@/components/reduxToolKit/ReactHooksCheatSheet";
import { notFound } from "next/navigation";
import { sidebarLinks } from "@/lib/sidebarLinks";

export default function NextJsProjectPage({ params }: { params: { slug: string } }) {
  // Mapping slug to content
  const contentMap: Record<
    string,
    { title: string; description: string; component: React.ReactNode }
  > = {
    "redux-toolkit": {
      title: "Redux Toolkit",
      description:
        "Redux Toolkit là thư viện chính thức giúp đơn giản hóa Redux, giảm boilerplate code và tích hợp các best practices.",
      component: <ReduxToolkitContent />,
    },
    "use-state-vs-use-reducer": {
      title: "Phân biệt useState và useReducer",
      description:
        "Tìm hiểu sự khác biệt giữa hai hook useState và useReducer trong React.",
      component: <UseStateVsUseReducer />,
    },
    "react-vs-redux": {
      title: "React vs Redux",
      description:
        "Explore the differences between React, a UI library, and Redux, a state management library.",
      component: <ReactVsRedux />,
    },
    "react-hooks-cheat-sheet": {
          title: "React Hooks Cheat Sheet",
          description:
            "A comprehensive guide to React Hooks, including useState, useEffect, useContext, and more.",
          component: <ReactHooksCheatSheet />,
    },
  };

  // Lấy nội dung dựa trên slug, hoặc trả về 404 nếu không tìm thấy
  const content = contentMap[params.slug] || notFound();

  return (
    <>
      <Header />
      <div className="flex-grow-1 d-flex">
        <Sidebar title="My projects" links={sidebarLinks} />
        <Content title={content.title} description={content.description}>
          {content.component}
        </Content>
        <Advertisements />
      </div>
    </>
  );
}