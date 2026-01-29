import Link from "next/link";
import Separator from "../Common/Separator";
import { useRouter } from "next/navigation";
import { useScreenSize } from "@/hooks/screenSize";

const CopyRight = () => {
  const router = useRouter();

  const goToDisclaimer = () => {
    router.push("/disclaimer");
  };

  const screenSize = useScreenSize();
  const BigScreenLogic = ["xxl", "xl", "lg"].includes(screenSize);

  return (
    <>
      <Separator />

      <div
        className="copyright-area copyright-style-1 ptb--20"
        style={{ marginBottom: BigScreenLogic ? "0px" : "80px" }}
      >
        <div className="container">
          <div
            style={{
              fontSize: "14px",
            }}
          >
            Disclaimer :
            <div>
              The information provided by Vidyarishi Educational Platform is for
              informational purposes only. We strive for accuracy but make no
              guarantees about the completeness or reliability of the content.
              Users are advised to verify details independently. Vidyarishi is
              not liable for any losses or damages resulting from the use of
              this information{" "}
              <span
                style={{
                  color: "#2f57ef",
                  cursor: "pointer",
                  fontWeight: "bolder",
                }}
                onClick={goToDisclaimer}
              >
                More..
              </span>
            </div>
          </div>

          <div
            className="row align-items-center mt--30"
            style={{
              fontSize: "14px",
            }}
          >
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12" style={{whiteSpace :  'nowrap'}} >
              <p className="rbt-link-hover text-center text-lg-start">
                Copyright © 2025 <Link href="/">Rishikesh Education Services Pvt. Ltd.</Link> All Rights Reserved
              </p>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12">
              <ul className="copyright-link rbt-link-hover justify-content-center justify-content-lg-end mt_sm--10 mt_md--10">
                <li>
                  <Link href="/term-and-conditions">Terms & Conditions</Link>
                </li>
                <li>
                  <Link href="/privacy-policy">Privacy policy</Link>
                </li>
                <li>
                  <Link href="/refund-policy">Refund Policy</Link>
                </li>
                {/* <li>
                  <Link href="#">Login & Register</Link>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CopyRight; 
