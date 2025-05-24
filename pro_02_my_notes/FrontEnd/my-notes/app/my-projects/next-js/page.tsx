// app/my-projects/next-js/page.tsx
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Content from "@/components/ContentFormat03";
import Advertisements from "@/components/Advertisements";

export default function NextJsProjectHome() {
  const sidebarLinks = [
    { href: "/my-projects/next-js/redux-toolkit", label: "Redux Toolkit" },
    {
      href: "/my-projects/next-js/use-state-vs-use-reducer",
      label: "UseState Vs UseReducer",
    },
  ];

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