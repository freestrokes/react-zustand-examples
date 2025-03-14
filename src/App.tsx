// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import '@/App.css'
import {
  UseMutationResult,
  // useQuery,
  UseQueryResult
} from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
// import { PostService } from '@/services/PostService.ts';
import { useFetchPosts, useMutatePost } from '@/queries/PostQuery';
import { useImmer } from 'use-immer';
import {
  // getTestState,
  useTestState,
  useTestIncreasePopulation,
  useTestRemoveAllBears,
  useTestUpdateBears
} from '@/stores/useTestStore';
import useCommonStore, {
  // useCommonState,
  // useCommonLangValue,
  // useCommonSpinnerValue,
  // useCommonTitleValue,
  // useCommonAccessTokenValue,
  // useCommonUpdateLang,
  // useCommonUpdateSpinner,
  // useCommonUpdateTitle,
  // useCommonUpdateAccessToken
} from '@/stores/useCommonStore';
// import useStore from "@/store";

// const queryClient = new QueryClient();

function App() {

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  | States & Variables
  |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

  // hook 으로 export 되었기 때문에 변수에 할당해서 사용.
  const testState: number = useTestState();
  const testIncreasePopulation = useTestIncreasePopulation();
  const testRemoveAllBears = useTestRemoveAllBears();
  const testUpdateBears = useTestUpdateBears();

  // zustand persist 확인을 위한 store 호출
  // const lang: string = useCommonState().lang;
  // const spinner: boolean = useCommonState().spinner;
  // const title: string = useCommonState().title;
  // const accessToken: string = useCommonState().accessToken;
  // const updateLang = useCommonState().updateLang;
  // const updateSpinner = useCommonState().updateSpinner;
  // const updateTitle = useCommonState().updateTitle;
  // const updateAccessToken = useCommonState().updateAccessToken;
  const {
    lang,
    spinner,
    title,
    accessToken,
    updateLang,
    updateSpinner,
    updateTitle,
    updateAccessToken
  } = useCommonStore();

  const [
    postsParam,
    // setPostsParam
  ] = useState<any>({} as any);
  const [updateParam, setUpdateParam] = useImmer(0);

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  | Queries
  |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

  const { data }: UseQueryResult = useFetchPosts(postsParam);
  const createPost: UseMutationResult = useMutatePost();

  // const useSignup = (mutationOptions?: UseMutationCustomOptions) => {
  //   return useMutation({
  //     mutationFn: postSignup,
  //     ...mutationOptions,
  //   });
  // };
  //
  // const signupMutation = useSignup();

  // const {
  //   data,
  //   // error,
  //   // isLoading
  // }: UseQueryResult = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: () => PostService.getPosts(postsParam),
  //   select: (result) => result.data,
  //   // enabled: enabled ?? false,
  // });

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  | Hooks
  |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

  useEffect(() => {
    console.log("fetching data >>> ", data);
    // if (postsParam && Object.keys(postsParam).length) {
    //   console.log("fetching data > ", data);
    // }
  }, [data]);

  useEffect(() => {
    if (createPost.isSuccess) {
      console.log("mutate success > ", createPost.data);
    }
  }, [createPost]);

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  | Functions
  |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

  // const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   console.log(e.key);
  //   setUpdateParam(parseInt(e.key));
  // };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setUpdateParam(parseInt(e.target.value));
  };

  const onClickUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    testUpdateBears(updateParam);

    console.log('====== Before State Changed ======');
    console.log('App >>> onClickUpdate >>> lang', lang);
    console.log('App >>> onClickUpdate >>> spinner', spinner);
    console.log('App >>> onClickUpdate >>> title', title);
    console.log('App >>> onClickUpdate >>> accessToken', accessToken);

    updateLang('en');
    updateSpinner(true);
    updateTitle('Title changed.');
    updateAccessToken('Access Token changed.');

    console.log('====== After State Changed ======');
    console.log('App >>> onClickUpdate >>> lang', lang);
    console.log('App >>> onClickUpdate >>> spinner', spinner);
    console.log('App >>> onClickUpdate >>> title', title);
    console.log('App >>> onClickUpdate >>> accessToken', accessToken);
  };

  const onClickCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createPost.mutate(postsParam);
  };

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Mark Up
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error loading posts</p>;

  return (
    <div>
      <h1>{testState} around here...</h1>
      <br></br>
      {/*<input type="number" onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDownInput(e)}></input>*/}
      <input type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeInput(e)}></input>
      <button onClick={() => testIncreasePopulation()}>one up</button>
      <button onClick={() => testRemoveAllBears()}>remove all</button>
      <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClickUpdate(e)}>update</button>
      <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClickCreate(e)}>Add Post</button>
    </div>
  )

  // const { user, updateUser, modalOpen, toggleModal } = useStore();
  // const queryClient = useQueryClient();
  //
  // // 할 일 목록 가져오기
  // const { data: todos, isLoading, isError } = useQuery({queryKey: ["todos"], queryFn: fetchTodos});
  //
  // // 할 일 추가
  // const mutationAddTodo = useMutation(addTodo, {
  //   onSuccess: (newTodo: any) => {
  //     queryClient.setQueryData(["todos"], (old :any) => [...old, newTodo]);
  //   },
  // });
  //
  // // 할 일 삭제
  // const mutationDeleteTodo = useMutation(deleteTodo, {
  //   onSuccess: (id: any) => {
  //     queryClient.setQueryData(["todos"], (old: any) => old.filter((todo: any) => todo.id !== id));
  //   },
  // });
  //
  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Error loading todos</p>;

  // return (
  //   <div style={{ padding: "20px" }}>
  //     <h1>Zustand & React Query Example</h1>
  //
  //     {/* 사용자 정보 */}
  //     <section>
  //       <h2>User Info</h2>
  //       <p>
  //         <strong>Name:</strong> {user.name}
  //       </p>
  //       <p>
  //         <strong>Email:</strong> {user.email}
  //       </p>
  //       <button onClick={() => updateUser({ name: "Jane Doe" })}>Change Name</button>
  //     </section>
  //
  //     <hr />
  //
  //     {/* 할 일 목록 */}
  //     <section>
  //       <h2>Todos</h2>
  //       <ul>
  //         {(todos as any).map((todo: any) => (
  //           <li key={todo.id} style={{ marginBottom: "8px" }}>
  //             {todo.title}{" "}
  //             <button
  //               style={{ marginLeft: "10px", color: "red" }}
  //               onClick={() => mutationDeleteTodo.mutate(todo.id)}
  //             >
  //               Remove
  //             </button>
  //           </li>
  //         ))}
  //       </ul>
  //       <button
  //         onClick={() =>
  //           mutationAddTodo.mutate({
  //             title: `New Todo ${(todos as any).length + 1}`,
  //             completed: false,
  //           } as any)
  //         }
  //       >
  //         Add Todo
  //       </button>
  //     </section>
  //
  //     <hr />
  //
  //     {/* UI 상태 */}
  //     <section>
  //       <h2>Modal</h2>
  //       <p>Modal is {modalOpen ? "Open" : "Closed"}</p>
  //       <button onClick={toggleModal}>{modalOpen ? "Close" : "Open"} Modal</button>
  //     </section>
  //   </div>
  // );

  // const [count, setCount] = useState(0)
  //
  // return (
  //   <>
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )
}

export default App
