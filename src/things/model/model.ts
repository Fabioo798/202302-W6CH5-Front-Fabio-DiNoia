type HasId = {
  id: number;
};

export type ProtoThingStructure = {
  name: string;
  category: string;
  isLearned?:boolean;
};

export type ThingStructure = HasId & ProtoThingStructure;
