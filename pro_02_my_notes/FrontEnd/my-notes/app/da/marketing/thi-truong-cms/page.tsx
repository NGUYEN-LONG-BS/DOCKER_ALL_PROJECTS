// app/my-projects/next-js/react-hooks-cheat-sheet/page.tsx
import Header from "@/components/header/Header";
import Sidebar from "@/components/sideBar/Sidebar";
import Content from "@/components/content/ContentFormat03";
import Advertisements from "@/components/advertisement/Advertisements";
import { sidebarTitle, sidebarLinks } from "@/lib/sideBar/marketing_sidebar";

import CMSMarketShare from "@/components/marketing/thi-truong-cms";

export default function ReactHooksCheatSheetPage() {
  return (
    <>
      <Header />
      <div className="flex-grow-1 d-flex">
        <Sidebar title={sidebarTitle} links={sidebarLinks} />
        <Content
          title="Thị trường CMS"
          description="Tổng quan về thị trường CMS để chọn công cụ phù hợp cho bạn."
        >
          <CMSMarketShare />
        </Content>
        <Advertisements />
      </div>
    </>
  );
}