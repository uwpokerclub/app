import { discordLine, instagramLine, facebookLine, emailLine } from "../../../assets";
import styles from "./SocialsList.module.css";

export function SocialsList() {
  return (
    <div className={`jumbotron jumbotron-fluid vertical-center p-0 m-0 ${styles.bgImage}`}>
      {/* <img src={clo th} className="img-fluid" /> */}
      <div className={`container ${styles.verticalCenter}`}>
        <div className="row w-100">
          <div className="col-lg">
            {/* <span className="m-4">
              <b>Location:</b> MC2054
              <br/>
              First time playing? <a className="text-link" href="/register"><b>Register here!</b></a>
            </span> */}
          </div>
          <div className="col-lg">
            <ul className={styles.socialsList}>
              {/* <li>
                <a className="nav-link" href=""></a>
              </li> */}
              {/*<li>
              <a className="form-link" href="https://forms.gle/p7hB6XbTPfsdijrE6" target="_blank" rel="noreferrer">
              <img src={formsLine} className="mr-4 pl-1 pr-2" alt=""/>
                  2023 WINTER MIDTERM
                </a>
            </li>*/}
              <li>
                <a className={styles.textLink} href="https://discord.gg/2k4h9sM" target="_blank" rel="noreferrer">
                  <img src={discordLine} className="me-4" alt="" />
                  JOIN THE DISCORD
                </a>
              </li>
              <li>
                <a
                  className={styles.textLink}
                  href="https://www.instagram.com/uwpokerclub/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={instagramLine} className="me-4" alt="" />
                  FOLLOW ON INSTAGRAM
                </a>
              </li>
              <li>
                <a
                  className={styles.textLink}
                  href="https://www.facebook.com/uwpokerstudies"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={facebookLine} className="me-4 ps-1 pe-2" alt="" />
                  LIKE US ON FACEBOOK
                </a>
              </li>
              <li>
                <a className={styles.textLink} href="mailto:uwaterloopoker@gmail.com" target="_blank" rel="noreferrer">
                  <img src={emailLine} className="me-4" alt="" />
                  CONTACT US VIA EMAIL
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg"></div>
        </div>
      </div>
    </div>
  );
}
