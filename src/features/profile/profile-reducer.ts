const initialState = {}

export type InitialStateType = typeof initialState
export const profileReducer = (
  state: InitialStateType = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    default:
      return state
  }
}
