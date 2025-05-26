// app/my-projects/next-js/react-hooks-cheat-sheet/page.tsx
import Header from "@/components/header/Header";
import Sidebar from "@/components/sideBar/Sidebar";
import Content from "@/components/content/ContentFormat04";
import Advertisements from "@/components/advertisement/Advertisements";

import { sidebarTitle, sidebarLinks } from "@/lib/sideBar/macro_sidebar";

import BankDepositAccount from "@/components/contents/macro/gdp/gdp02";

export default function ReactHooksCheatSheetPageMyself() {
  return (
    <>
      <Header />
      <div className="flex-grow-1 d-flex">
        <Sidebar title={sidebarTitle} links={sidebarLinks} />
        <Content>
          <BankDepositAccount />
        </Content>
        <Advertisements />
      </div>
    </>
  );
}