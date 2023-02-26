import { createAction } from "@reduxjs/toolkit";
import { ThingStructure } from "../model/model";
import { thingsActions } from "./thing.actions.type";


export const loadCreator = createAction<ThingStructure[]>(thingsActions.load);

export const addCreator = createAction<ThingStructure>(thingsActions.add);

export const updateCreator = createAction<ThingStructure>(thingsActions.update);

export const deleteCreator = createAction<ThingStructure["id"]>(thingsActions.delete);
