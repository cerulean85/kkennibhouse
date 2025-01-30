export default function MemoLayout({
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
  