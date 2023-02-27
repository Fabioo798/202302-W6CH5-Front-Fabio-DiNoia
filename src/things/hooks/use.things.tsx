import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/store/store";
import { ThingApiRepo } from "../services/api.repo";
import * as ac from "../reducer/thing.actions.creator";
import { useEffect } from "react";
import { ProtoThingStructure, ThingStructure } from "../model/model";

export function useThings(repo: ThingApiRepo) {
  const things = useSelector((state: RootState) => state.things);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const loadThings = async () => {
      try {
        const data = await repo.loadThings();
        dispatch(ac.loadCreator(data));
      } catch (error) {
        console.log((error as Error).message);
      }
    };
    loadThings();
  }, [dispatch, repo]);

  useEffect(() => {
    // Update the things in the store whenever the things array changes
    dispatch(ac.loadCreator(things));
  }, [dispatch, things]);

  const addThings = async (thing: ProtoThingStructure) => {
    try {
      const finalThing = await repo.createThing(thing);
      dispatch(ac.addCreator(finalThing));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const updateThings = async (thing: Partial<ThingStructure>) => {
    try {
      const finalThing = await repo.updateThing(thing);
      dispatch(ac.updateCreator(finalThing));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const deleteThing = async (id: ThingStructure["id"]) => {
    try {
      repo.deleteThing(id);
      dispatch(ac.deleteCreator(id));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return {
    things,
    addThings,
    updateThings,
    deleteThing,
  };
}
