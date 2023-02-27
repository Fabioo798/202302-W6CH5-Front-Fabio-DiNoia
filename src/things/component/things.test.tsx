import { useState, useEffect } from "react";
import { useThings } from "./../hooks/use.things";
import { ThingApiRepo } from "../services/api.repo";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { thingReducer } from "../reducer/thing.reducer";
import { configureStore } from "@reduxjs/toolkit";
import { ThingStructure } from "../model/model";

jest.mock("../services/api.repo");

const mockThing: ThingStructure = {
  id: 1,
  name: "test",
  category: "ciao",
};
const mockStore = configureStore({
  reducer: {
    things: thingReducer,
  },
  preloadedState: { things: [mockThing] },
});

describe("useThings", () => {
  it("should initialize state with things fetched from repo", () => {
    const mockThings: any = [{ id: 1, name: "thing1", category: "category1" }];
    const mockRepo = new ThingApiRepo() as jest.Mocked<ThingApiRepo>;
    mockRepo.getThing.mockResolvedValueOnce(mockThings);

    let result: any;
    function TestComponent() {
      result = useThings(mockRepo);
      return null;
    }

    expect(result).toEqual([]);
    mount(
      <Provider store={mockStore}>
        <TestComponent />
      </Provider>
    );
    expect(mockRepo.getThing).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockThings);
  });

  it("should call addThing on repo with correct parameter and update state", async () => {
    const mockThings: any = [{ id: 1, name: "thing1", category: "category1" }];
    const mockNewThing = { name: "newThing", category: "newCategory" };
    const mockUpdatedThings = [...mockThings, { ...mockNewThing, id: 2 }];
    const mockRepo = new ThingApiRepo() as jest.Mocked<ThingApiRepo>;
    mockRepo.getThing.mockResolvedValueOnce(mockThings);
    mockRepo.createThing.mockImplementation(async (thing) => {
      return { ...thing, id: 2 };
    });

    let result: any;
    function TestComponent() {
      result = useThings(mockRepo);
      return null;
    }

    expect(result).toEqual([]);
    mount(
      <Provider store={mockStore}>
        <TestComponent />
      </Provider>
    );
    expect(mockRepo.getThing).toHaveBeenCalledTimes(1);

    await act(async () => {
      await result.addThings(mockNewThing);
    });

    expect(mockRepo.createThing).toHaveBeenCalledWith(mockNewThing);
    expect(result).toEqual(mockUpdatedThings);
  });

  // similar tests for updateThings and deleteThing
});
function mount(arg0: JSX.Element) {
  throw new Error("Function not implemented.");
}
