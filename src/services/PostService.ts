import { Result } from '@/types/Common';
// import {axiosInstance} from '@hooks/useAxiosLoader';
// import {axiosInstance} from './BoardService.ts';
import axios, {AxiosInstance} from 'axios';

const API_URL = '/posts';

export const axiosInstance: AxiosInstance = axios.create({
	baseURL: '',
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Access-Control-Allow-Origin': '*',
		// 'x-api-key': process.env.REACT_APP_API_KEY,
		// 'Authorization': `Basic ${process.env.REACT_APP_API_TOKEN}`
	},
});

export const PostService = {

	/**
	 * Get Post
	 * @param id
	 */
	getPost: async (id: string) => {
		const {data} = await axiosInstance.get<Result<any>>(
			`${API_URL}/${id}`,
			{}
		);

		return data;
	},

	/**
	 * Get Posts
	 * @param param
	 */
	getPosts: async (param: any) => {
		// pagination total count 사용을 위해 headers 설정.
		// response > headers > x-total-count 값을 사용.
		const {data, headers} = await axiosInstance.get<Result<any>>(
			`${API_URL}?q=${param.keyword}&_start=${(param.page-1) * param.size}&_limit=${param.size}`,
			{}
		);

		return {data, headers};
	},

	/**
	 * Create Post
	 * @param param
	 */
	createPost: async (param: any) => {
		const {data} = await axiosInstance.post<Result<any>>(
			`${API_URL}/posts`,
			param
		);

		return data;
	},

}
