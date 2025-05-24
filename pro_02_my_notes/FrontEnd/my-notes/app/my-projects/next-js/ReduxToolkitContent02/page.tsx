// app/use-state-vs-use-reducer/page.tsx
import Header from "@/components/Header";
import Content from "@/components/ContentFormat03";
import UseStateVsUseReducer from "@/components/UseStateVsUseReducer";

export default function UseStateVsUseReducerPage() {
  return (
    <>
      <Header />
      <Content
        title="Phân biệt useState và useReducer"
        description="Tìm hiểu sự khác biệt giữa hai hook useState và useReducer trong React."
      >
        <UseStateVsUseReducer />
      </Content>
    </>
  );
}