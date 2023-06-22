import React from "react";

import "./Join.scss"
import List, {SpecialForm} from "../../../../Settings/components/DynamicList";

const Join = () => {
  return (
    <div className="jumbotron jumbotron-fluid vertical-center p-0 m-0" id="bg-img-cloth">
      {/* <img src={cloth} className="img-fluid" /> */}
      <div className="container vertical-center">

        <div className="row w-100">
          <div className="col-lg">
            <ul className="socials-list">
              <SpecialForm />
              <List />
            </ul>
          </div>
          <div className="col-lg"></div>
        </div>
      </div>
    </div >
  );
}

export default Join;
