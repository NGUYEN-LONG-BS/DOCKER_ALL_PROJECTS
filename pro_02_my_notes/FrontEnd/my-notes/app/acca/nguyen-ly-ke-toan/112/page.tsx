// app/my-projects/next-js/react-hooks-cheat-sheet/page.tsx
import Header from "@/components/header/Header";
import Sidebar from "@/components/sideBar/Sidebar";
import Content from "@/components/content/ContentFormat03";
import Advertisements from "@/components/advertisement/Advertisements";

import { sidebarTitle, sidebarLinks } from "@/lib/sideBar/accountingPrinciple_sidebar";

import BankDepositAccount from "@/components/contents/AccountingPrinciple/tk112";

export default function ReactHooksCheatSheetPageMyself() {
  return (
    <>
      <Header />
      <div className="flex-grow-1 d-flex">
        <Sidebar title={sidebarTitle} links={sidebarLinks} />
        <Content
          title="Tài khoản 112 - Tiền gửi ngân hàng"
          description="Các nguyên tắc kế toán và kết cấu tài khoản 112 để thực hiện hành vi của tài khoản này."
        >
          <BankDepositAccount />
        </Content>
        <Advertisements />
      </div>
    </>
  );
}