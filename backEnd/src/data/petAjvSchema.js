const petAjvSchema = {
  type: "object",
  properties: {
    type: { type: "string" },
    name: { type: "string" },
    adoptionStatus: { type: "string" },
    picture: { type: "string" },
    height: { type: "string" },
    weight: { type: "string" },
    color: { type: "string" },
    bio: { type: "string" },
    hypoallergenic: { type: "string" },
    dietaryRestrictions: { type: "string" },
    breed: { type: "string" },
  },
  required: [
    "type",
    "name",
    "adoptionStatus",
    "picture",
    "height",
    "weight",
    "color",
    "hypoallergenic",
    "breed",
  ],
  additionalProperties: false,
};

export default petAjvSchema;
