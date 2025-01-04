export default function BooksLayout({
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
  