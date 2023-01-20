import Head from "next/head";
import { day, date, time } from "../utils/date_time";
import { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import * as chrono from "chrono-node";
import { removeStopwords } from "stopword";
import { to12Hours } from "../utils/to12Hours";

export default function Home() {
  // removing the hydration error
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  const ISSERVER = typeof window === "undefined";

  const [input, setInput] = useState("");
  let [todos, setTodos] = useState(
    !ISSERVER && localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  const handleSubmit = (e) => {
    if (input == "") return;

    // NLP parsing
    const referenceDate = new Date();
    const parsedResults = chrono.parse(input, referenceDate, {
      forwardDate: true,
    });

    //removing stop words from the task name
    const oldTaskStrings = input.slice(0, parsedResults[0]?.index).split(" ");
    const newTaskString = removeStopwords(oldTaskStrings, [
      "by",
      "BY",
      "By",
      "The",
      "the",
      "THE",
      "a",
      "A",
      "from",
      "From",
      "FROM",
      "at",
      "AT",
      "At",
      "in",
      "IN",
      "In",
      "for",
      "For",
      "FOR",
    ]);
    const taskString = newTaskString.join(" ");
    const todoItem = {
      id: Date.now(),
      day: parsedResults[0]?.start.date().toString().slice(0, 15),
      time: to12Hours(
        parsedResults[0]?.start.date().toLocaleTimeString().slice(0, 5)
      ),
      task: taskString,
      completed: false,
    };
    if (todoItem.day == undefined) {
      // console.log(todoItem.time);
      todoItem.day = "No Deadline";
      todoItem.time = "";
    }
    setTodos([...todos, todoItem]);
    setInput("");
    localStorage.setItem("todos", JSON.stringify([...todos, todoItem]));
  };

  const handleKeyUp = (e) => {
    if (e.keyCode == 13) {
      handleSubmit(e);
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id != id));

    localStorage.setItem(
      "todos",
      JSON.stringify(todos.filter((todo) => todo.id != id))
    );
    // console.log("deleted item with id: ", id);
    // console.log(todos);
  };

  const handleCompleted = (id) => {
    let todosCopy = [...todos];
    for (let i = 0; i < todosCopy.length; i++) {
      if (todosCopy[i].id == id) {
        todosCopy[i].completed = !todosCopy[i].completed;
      }
    }
    setTodos(todosCopy);
    localStorage.setItem("todos", JSON.stringify(todosCopy));
    // console.log("completed toggled item with id: ", id);
    // console.log(todos);
  };

  if (!hydrated) return null;

  return (
    <>
      <Head>
        <title>TodoFirst</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&family=Montserrat:ital,wght@0,300;0,400;0,500;1,200&family=Russo+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="flex h-screen flex-col items-center sm:flex-row">
        <div className="mx-auto font-inter text-3xl md:text-6xl text-blue-600 font-black ">
          TodoFirst
        </div>
        <div className="mx-auto font-inter">
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img
                src="/images/todoimage.jpg"
                alt="Abstract Image"
                className="z-40 h-56 w-80 rounded-xl shadow-md blur-xs"
              />
              <div className="absolute right-20 top-36 z-50 font-inter text-gray-700">
                <div className="text-md text-end font-russo">
                  {day} {date}
                </div>
                <div className="font-russo text-4xl">{time}</div>
              </div>
            </figure>
            <div className="card-body">
              <div>
                <div>
                  <div className="flex flex-row">
                    <input
                      type="text"
                      className="input input-bordered w-3/4 input-md font-montserrat ml-3"
                      onChange={(e) => {
                        setInput(e.target.value);
                        // console.log(e.target.value);
                      }}
                      onKeyUp={handleKeyUp}
                      value={input}
                      autoFocus={true}
                    />
                    <button
                      className="btn btn-primary btn-md font-montserrat ml-3 py-2"
                      onClick={handleSubmit}
                    >
                      +
                    </button>
                  </div>
                  <div className="mt-3 overflow-y-auto h-56">
                    {todos.length > 0 ? (
                      todos.map((todoItem, index) => (
                        <div
                          className="flex flex-row justify-between items-center "
                          key={index}
                        >
                          <TodoItem
                            key={index}
                            todoItem={todoItem}
                            handleCompleted={handleCompleted}
                            handleDelete={handleDelete}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="font-russo text-gray-600 text-center pt-4">
                        Wow Such Empty 🤙
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
