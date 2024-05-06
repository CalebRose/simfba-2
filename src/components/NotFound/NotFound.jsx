import React from "react";
import { PageContainer } from "../Common/Container";

export const NotFoundPage = () => {
  return (
    <PageContainer>
      <div className="flex flex-col px-2">
        <div className="flex flex-row">
          <h5>Page Cannot Be Found</h5>
        </div>
        <div className="flex flex-row">
          <h6>Please wait for further development</h6>
        </div>
      </div>
    </PageContainer>
  );
};
