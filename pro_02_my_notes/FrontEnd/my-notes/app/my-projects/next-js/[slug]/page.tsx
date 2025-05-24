// app/my-projects/next-js/[slug]/page.tsx
import Sidebar from "@/components/Sidebar";
import Content from "@/components/ContentFormat03";
import Advertisements from "@/components/Advertisements";
import ReduxToolkitContent from "@/components/ReduxToolkitContent";
import UseStateVsUseReducer from "@/components/UseStateVsUseReducer";
import ReactVsRedux from "@/components/ReactVsRedux";
import { notFound } from "next/navigation";

export default function NextJsProjectPage({ params }: { params: { slug: string } }) {
  const sidebarLinks = [
    { href: "/my-projects/next-js/redux-toolkit", label: "Redux Toolkit" },
    { href: "/my-projects/next-js/use-state-vs-use-reducer", label: "UseState Vs UseReducer" },
    { href: "/my-projects/next-js/react-vs-redux", label: "React Vs Redux" },
  ];

  // Mapping slug to content
  const contentMap: Record<
    string,
    { title: string; description: string; component: React.ReactNode }
  > = {
    "redux-toolkit": {
      title: "1 Redux Toolkit",
      description:
        "1Redux Toolkit là thư viện chính thức giúp đơn giản hóa Redux, giảm boilerplate code và tích hợp các best practices.",
      component: <ReduxToolkitContent />,
    },
    "use-state-vs-use-reducer": {
      title: "2 Phân biệt useState và useReducer",
      description:
        "2Tìm hiểu sự khác biệt giữa hai hook useState và useReducer trong React.",
      component: <UseStateVsUseReducer />,
    },
    "react-vs-redux": {
      title: "React vs Redux",
      description:
        "Explore the differences between React, a UI library, and Redux, a state management library.",
      component: <ReactVsRedux />,
    },
  };

  // Lấy nội dung dựa trên slug, hoặc trả về 404 nếu không tìm thấy
  const content = contentMap[params.slug] || notFound();

  return (
    <div className="flex-grow-1 d-flex">
      <Sidebar title="My projects" links={sidebarLinks} />
      <Content title={content.title} description={content.description}>
        {content.component}
      </Content>
      <Advertisements />
    </div>
  );
}