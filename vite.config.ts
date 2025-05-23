import {
	ConfigEnv,
	defineConfig,
	loadEnv
} from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
// import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default ({ mode }: ConfigEnv) => {
	// 현재 작업 디렉터리의 `mode`를 기반으로 env 파일을 불러옴
	// 세 번째 매개변수를 ''로 설정하면 `VITE_` 접두사에 관계없이
	// 모든 환경 변수를 불러옴
	const env = loadEnv(mode, process.cwd(), '');

	return defineConfig({
		plugins: [
			react(),
			// tsconfigPaths()
		],
    // Vite 설정
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
		server: {
			port: 5173,
			proxy: env.VITE_ENV === 'localhost' ? {
				// 문자열만:
				// http://localhost:5173/foo
				//   -> http://localhost:4567/foo
				// '/foo': 'http://localhost:4567',

				// 옵션과 함께:
				// http://localhost:5173/api/bar
				//   -> http://jsonplaceholder.typicode.com/bar
				'/api': {
					target: `${env.VITE_API_URL}`,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ''),
					secure: false,  // SSL 인증서 검증 무시
					ws: true, // WebSocket 프로토콜 사용
				},

				// 정규식(RegExp)과 함께:
				// http://localhost:5173/fallback/
				//   -> http://jsonplaceholder.typicode.com/
				// '^/fallback/.*': {
				//   target: 'http://jsonplaceholder.typicode.com',
				//   changeOrigin: true,
				//   rewrite: (path) => path.replace(/^\/fallback/, '')
				// },

				// 프락시 인스턴스 사용
				// '/api': {
				//   target: 'http://jsonplaceholder.typicode.com',
				//   changeOrigin: true,
				//   configure: (proxy, options) => {
				//     // proxy 변수에는 'http-proxy'의 인스턴스가 전달됩니다
				//   }
				// },

				// 웹소켓 또는 socket.io 프락시:
				// ws://localhost:5173/socket.io
				//   -> ws://localhost:5174/socket.io
				// `rewriteWsOrigin`을 사용할 때는 주의하세요.
				// CSRF 공격에 노출될 수 있습니다.
				// '/socket.io': {
				//   target: 'ws://localhost:5174',
				//   ws: true,
				//   rewriteWsOrigin: true,
				// }
			} : undefined
		},
		resolve: {
			alias: [
				{ find: '@', replacement: path.resolve(__dirname, './src') }
			]
		}
	})
}
