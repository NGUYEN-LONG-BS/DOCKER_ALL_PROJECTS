// app/my-projects/next-js/page.tsx
import Header from "@/components/header/Header";
import Sidebar from "@/components/sideBar/Sidebar";
import Content from "@/components/content/ContentFormat03";
import Advertisements from "@/components/advertisement/Advertisements";
import { sidebarLinks } from "@/lib/sidebarLinks";

export default function NextJsProjectHome() {
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