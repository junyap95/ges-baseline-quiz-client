import { TypedUseSelectorHook, useSelector } from "react-redux";
import { rootReducer } from "./rootReducer";

export type RootState = ReturnType<typeof rootReducer>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
