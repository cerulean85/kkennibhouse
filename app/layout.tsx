import CommonHeader from "@/layouts/common/header";
import CommonFooter from "@/layouts/common/footer";
import CommonAside from "@/layouts/common/aside";
import "@/styles/common.scss"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body>
        <CommonHeader></CommonHeader>
        <main>
          <section>{children}</section>
          {/* <CommonAside></CommonAside> */}
        </main>
        <CommonFooter></CommonFooter>
      </body>
    </html>

  );
}
