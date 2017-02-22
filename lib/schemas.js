Schemas = {};
Schemas.Department = new SimpleSchema({
    id: {
      type: String,
      max: 200
    },
    name: {
        type: String
    },
    description: {
        type: String,
        max: 1024
    }
});
DepartmentContext = Schemas.Department.newContext();
Schemas.Storage = new SimpleSchema({
    id: {
      type: String,
      max: 200
    },
    uuid: {
        type: String,
        max: 200
    },
    name: {
        type: String
    },
    description: {
        type: String,
        max: 1024
    },
    location: {
      type: String,
      max: 255
    }
});
StorageContext = Schemas.Storage.newContext();

Schemas.Items = new SimpleSchema({
    id: {
      type: String,
      max: 200
    },
    uuid: {
        type: String,
        max: 200
    },
    name: {
        type: String
    },
    description: {
        type: String,
        max: 1024
    },
    storage: {
      type: String,
      max: 255
    },
    caretaker: {
      type: String,
      max: 255
    }
});
ItemContext = Schemas.Items.newContext();
Schemas.Caretakers = new SimpleSchema({
    id: {
      type: String,
      max: 200
    },
    name: {
        type: String
    },
    description: {
        type: String,
        max: 1024
    },
    email: {
        type: SimpleSchema.RegEx.Email,
        max: 255
    },
});
CaretakersContext = Schemas.Caretakers.newContext();
