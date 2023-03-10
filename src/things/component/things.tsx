import { useMemo, useState } from "react";
import { useThings } from "../hooks/use.things";
import { ThingStructure } from "../model/model";
import { ThingApiRepo } from "../services/api.repo";
import "./things.css";

export function Things() {
  const repo = useMemo(() => new ThingApiRepo(), []);
  const { things, addThings, deleteThing } = useThings(repo);
  const [newThingName, setNewThingName] = useState("");
  const [newThingCategory, setNewThingCategory] = useState("");

  const handleAddClick = async () => {
    console.log("Add button clicked");
    const newThing: any = [
      {
        name: newThingName,
        category: newThingCategory,
      },
    ];
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
                className="modify"
                onClick={() => {
                  // Define a function to update the thing when the "modify" button is clicked
                }}
              >
                Modify
              </button>
              <button className="delete" onClick={() => deleteThing(item.id)}>
                delete
              </button>
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
            <button className="add" onClick={handleAddClick}>
              Add
            </button>
          </li>
        </ul>
      </section>
    </>
  );
}
