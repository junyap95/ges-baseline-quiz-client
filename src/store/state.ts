import { TypedUseSelectorHook, useSelector } from "react-redux";
import { rootReducer, gesRootReducer } from "./rootReducer";

export type RootState = ReturnType<typeof rootReducer>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type GesRootState = ReturnType<typeof gesRootReducer>;

export const useGesSelector: TypedUseSelectorHook<GesRootState> = useSelector;
