import { ThingStructure } from "../model/model";
import { ThingApiRepo } from "./api.repo";

global.fetch = jest.fn().mockResolvedValue({});

const mockThing: ThingStructure = {
  id: 1,
  name: "jest",
  isLearned: false,
  category: "web development",
};

const mockThing1: any = {
  name: "jest",
  isLearned: false,
  category: "web development",
};

describe("Given a new repo", () => {
  let repo1: ThingApiRepo;
  beforeEach(() => {
    repo1 = new ThingApiRepo();
  });
  describe("When is instanced", () => {
    test("then it should load the data from the api", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue([]),
      });
      const resp = await repo1.loadThings();
      expect(fetch).toHaveBeenCalled();
      expect(resp).toEqual([]);
    });
    test("then it should get the specified thing", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockThing),
      });
      const resp = await repo1.getThing(1);
      expect(fetch).toHaveBeenCalled();
      expect(resp).toEqual(mockThing);
    });
    test("then it should create a thing", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockThing),
      });
      const resp = await repo1.createThing(mockThing);
      expect(fetch).toHaveBeenCalled();
      expect(resp).toEqual(mockThing);
    });
    test("then it should update the thing", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockThing),
      });
      const resp = await repo1.updateThing({ id: 1, ...mockThing1 });
      expect(fetch).toHaveBeenCalled();
      expect(resp).toEqual(mockThing);
    });
    test("then it should delete the thing", async () => {
      global.fetch = jest.fn().mockResolvedValue({});
      const resp = await repo1.deleteThing(1);
      expect(fetch).toHaveBeenCalled();
      expect(resp).toBe(void 0);
    });
  });
});
