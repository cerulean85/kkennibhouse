export default function TodoLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <section>
          {children}
        </section>
    );
  }
  