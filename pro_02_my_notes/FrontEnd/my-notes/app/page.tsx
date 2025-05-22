import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Content from "@/components/Content";
import Advertisements from "@/components/Advertisements";

export default function HomePage() {
  const sidebarLinks = [
    { href: "/bootstrap/home", label: "Chính sách tài khoá" },
    { href: "/bootstrap/get-started", label: "Bộ ba bất khả thi" },
    { href: "/bootstrap/containers", label: "Cơ chế tỷ giá" },
    { href: "/bootstrap/grid", label: "Vĩ mô tiền tệ" },
    { href: "/bootstrap/typography", label: "Cung tiền" },
    { href: "/bootstrap/colors", label: "Đường con lợi suất" },
    { href: "/bootstrap/tables", label: "Công cụ điều hành tỷ giá" },
    { href: "/bootstrap/images", label: "Cơ chế điều hành lãi suất" },
  ];

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1 d-flex">
        <Sidebar title="Kinh tế vĩ mô" links={sidebarLinks} />
        <Content
          title="Bootstrap 5 Tutorial 12"
          description="Bootstrap 5 is the newest version of Bootstrap, which is the most popular HTML, CSS, and JavaScript framework for creating responsive, mobile-first websites."
        >
          <h2 className="fs-2 fw-bold mb-3">Try it Yourself Examples</h2>
          <p className="mb-3">This tutorial contains hundreds of Bootstrap 5 examples.</p>
          <p className="mb-4">
            With our online editor, you can edit the code, and click on a button to view the result.
          </p>
          <div className="border rounded p-4 mb-5">
            <h3 className="fs-4 fw-bold mb-3">Bootstrap 5 Example</h3>
            <div
              className="bg-light p-4 rounded mb-3 d-flex align-items-center justify-content-center"
              style={{ height: "250px" }}
            >
              <p className="text-muted">Example code preview would appear here</p>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-success">Try it Yourself »</button>
            </div>
          </div>
        </Content>
        <Advertisements />
      </main>
    </div>
  );
}