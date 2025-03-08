import { useEffect, useState } from "react";
import { ColFrame } from "./Frame";
import { useAuthStore } from "../../context/AuthContext";
import { useSimFBAStore } from "../../context/SimFBAContext";
import { StandingsTable } from "./tables";
import { SectionCards } from "../../_design/SectionCards";
import { Text } from "../../_design/Typography";
import { getTextColorBasedOnBg } from "../../_utility/getBorderClass";

interface TeamLandingPageProps {
  team: any;
}

export const TeamLandingPage = ({ team }: TeamLandingPageProps) => {
  const { currentUser } = useAuthStore();
  const backgroundColor = team?.ColorOne || "#4B5563";
  const borderColor = team?.ColorTwo || "#4B5563";
  const textColorClass = getTextColorBasedOnBg(backgroundColor);
  const { collegeNews, collegeNotifications, isLoadingTwo, isLoadingThree } =
    useSimFBAStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (collegeNews.length > 0) {
      setIsLoading(false);
    }
  }, [collegeNews]);

  const filteredCollegeNews = collegeNews
    .filter((news) => news.TeamID === currentUser?.teamId)
    .reverse();

  const filteredNotifications = collegeNotifications
    .filter((notification) => notification.TeamID === currentUser?.teamId)
    .reverse();

  return (
    <>
      <div className="flex gap-5">
        <SectionCards
          team={team}
          header="Team News"
          classes={`${textColorClass}`}
        >
          {isLoadingTwo ? (
            <div className="flex justify-center items-center">
              <Text variant="small" classes={`${textColorClass}`}>
                Loading...
              </Text>
            </div>
          ) : (
            filteredCollegeNews.map((news, index) => (
              <div key={index} className="mb-2">
                <Text variant="small" classes={`${textColorClass}`}>
                  {news.Message}
                </Text>
              </div>
            ))
          )}
        </SectionCards>
        <SectionCards team={team} header="Inbox" classes={`${textColorClass}`}>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Text variant="small" classes={`${textColorClass}`}>
                Loading...
              </Text>
            </div>
          ) : filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification, index) => (
              <div key={index} className="mb-2">
                <Text variant="small" classes={`${textColorClass}`}>
                  {notification.Subject}
                </Text>
                <Text variant="small" classes={`${textColorClass}`}>
                  {notification.Message}
                </Text>
              </div>
            ))
          ) : (
            <Text variant="small" classes={`${textColorClass}`}>
              Your Inbox is Empty
            </Text>
          )}
        </SectionCards>
      </div>
    </>
  );
};
