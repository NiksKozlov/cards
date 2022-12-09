const initialState = {}

export type InitialStateType = typeof initialState
export const appReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}
