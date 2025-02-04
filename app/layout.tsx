'use client'
import CommonHeader from "@/layouts/common/header";
import CommonFooter from "@/layouts/common/footer";
import CommonSection from "@/layouts/common/section";
import CommonAside from "@/layouts/common/aside";
import "@/styles/common.scss"
import { Provider } from 'react-redux';
import store from '@/stores/store';
import React, { useEffect } from "react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {






  useEffect(() => {
    // const dispatch: AppDispatch = useDispatch();
    // const headerFold = useSelector((state: RootState) => state.headerFold.value);

    // const [isScrolled, setIsScrolled] = useState(false);

    //   // 스크롤 이벤트 핸들러
    //   const handleScroll = () => {
    //     if (window.scrollY > 50) {
    //         if (dispatch != undefined)
    //           dispatch(fold())
    //         setIsScrolled(true);
    //         console.log("ggg")
    //     } else {
    //         dispatch(expand());
    //         setIsScrolled(false);
    //     }
    // };

    //   // 컴포넌트 마운트 시 스크롤 이벤트 리스너 추가
    //   window.addEventListener("scroll", handleScroll);
  
    //   // 컴포넌트 언마운트 시 리스너 제거
    //   return () => {
    //     window.removeEventListener("scroll", handleScroll);
    //   };
    }, []);

  return (
    <Provider store={store}>
    <html lang="en">
      <head>
        <title>깬닙하우스</title>
        <meta name="google-adsense-account" content="ca-pub-2703512740946569"></meta>
        {/* <link rel="icon" href="%PUBLIC_URL%/heart_icon.ico"></link> */}
      </head>
      <body>
        <CommonHeader></CommonHeader>
        <div className="container">
          <main className="content">            
            <CommonSection>{children}</CommonSection>
          </main>
          <CommonFooter></CommonFooter>
        </div>
      </body>
    </html>
    </Provider>

  );
}
