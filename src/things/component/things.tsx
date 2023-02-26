import { useMemo, useState } from "react";
import { useThings } from "../hooks/use.things";
import { ProtoThingStructure, ThingStructure } from "../model/model";
import { ThingApiRepo } from "../services/api.repo";

export function Things() {
  const repo = useMemo(() => new ThingApiRepo(), []);
  const { things, addThings, updateThings, deleteThing } = useThings(repo);
  const [newThingName, setNewThingName] = useState("");
  const [newThingCategory, setNewThingCategory] = useState("");

  const handleAddClick = async () => {
    const newThing: any = [{
      name: newThingName,
      category: newThingCategory,
    }];
    await addThings(newThing);
    setNewThingName("");
    setNewThingCategory("");
  };

  return (
    <>
      <h1>Thing List</h1>
      <section>
        <ul>
          {things.map((item: ThingStructure) => (
            <li key={item.id}>
              {item.name} | {item.category}
              <button
                onClick={() => {
                  // Define a function to update the thing when the "modify" button is clicked
                }}
              >
                Modify
              </button>
              <button onClick={() => deleteThing(item.id)}>delete</button>
            </li>
          ))}
          <li>
            <input
              type="text"
              value={newThingName}
              onChange={(e) => setNewThingName(e.target.value)}
            />
            <input
              type="text"
              value={newThingCategory}
              onChange={(e) => setNewThingCategory(e.target.value)}
            />
            <button onClick={handleAddClick}>Add</button>
          </li>
        </ul>
      </section>
    </>
  );
}
