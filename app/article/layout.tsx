import { Suspense } from 'react'

export default function AboutLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <Suspense>
        <section>
          {children}
        </section>
      </Suspense>
    );
  }
  