import React, { useContext, useEffect, useState } from "react";
import { AuthService } from "../../_services/auth";
import { SimFBAContext } from "../../context/SimFBAContext";
import { PageContainer } from "../Common/Container";

export const Home = () => {
  const {
    setCurrentUser,
    currentUser,
    cfbTeam,
    cbbTeam,
    nflTeam,
    nbaTeam,
    setCFBTeam,
    setCBBTeam,
    setNFLTeam,
    setNBATeam,
  } = useContext(SimFBAContext);
  const [selectedLeague, setSelectedLeague] = useState(null);

  useEffect(() => {
    AuthService.getProfile().then((user) => {
      if (user) {
        setCurrentUser(() => user.data);
      }
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      // Get Team Data
    }
  }, [currentUser]);

  const getCFBTeam = async () => {};

  const getCBBTeam = async () => {};

  const getNFLTeam = async () => {};

  const getNBATeam = async () => {};

  return (
    <PageContainer>
      <div className="flex flex-col px-2">
        <div className="flex flex-row">
          <h5>Dashboard</h5>
        </div>
        <div className="flex flex-row">
          <h6>Buttons</h6>
        </div>
      </div>
      <div className="flex flex-col px-2">
        <div className="flex flex-row">
          <h1>Test</h1>
        </div>
      </div>
      <div className="flex flex-col px-2">
        <div className="flex flex-row">
          <h1>Test</h1>
        </div>
        <div className="flex flex-row">
          <h1>Test</h1>
        </div>
      </div>
    </PageContainer>
  );
};
