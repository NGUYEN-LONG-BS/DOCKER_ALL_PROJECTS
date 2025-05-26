// components/ContentFormat03.tsx
interface ContentProps {
  children: React.ReactNode;
}

export default function Content({ children }: ContentProps) {
  return (
    <main className="flex-grow-1 p-3">
      {children}
    </main>
  );
}