import { thingReducer } from "./thing.reducer";
import * as ac from "./thing.actions.creator";
import { ThingStructure } from "../model/model";

describe("thingReducer", () => {
  it("should handle the load action", () => {
    const things: ThingStructure[] = [
      { id: 1, name: "thing1", isLearned: false, category: "web development" },
      { id: 2, name: "thing2", isLearned: true, category: "data science" },
    ];
    const action = ac.loadCreator(things);
    const newState = thingReducer([], action);
    expect(newState).toEqual(things);
  });

  it("should handle the add action", () => {
    const thing: ThingStructure = {
      id: 1,
      name: "thing1",
      isLearned: false,
      category: "web development",
    };
    const action = ac.addCreator(thing);
    const newState = thingReducer([], action);
    expect(newState).toEqual([thing]);
  });

  it("should handle the update action", () => {
    const things: ThingStructure[] = [
      { id: 1, name: "thing1", isLearned: false, category: "web development" },
      { id: 2, name: "thing2", isLearned: true, category: "data science" },
    ];
    const updatedThing: ThingStructure = {
      id: 1,
      name: "updated thing",
      isLearned: false,
      category: "web development",
    };
    const action = ac.updateCreator(updatedThing);
    const newState = thingReducer(things, action);
    expect(newState).toEqual([updatedThing, things[1]]);
  });

  it("should handle the delete action", () => {
    const things: ThingStructure[] = [
      { id: 1, name: "thing1", isLearned: false, category: "web development" },
      { id: 2, name: "thing2", isLearned: true, category: "data science" },
    ];
    const action = ac.deleteCreator(1);
    const newState = thingReducer(things, action);
    expect(newState).toEqual([things[1]]);
  });
});
