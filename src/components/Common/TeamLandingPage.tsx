import { useEffect, useState } from "react";
import { ColFrame } from "./Frame";
import { useAuthStore } from "../../context/AuthContext";
import { useSimFBAStore } from "../../context/SimFBAContext";
import { StandingsTable } from "./tables";
import { SectionCards } from "../../_design/SectionCards";
import { Text } from "../../_design/Typography";

interface TeamLandingPageProps {
  team: any;
}

export const TeamLandingPage = ({ team }: TeamLandingPageProps) => {
  const { currentUser } = useAuthStore();
  const { collegeNews,
          collegeNotifications
        } = useSimFBAStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (collegeNews.length > 0) {
      setIsLoading(false);
    }
  }, [collegeNews]);

  const filteredCollegeNews = collegeNews
    .filter(news => news.TeamID === currentUser?.teamId)
    .reverse();

  const filteredNotifications = collegeNotifications
    .filter(notification => notification.TeamID === currentUser?.teamId)
    .reverse();  

  return (
    <>
      <div className="flex gap-5">
        <SectionCards header="Team News">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Text variant="small">Loading...</Text>
            </div>
          ) : (
            filteredCollegeNews.map((news, index) => (
              <div key={index} className="mb-2">
                <Text variant="small">{news.Message}</Text>
              </div>
            ))
          )}
        </SectionCards>
        <SectionCards header="Inbox">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Text variant="small">Loading...</Text>
            </div>
          ) : filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification, index) => (
              <div key={index} className="mb-2">
                <Text variant="small">{notification.Subject}</Text>
                <Text variant="small">{notification.Message}</Text>
              </div>
            ))
          ) : (
            <Text>Your Inbox is Empty</Text>
          )}
        </SectionCards>
      </div>
    </>
  );
};