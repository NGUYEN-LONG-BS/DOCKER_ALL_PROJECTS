// components/ContentFormat03.tsx
interface ContentProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function Content({ title, description, children }: ContentProps) {
  return (
    <main className="flex-grow-1 p-3">
      <h1 className="mb-3">{title}</h1>
      <p className="lead mb-4">{description}</p>
      {children}
    </main>
  );
}