import { create } from "zustand";
import { User } from "@/types/User";
import { UserState } from "@/states/UserState";

const useUserStore = create<UserState>((set) => ({
	user: {} as User,
	updateUser: (user: User) =>
		set((state: UserState) => ({
			user: { ...state.user, ...user },
		})),
}));

export default useUserStore;