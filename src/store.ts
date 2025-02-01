// store.js
import { create } from "zustand";

const useStore = create((set) => ({
	// 사용자 정보 관리
	user: {
		name: "John Doe",
		email: "john.doe@example.com",
	},
	updateUser: (newUser: any) =>
		set((state: any) => ({
			user: {
				...state.user,
				...newUser
			},
		})),

	// UI 상태
	modalOpen: false,
	toggleModal: () =>
		set((state: any) => ({
			modalOpen: !state.modalOpen,
		})),
}));

export default useStore;