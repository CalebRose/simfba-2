import { useSimHCKStore } from "../../../context/SimHockeyContext";
import { useTeamColors } from "../../../_hooks/useTeamColors";
import { useCHLRecruiting } from "./useCHLRecruiting";


export const CHLRecruiting = () => {
    const hkStore = useSimHCKStore();
    const {recruits, teamProfileMap, chlTeam} = hkStore;
    const {
        teamProfile, 
        recruitMap, 
        recruitingCategory, 
        setRecruitingCategory, 
        isModalOpen, 
        handleOpenModal, 
        handleCloseModal 
    } = useCHLRecruiting();
    const teamColors = useTeamColors(
        chlTeam?.ColorOne,
        chlTeam?.ColorTwo,
        chlTeam?.ColorThree
    );

    /* 
        Will also need to add player profiles to bootstrap call.
        Likely won't need to do double-wrapped call because of recruit mapping

        There will likely be several select handles.
        Overall Grade
        Stars
        State
        Position
        Archetype
        Status

        Will also likely need a Recruiting Action Modal
        - Toggle Scholarship
        - Remove player from Board
        - Recruit Info Card
        - Saving Team Board

        We will also need to come up with categories that we will allow users to toggle.
        - Viewing Overall Attributes
        - Recruit Preferences

        Might also help with having a left-side section to detail team recruiting info

        This is for the overview alone.
    */

    return (
    <>
        <div className="flex flex-row lg:flex-col w-full max-[450px]:max-w-full">
        TEST
        {/* Team Profile Info */}
        {/* Recruiting Nav Categories */}
        {/* Recruit List Categories */}
        {/* Recruit List Dropdowns */}
        {/* Recruit List */}
        </div>
    </>
    );
}