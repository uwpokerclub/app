import React, { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import { cloth, discord_line, instagram_line, facebook_line, email_line } from "../../../../../assets"
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
                <a className="socials-link text-link" href="https://discord.gg/2k4h9sM" target="_blank">
                  <img src={discord_line} className="mr-4" />
                  JOIN THE DISCORD
                </a>
              </li>
              <li>
                <a className="socials-link text-link" href="https://www.instagram.com/uwpokerclub/" target="_blank">
                  <img src={instagram_line} className="mr-4" />
                  FOLLOW ON INSTAGRAM
                </a>
              </li>
              <li>
                <a className="socials-link text-link" href="https://www.facebook.com/uwpokerstudies" target="_blank">
                  <img src={facebook_line} className="mr-4 pl-1 pr-2" />
                  LIKE US ON FACEBOOK
                </a>
              </li>
              <li>
                <a className="socials-link text-link" href="mailto:uwaterloopoker@gmail.com" target="_blank">
                  <img src={email_line} className="mr-4" />
                  CONTACT US VIA EMAIL
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg"></div>
          {/* <div className="col">
            Col2
          </div> */}
        </div>
      </div>
    </div >
  );
}

export default Join;