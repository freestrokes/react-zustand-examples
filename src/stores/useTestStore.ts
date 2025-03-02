import { create } from 'zustand'
import { ExtractState, StoreApi } from 'zustand/index';
import { TestState } from '@/states/TestState';

const useTestStore = create<TestState>((set) => ({
	bears: 0,
	increasePopulation: () =>
		set((testState: any) => ({
			bears: testState.bears + 1
		})),
	removeAllBears: () =>
		set({
			bears: 0
		}),
	updateBears: (newBears: number) =>
		set({
			bears: newBears
		}),
}))

export const getTestState = () => useTestStore.getState;
export const useIncreasePopulation = () => useTestStore((store: ExtractState<StoreApi<TestState>>) => store.increasePopulation);
export const useRemoveAllBears = () => useTestStore((store: ExtractState<StoreApi<TestState>>) => store.removeAllBears);
export const useUpdateBears = () => useTestStore((store: ExtractState<StoreApi<TestState>>) => store.updateBears);
