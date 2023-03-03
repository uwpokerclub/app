import React from "react";

import { discordLine, instagramLine, facebookLine, emailLine, formsLine } from "../../../../../assets"
import "./Join.scss"

const Join = () => {
  return (
    <div className="jumbotron jumbotron-fluid vertical-center p-0 m-0" id="bg-img-cloth">
      {/* <img src={cloth} className="img-fluid" /> */}
      <div className="container vertical-center">

        <div className="row w-100">
          <div className="col-lg">
            {/* <span className="m-4">
              <b>Location:</b> MC2054
              <br/>
              First time playing? <a className="text-link" href="/register"><b>Register here!</b></a>
            </span> */}
          </div>
          <div className="col-lg">
            <ul className="socials-list">
              {/* <li>
                <a className="nav-link" href=""></a>
              </li> */}
              <li>
              <a className="form-link" href="https://forms.gle/p7hB6XbTPfsdijrE6" target="_blank" rel="noreferrer">
              <img src={formsLine} className="mr-4 pl-1 pr-2" alt=""/>
                  2023 WINTER MIDTERM
                </a>
              </li>
              <li>
                <a className="text-link" href="https://discord.gg/2k4h9sM" target="_blank" rel="noreferrer">
                  <img src={discordLine} className="mr-4" alt=""/>
                  JOIN THE DISCORD
                </a>
              </li>
              <li>
                <a className="text-link" href="https://www.instagram.com/uwpokerclub/" target="_blank" rel="noreferrer">
                  <img src={instagramLine} className="mr-4" alt=""/>
                  FOLLOW ON INSTAGRAM
                </a>
              </li>
              <li>
                <a className="text-link" href="https://www.facebook.com/uwpokerstudies" target="_blank" rel="noreferrer">
                  <img src={facebookLine} className="mr-4 pl-1 pr-2" alt=""/>
                  LIKE US ON FACEBOOK
                </a>
              </li>
              <li>
                <a className="text-link" href="mailto:uwaterloopoker@gmail.com" target="_blank" rel="noreferrer">
                  <img src={emailLine} className="mr-4" alt=""/>
                  CONTACT US VIA EMAIL
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg"></div>
        </div>
      </div>
    </div >
  );
}

export default Join;