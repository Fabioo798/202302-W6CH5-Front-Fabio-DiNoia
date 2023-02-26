import { ProtoThingStructure, ThingStructure } from "../model/model";
import { GET_ALL_THINGS } from "../model/url.model";

export interface ThingApiRepoStructure {
  loadThings(): Promise<ThingStructure[]>;
  getThing(id: ThingStructure["id"]): Promise<ThingStructure>;
  createThing(thing: ProtoThingStructure): Promise<ThingStructure>;
  update(thing: Partial<ProtoThingStructure>): Promise<ThingStructure>;
  delete(id: ThingStructure["id"]): Promise<void>;
}

export class ThingApiRepo {
  url: string;
  constructor() {
    this.url = GET_ALL_THINGS;
  }

  async loadThings(): Promise<ThingStructure[]> {
    const resp = await fetch(this.url);
    const data = (await resp.json()) as ThingStructure[];

    if (!data) {
      throw new Error("Failed to load thing i learned");
    }

    const dataArray = Object.values(data);

    return dataArray;
  }

  async getThing(id: ThingStructure["id"]): Promise<ThingStructure> {
    const url = this.url + id;
    const response = await fetch(url);
    const data = (await response.json()) as ThingStructure;
    if (!data) {
      throw new Error("Failed to load thing i learned");
    }
    return data;
  }

  async createThing(thing: ProtoThingStructure): Promise<ThingStructure> {
    const response = await fetch(this.url, {
      method: "PATCH",
      body: JSON.stringify(thing),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = (await response.json()) as ThingStructure;
    if (!data) {
      throw new Error("Failed to load thing i learned");
    }
    return data;
  }

  async updateThing(thing: Partial<ThingStructure>): Promise<ThingStructure> {
    const url = this.url + thing.id;
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(thing),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = (await response.json()) as ThingStructure;
    if (!data) {
      throw new Error("Failed to load thing i learned");
    }
    return data;
  }

  async deleteThing(id: ThingStructure["id"]): Promise<void> {
    const url = this.url + id;
    await fetch(url, {
      method: "DELETE",
    });
  }
}
