import { useEffect, useState } from "react";
import { ColFrame } from "./Frame";
import { useAuthStore } from "../../context/AuthContext";
import { useSimFBAStore } from "../../context/SimFBAContext";
import { useSimHCKStore } from "../../context/SimHockeyContext";
import { SectionCards } from "../../_design/SectionCards";
import { Text } from "../../_design/Typography";
import { getTextColorBasedOnBg } from "../../_utility/getBorderClass";
import { StandingsTable } from "./tables";
import { Border } from "../../_design/Borders";

interface TeamLandingPageProps {
  team: any;
  league: any
}

export const TeamLandingPage = ({ team, league }: TeamLandingPageProps) => {
  const { currentUser } = useAuthStore();
  const backgroundColor = team?.ColorOne || "#4B5563";
  const borderColor = team?.ColorTwo || "#4B5563";
  const textColorClass = getTextColorBasedOnBg(backgroundColor);
  const { collegeNews, collegeNotifications, allCFBStandings, currentCFBStandings, isLoadingTwo, isLoadingThree } =
    useSimFBAStore();
  const { currentCHLStandings } =
    useSimHCKStore();
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
        <Border
            classes="border-4 py-0 px-0"
            styles={{
              backgroundColor: borderColor,
              borderColor: backgroundColor,
            }}
          >
          {currentUser && (
            <SectionCards
              team={team}
              header="Standings"
              classes={`${textColorClass}, h-[40em]`}
            >
              <StandingsTable standings={allCFBStandings} league={league} team={team} currentUser={currentUser} />
            </SectionCards>
          )}
          </Border>
          <div className="flex-col">
            <Border
              classes="border-4 py-0 px-0"
              styles={{
                backgroundColor: borderColor,
                borderColor: backgroundColor,
              }}
            >
              <SectionCards team={team} header="Inbox" classes={`${textColorClass}, w-[20em]`}>
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
              </Border>
            <Border
            classes="border-4 py-0 px-0"
            styles={{
              backgroundColor: borderColor,
              borderColor: backgroundColor,
            }}
          >
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
            </Border>
          </div>
          <div className="flex-col">
            <Border
              classes="border-4 py-0 px-0"
              styles={{
                backgroundColor: borderColor,
                borderColor: backgroundColor,
              }}
            >
              <SectionCards team={team} header="Inbox" classes={`${textColorClass}, w-[20em]`}>
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
              </Border>
            <Border
            classes="border-4 py-0 px-0"
            styles={{
              backgroundColor: borderColor,
              borderColor: backgroundColor,
            }}
          >
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
            </Border>
          </div>
          <Border
            classes="border-4 py-0 px-0"
            styles={{
              backgroundColor: borderColor,
              borderColor: backgroundColor,
            }}
          >
          {currentUser && (
            <SectionCards
              team={team}
              header="Standings"
              classes={`${textColorClass}, h-[40em]`}
            >
              <StandingsTable standings={allCFBStandings} league={league} team={team} currentUser={currentUser} />
            </SectionCards>
          )}
          </Border>
      </div>
    </>
  );
};
