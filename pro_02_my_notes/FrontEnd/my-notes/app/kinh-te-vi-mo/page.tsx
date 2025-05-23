"use client";
import Sidebar from "@/components/Sidebar";
import Content from "@/components/ContentDirectTo";
import Advertisements from "@/components/Advertisements";
import Header from "@/components/Header";
import { useState } from "react";

export default function BootstrapHome() {
  const sidebarLinks = [
    { href: "/kinh-te-vi-mo", label: "Chính sách tài khoá" },
    { href: "/kinh-te-vi-mo", label: "Chính sách tiền tệ" },
    { href: "/bootstrap/get-started", label: "Bộ ba bất khả thi" },
    { href: "/bootstrap/containers", label: "Cơ chế tỷ giá" },
    { href: "/bootstrap/grid", label: "Vĩ mô tiền tệ" },
    { href: "/bootstrap/typography", label: "Cung tiền" },
    { href: "/bootstrap/colors", label: "Đường con lợi suất" },
    { href: "/bootstrap/tables", label: "Công cụ điều hành tỷ giá" },
    { href: "/bootstrap/images", label: "Cơ chế điều hành lãi suất" },
  ];

  // State to manage the active tab
  const [activeTab, setActiveTab] = useState("formal");

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1 d-flex">
        <Sidebar title="Kinh tế vĩ mô" links={sidebarLinks} />
        <div className="flex-grow-1">
          {/* Tab Navigation */}
          <ul className="nav nav-tabs mb-4" id="fiscalPolicyTabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === "formal" ? "active" : ""}`}
                id="formal-tab"
                data-bs-toggle="tab"
                data-bs-target="#formal"
                type="button"
                role="tab"
                aria-controls="formal"
                aria-selected={activeTab === "formal"}
                onClick={() => setActiveTab("formal")}
              >
                Chính sách tài khóa
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === "renote" ? "active" : ""}`}
                id="renote-tab"
                data-bs-toggle="tab"
                data-bs-target="#renote"
                type="button"
                role="tab"
                aria-controls="renote"
                aria-selected={activeTab === "renote"}
                onClick={() => setActiveTab("renote")}
              >
                Chính sách tài khóa - bản ghi nhớ
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === "ref" ? "active" : ""}`}
                id="ref-tab"
                data-bs-toggle="tab"
                data-bs-target="#ref"
                type="button"
                role="tab"
                aria-controls="ref"
                aria-selected={activeTab === "ref"}
                onClick={() => setActiveTab("ref")}
              >
                Nguồn tài liệu
              </button>
            </li>
          </ul>

          {/* Tab Content */}
          <div className="tab-content" id="fiscalPolicyTabContent">
            <div
              className={`tab-pane fade ${activeTab === "formal" ? "show active" : ""}`}
              id="formal"
              role="tabpanel"
              aria-labelledby="formal-tab"
            >
              <Content
                title="Chính sách tài khóa"
                description="Chính sách tài khóa là việc sử dụng chi tiêu và thu thuế của chính phủ để ảnh hưởng đến nền kinh tế."
                htmlFilePath="/content/fiscal-policy-formal.html"
              />
            </div>
            <div
              className={`tab-pane fade ${activeTab === "renote" ? "show active" : ""}`}
              id="renote"
              role="tabpanel"
              aria-labelledby="renote-tab"
            >
              <Content
                title="Chính sách tài khóa - bản ghi nhớ"
                description="Chính sách tài khóa là việc sử dụng chi tiêu và thu thuế của chính phủ để ảnh hưởng đến nền kinh tế."
                htmlFilePath="/content/fiscal-policy-renote.html"
              />
            </div>
            <div
              className={`tab-pane fade ${activeTab === "ref" ? "show active" : ""}`}
              id="ref"
              role="tabpanel"
              aria-labelledby="ref-tab"
            >
              <Content
                title="Nguồn tài liệu"
                description="Chính sách tài khóa là việc sử dụng chi tiêu và thu thuế của chính phủ để ảnh hưởng đến nền kinh tế."
                htmlFilePath="/content/fiscal-policy-ref.html"
              />
            </div>
          </div>
        </div>
        <Advertisements />
      </main>
    </div>
  );
}