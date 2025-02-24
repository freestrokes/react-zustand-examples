import { create } from 'zustand'

const useTestStore = create((set) => ({
	bears: 0,
	increasePopulation: () =>
		set((testState: any) => ({
			bears: testState.bears + 1
		})),
	removeAllBears: () =>
		set({
			bears: 0
		}),
	updateBears: (newBears: any) =>
		set({
			bears: newBears
		}),
}))

export default useTestStore;