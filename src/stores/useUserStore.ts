import { create, ExtractState, StoreApi } from "zustand";
import { User } from "@/types/User";
import { UserState } from "@/states/UserState";

const useUserStore = create<UserState>((set, get) => ({
	user: {} as User,
	updateUser: (user: User) =>
		set((state: UserState) => ({
			user: { ...state.user, ...user },
		})),
}));

export const getUserState = () => useUserStore.getState;
export const useUserState = () => useUserStore((store: ExtractState<StoreApi<UserState>>) => store.user);
export const useUpdateUser = () => useUserStore((store: ExtractState<StoreApi<UserState>>) => store.updateUser);
