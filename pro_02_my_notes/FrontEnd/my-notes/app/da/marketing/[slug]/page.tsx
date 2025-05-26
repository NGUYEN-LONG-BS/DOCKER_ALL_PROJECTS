// app/my-projects/next-js/[slug]/page.tsx
import Header from "@/components/header/Header";
import Sidebar from "@/components/sideBar/Sidebar";
import Content from "@/components/content/ContentFormat03";
import Advertisements from "@/components/advertisement/Advertisements";
import { notFound } from "next/navigation";
import { sidebarTitle, sidebarLinks } from "@/lib/sideBar/marketing_sidebar";

import CMSMarketShare from "@/components/contents/marketing/thi-truong-cms";
import MarketingMetrics from "@/components/contents/marketing/marketing-index";

export default function NextJsProjectPage({ params }: { params: { slug: string } }) {
  // Mapping slug to content
  const contentMap: Record<
    string,
    { title: string; description: string; component: React.ReactNode }
  > = {
    "thi-truong-cms": {
      title: "Thị trường CMS",
      description:
        "Tổng quan về thị trường CMS để chọn công cụ phù hợp cho bạn.",
      component: <CMSMarketShare />,
    },
    "chi-so-do-luong-hieu-qua-marketing": {
      title: "Chỉ số do lường hiệu quả Marketing",
      description:
        "Các thành phần.",
      component: <MarketingMetrics />,
    },
    
    
    
  };

  // Lấy nội dung dựa trên slug, hoặc trả về 404 nếu không tìm thấy
  const content = contentMap[params.slug] || notFound();

  return (
    <>
      <Header />
      <div className="flex-grow-1 d-flex">
        <Sidebar title={sidebarTitle} links={sidebarLinks} />
        <Content title={content.title} description={content.description}>
          {content.component}
        </Content>
        <Advertisements />
      </div>
    </>
  );
}