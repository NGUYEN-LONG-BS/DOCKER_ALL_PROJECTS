// app/my-projects/next-js/[slug]/page.tsx
import Sidebar from "@/components/Sidebar";
import Content from "@/components/ContentFormat03";
import Advertisements from "@/components/Advertisements";
import ReduxToolkitContent from "@/components/ReduxToolkitContent";
import UseStateVsUseReducer from "@/components/UseStateVsUseReducer";
import { notFound } from "next/navigation";

export default function NextJsProjectPage({ params }: { params: { slug: string } }) {
  const sidebarLinks = [
    { href: "/my-projects/next-js/redux-toolkit", label: "Redux Toolkit" },
    { href: "/my-projects/next-js/redux-toolkit2", label: "Redux Toolkit 2" },
    { href: "/my-projects/next-js/use-state-vs-use-reducer", label: "UseState Vs UseReducer" },
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
    "redux-toolkit2": {
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