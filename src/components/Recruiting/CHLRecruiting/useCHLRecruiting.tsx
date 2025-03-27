import { useMemo, useState } from "react";
import { useAuthStore } from "../../../context/AuthContext";
import { useSimHCKStore } from "../../../context/SimHockeyContext";
import { useModal } from "../../../_hooks/useModal";
import {
  RecruitingCategory,
  RecruitingOverview,
} from "../../../_constants/constants";

export const useCHLRecruiting = () => {
  const { currentUser } = useAuthStore();
  const hkStore = useSimHCKStore();
  const { recruits, teamProfileMap, chlTeam } = hkStore;
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const [recruitingCategory, setRecruitingCategory] =
    useState<RecruitingCategory>(RecruitingOverview);

  const teamProfile = useMemo(() => {
    if (chlTeam && teamProfileMap) {
      return teamProfileMap[Number(chlTeam.ID)];
    }
    return null;
  }, [chlTeam, teamProfileMap]);

  const recruitMap = useMemo(() => {
    const rMap: any = {};
    for (let i = 0; i < recruits.length; i++) {
      rMap[recruits[i].ID] = recruits[i];
    }
    return rMap;
  }, [recruits]);

  return {
    teamProfile,
    recruitMap,
    recruitingCategory,
    setRecruitingCategory,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
  };
};
