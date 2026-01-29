import Image from "next/image";
import Link from "next/link";

import logo from "../../public/images/logo/logo.png";

const FooterTwo = () => {
  return (
    <>
      <div className="footer-style-2 ptb--60 bg-color-white">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-12">
              <div className="inner text-center">
                <div className="logo">
                  <Link href="/">
                    <Image
                      src={logo}
                      width={152}
                      height={50}
                      alt="Logo images"
                    />
                  </Link>
                </div>

                <ul className="social-icon social-default">
                  <li>
                    <Link href="#">
                      <i className="fab fa-facebook-f"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="fab fa-linkedin-in"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="fab fa-twitter"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="fab fa-instagram"></i>
                    </Link>
                  </li>
                </ul>

                <div className="text mt--20">
                  <p>
                    © 2024
                    <Link
                      className="mx-2"
                      target="_blank"
                      href="https://themeforest.net/user/rbt-themes/portfolio"
                    >
                      Rainbow-Themes
                    </Link>
                    . All Rights Reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterTwo;
