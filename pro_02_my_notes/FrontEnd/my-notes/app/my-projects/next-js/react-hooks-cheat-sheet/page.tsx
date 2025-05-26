// app/my-projects/next-js/react-hooks-cheat-sheet/page.tsx
import Header from "@/components/header/Header";
import Sidebar from "@/components/sideBar/Sidebar";
import Content from "@/components/content/ContentFormat03";
import Advertisements from "@/components/advertisement/Advertisements";
import ReactHooksCheatSheet from "@/components/contents/reduxToolKit/ReactHooksCheatSheet";
import { sidebarLinks } from "@/lib/sideBar/sidebarLinks";

export default function ReactHooksCheatSheetPage() {
  return (
    <>
      <Header />
      <div className="flex-grow-1 d-flex">
        <Sidebar title="My projects" links={sidebarLinks} />
        <Content
          title="React Hooks Cheat Sheet"
          description="A comprehensive guide to React Hooks, including useState, useEffect, useContext, and more."
        >
          <ReactHooksCheatSheet />
        </Content>
        <Advertisements />
      </div>
    </>
  );
}