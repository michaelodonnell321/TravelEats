import restaurantReducer from './restaurantReducer';

describe('testing restaurantReducer', () => {
    test('should return action.payload', () => {
        let action = { type: 'SET_RESTAURANTS'};
        let newState = restaurantReducer(undefined, action);
        expect(newState).toEqual(action.payload)
    })

    test('should have its correct initial state', () => {
        let action = [];
        let newState = restaurantReducer(undefined, action);
        expect(newState).toEqual([]);
    })
})