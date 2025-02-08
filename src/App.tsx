// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import '@/App.css'

import {
  QueryClient,
  // QueryClientProvider,
  useQuery, useMutation,
  useQueryClient
} from "@tanstack/react-query";
import useStore from "@/store";

const queryClient = new QueryClient();

// API 함수
const fetchTodos = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
  return response.json();
};

const addTodo = async (newTodo: any) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });
  return response.json();
};

const deleteTodo = async (id: any) => {
  await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "DELETE",
  });
  return id;
};

function App() {

  const { user, updateUser, modalOpen, toggleModal } = useStore();
  const queryClient = useQueryClient();

  // 할 일 목록 가져오기
  const { data: todos, isLoading, isError } = useQuery({queryKey: ["todos"], queryFn: fetchTodos});

  // 할 일 추가
  const mutationAddTodo = useMutation(addTodo, {
    onSuccess: (newTodo: any) => {
      queryClient.setQueryData(["todos"], (old :any) => [...old, newTodo]);
    },
  });

  // 할 일 삭제
  const mutationDeleteTodo = useMutation(deleteTodo, {
    onSuccess: (id: any) => {
      queryClient.setQueryData(["todos"], (old: any) => old.filter((todo: any) => todo.id !== id));
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading todos</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Zustand & React Query Example</h1>

      {/* 사용자 정보 */}
      <section>
        <h2>User Info</h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <button onClick={() => updateUser({ name: "Jane Doe" })}>Change Name</button>
      </section>

      <hr />

      {/* 할 일 목록 */}
      <section>
        <h2>Todos</h2>
        <ul>
          {(todos as any).map((todo: any) => (
            <li key={todo.id} style={{ marginBottom: "8px" }}>
              {todo.title}{" "}
              <button
                style={{ marginLeft: "10px", color: "red" }}
                onClick={() => mutationDeleteTodo.mutate(todo.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() =>
            mutationAddTodo.mutate({
              title: `New Todo ${(todos as any).length + 1}`,
              completed: false,
            } as any)
          }
        >
          Add Todo
        </button>
      </section>

      <hr />

      {/* UI 상태 */}
      <section>
        <h2>Modal</h2>
        <p>Modal is {modalOpen ? "Open" : "Closed"}</p>
        <button onClick={toggleModal}>{modalOpen ? "Close" : "Open"} Modal</button>
      </section>
    </div>
  );

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
