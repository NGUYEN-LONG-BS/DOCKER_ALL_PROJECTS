// app/my-projects/next-js/page.tsx
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Content from "@/components/ContentFormat03";
import Advertisements from "@/components/Advertisements";
import { sidebarLinks } from "@/lib/sidebarLinks";

export default function NextJsProjectHome() {
  // const sidebarLinks = [
  //   { href: "/my-projects/next-js/redux-toolkit", label: "Redux Toolkit" },
  //   {
  //     href: "/my-projects/next-js/use-state-vs-use-reducer",
  //     label: "UseState Vs UseReducer",
  //   },
  //   {
  //     href: "/my-projects/next-js/react-vs-redux",
  //     label: "React Vs Redux",
  //   },
  // ];

  return (
    <>
      <Header />
      <div className="flex-grow-1 d-flex">
        <Sidebar title="My projects" links={sidebarLinks} />
        <Content
          title="My Next.js Projects"
          description="Explore my Next.js projects, including Redux Toolkit and useState vs useReducer guides."
        >
          <p>Select a project from the sidebar to view details.</p>
        </Content>
        <Advertisements />
      </div>
    </>
  );
}