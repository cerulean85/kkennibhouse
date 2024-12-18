import Link from "next/link"

const CommonHeader = () => {
    return (
        <header>
            <img src="/images/profile_img.jfif"
                style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}></img>
            <h2>깬닙하우스</h2>
            <nav>
                <ul className="main-menu">
                    <li><Link href="/">Me</Link></li>
                    <li><Link href="/about">IT</Link></li>
                    <li><Link href="/todo">Books</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default CommonHeader