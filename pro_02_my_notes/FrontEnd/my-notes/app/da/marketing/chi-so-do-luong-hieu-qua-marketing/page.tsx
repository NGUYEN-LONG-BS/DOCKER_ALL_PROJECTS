// app/my-projects/next-js/react-hooks-cheat-sheet/page.tsx
import Header from "@/components/header/Header";
import Sidebar from "@/components/sideBar/Sidebar";
import Content from "@/components/content/ContentFormat03";
import Advertisements from "@/components/advertisement/Advertisements";
import { sidebarLinks } from "@/lib/marketing_sidebar";

import MarketingMetrics from "@/components/marketing/marketing-index";

export default function ReactHooksCheatSheetPageMyself() {
  return (
    <>
      <Header />
      <div className="flex-grow-1 d-flex">
        <Sidebar title="Marketing" links={sidebarLinks} />
        <Content
          title="Chỉ số đo lường hiệu quả Marketing"
          description="chỉ số đo lường hiệu quả Marketing"
        >
          <MarketingMetrics />
        </Content>
        <Advertisements />
      </div>
    </>
  );
}