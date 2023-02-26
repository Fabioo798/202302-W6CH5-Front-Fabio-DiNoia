/* eslint-disable testing-library/no-unnecessary-act */

import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { ThingStructure } from "../model/model";
import { thingReducer } from "../reducer/thing.reducer";
import { ThingApiRepo } from "../services/api.repo";
import { useThings } from "./use.things";

const mockRepo = {
  updateThing: jest.fn(),
  deleteThing: jest.fn(),
  createThing: jest.fn(),
  loadThings: jest.fn(),
} as unknown as ThingApiRepo;

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

describe("Given a test component", () => {
  beforeEach(() => {
    const TestComponent = function () {
      const { addThings, deleteThing, updateThings } = useThings(mockRepo);

      return (
        <div className="buttoncontainer">
          <button title="addbutton" onClick={() => addThings(mockThing)}>
            add
          </button>
          <button title="deletebutton" onClick={() => deleteThing(1)}>
            del
          </button>
          <button title="updatebutton" onClick={() => updateThings(mockThing)}>
            update
          </button>
        </div>
      );
    };
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <Provider store={mockStore}>
        <TestComponent />
      </Provider>
    );
  });

  describe("when addThing is called", () => {
    test("then it should create a new Thing", async () => {
      await fireEvent.click(screen.getByText(/add/i));
      expect(mockRepo.createThing).toHaveBeenCalled();
    });
  });
  describe("when delThing is called", () => {
    test("then it should render a list of Thing", async () => {
      await fireEvent.click(screen.getByText(/del/i));
      expect(mockRepo.deleteThing).toHaveBeenCalled();
    });
  });
  describe("when updateThing is called", () => {
    test("then it should render a list of Thing", async () => {
      await fireEvent.click(screen.getByText(/update/i));
      expect(mockRepo.updateThing).toHaveBeenCalled();
    });
  });
});
