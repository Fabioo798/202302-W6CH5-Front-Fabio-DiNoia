import { configureStore } from "@reduxjs/toolkit";
import { thingReducer } from "../../things/reducer/thing.reducer";

export const store = configureStore({
  reducer: {
    things: thingReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
