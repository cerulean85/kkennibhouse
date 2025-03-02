export default function OntologyLayout({
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
  