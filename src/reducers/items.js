const initialState = []

export default function items(state = initialState, action) {
	switch (action.type) {
		case 'ADD_ITEM':
			return addItem(state, action.payload);
		case 'UPDATE_ITEM':
			return updateItem(state, action.payload);
		case 'DELETE_ITEM':
			return deleteItem(state, action.payload)
		default:
			return state;
	}
}

const addItem = (state, payload) => {
	let updatedState = [ ...state ]

	if (payload.parentUuid) {
		for (let i = 0; i < updatedState.length; ++i) {
			const item = updatedState[i]

			if (item.uuid === payload.parentUuid) {
				updatedState[i] = {
					...item,
					subtopics: [
						...item.subtopics,
						payload
					]
				}
			}
		}
	}
	else {
		updatedState.push(payload)
	}

	return updatedState
}

const updateItem = (state, payload) => {
	let updatedState = [ ...state ]

	if (payload.parentUuid) {
		for (let i = 0; i < updatedState.length; ++i) {
			const item = updatedState[i]

			if (item.uuid === payload.parentUuid) {
				updatedState[i] = {
					...item,
					complete: item.complete 
						? item.subtopics.reduce((acc, subtopic) => {
								const uuidMatch = payload.uuid && subtopic.uuid
								const subtopicCompleteChanged = payload.updatedItem.complete !== subtopic.complete

								if (uuidMatch && subtopicCompleteChanged) {
									acc = false
								}

								return acc
							}, item.complete)
						: item.complete,
					subtopics: item.subtopics.map((subtopic) => {
						const subtopicCompleteChanged = payload.updatedItem.complete !== subtopic.complete
						if (payload.uuid === subtopic.uuid) {
							return {
								...subtopic,
								...payload.updatedItem,
								complete: item.complete && subtopicCompleteChanged && !payload.updatedItem.complete
									? false
									: payload.updatedItem.complete
							}
						}

						return subtopic
					})
				}
			}
		}
	}
	else {
		updatedState = updatedState.map((item) => {
			if (payload.uuid === item.uuid) {
				if (payload.updatedItem.complete && !item.complete) {
					return {
						...item,
						...payload.updatedItem,
						subtopics: item.subtopics.map((subtopic) => {
							return {
								...subtopic,
								complete: true,
							}
						})
					}
				}
				else {
						return {
						...item,
						...payload.updatedItem,
					}
				}
			}

			return item;
		})
	}

	return updatedState
}

const deleteItem = (state, payload) => {
	let updatedState = [ ...state ]
	
	if (payload.parentUuid) {
		for (let i = 0; i < updatedState.length; i++) {
			const item = updatedState[i];
			
			if (payload.parentUuid === item.uuid) {
				updatedState[i] = {
					...item,
					subtopics: item.subtopics.filter((subtopic) => subtopic.uuid !== payload.uuid)
				}
			}
		}
	}
	else {
		updatedState = updatedState.filter((item) => item.uuid !== payload.uuid)
	}
	
	return updatedState
}