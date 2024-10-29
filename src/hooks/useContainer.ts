import { useMemo } from "react";
import { useMainStore, useFavoriteStore } from "@/store";
import { Message } from "@/utils";
import { RoleEnum } from "@/enums";

export const useContainer = () => {
  const { current, records, findRecord } = useMainStore();

  const { findFavorite, favoriteList } = useFavoriteStore();

  const currentRecord = useMemo(() => {
    if (current === null) {
      return {
        id: Date.now(),
        name: "",
        isFile: false,
        history: [Message[RoleEnum.ROLE_SYSTEM]()],
      };
    }

    return findRecord(current)!;
  }, [current, records]);

  const isFavorite = useMemo(() => {
    return !!findFavorite(currentRecord.id);
  }, [currentRecord.id, favoriteList]);

  return {
    currentRecord,
    isFavorite,
  };
};
