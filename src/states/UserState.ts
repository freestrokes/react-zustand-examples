import { User } from "../types/User";

interface UserState {
	user: User;
	updateUser: (user: User) => void;
};
