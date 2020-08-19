const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
}

export const addItem = (text) => ({
  type: 'ADD_ITEM',
  payload: {
    uuid: uuid(),
    complete: false,
    completionTime: 0,
    text: text || "",
    subtopics: [],
  }
})

export const addSubItem = (parentUuid) => ({
  type: 'ADD_ITEM',
  payload: {
    parentUuid,
    uuid: uuid(),
    complete: false,
    completionTime: 0,
    text: "",
  }
})

export const updateItem = (uuid, updatedItem) => ({
  type: 'UPDATE_ITEM',
  payload: {
    uuid,
    updatedItem,
  }
});

export const updateSubItem = (parentUuid, uuid, updatedItem) => ({
  type: 'UPDATE_ITEM',
  payload: {
    parentUuid,
    uuid,
    updatedItem,
  }
});

export const deleteItem = (uuid, parentUuid) => ({
  type: 'DELETE_ITEM',
  payload: {
    uuid,
    parentUuid
  }
})