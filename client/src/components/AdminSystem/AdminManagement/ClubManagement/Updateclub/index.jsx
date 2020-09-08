import React from "react";
import Updateclub from "./Updateclub";
import { Fragment } from "react";

const UpdateclubContainer = (props) => {
  const { match, history } = props;
  const { id } = match.params;
  return (

    
      <Fragment>
        <Updateclub id={id} history={history} />
      </Fragment>
   
  );
};

export default UpdateclubContainer;
