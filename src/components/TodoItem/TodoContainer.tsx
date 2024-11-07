/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { TodoType } from "../../lib/types/TodoTypes";
import styles from "./TodoItem.module.css";
import TodoItem from "./TodoItem";
import {
  ItemRenderProps,
  SortableItem,
  SortableItemProps,
  SortableList,
} from "@thaddeusjiang/react-sortable-list";
import { memo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/hooks/hooks";
import { replaceAllTodos, selectTodos } from "../../store/slices/todoSlice";
// import { memo } from "react";

type Props = {
  displayedTodos: TodoType[];
  search: string;
  filter: string;
};

const TodoContainer = ({ displayedTodos, search, filter }: Props) => {
  const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<SortableItemProps[]>([]);

  useEffect(() => {
    setItems(
      displayedTodos.map((todo) => {
        return {
          id: todo.id!.toString(),
          content: todo,
        };
      })
    );
  }, [displayedTodos]);

  useEffect(() => {
    // if (search.length > 0 || filter.toLowerCase() !== "all") {
    //   const notShowedTodo = todos.filter((item) => {
    //     const filtered =
    //       item.title
    //         .toLowerCase()
    //         .replace(" ", "")
    //         .includes(search.toLowerCase().replace(" ", "")) &&
    //       item.status.toLowerCase().includes(filter.toLowerCase());

    //     return !filtered;
    //   });

    //   const newTodos = new Array<TodoType>(todos.length).fill({
    //     id: undefined,
    //     title: "",
    //     description: "",
    //     status: "active",
    //   });

    //   notShowedTodo.forEach((todo) => {
    //     const index = todos.indexOf(todo);
    //     newTodos[index] = todo;
    //   });

    //   let numberOfElementChange = 0;
    //   newTodos.forEach((todo, index) => {
    //     const { id } = todo;
    //     if (!id) {
    //       const found = items.find((item) => Number(item.id) === id);
    //       if (found) {
    //         newTodos[index] = found.content;
    //         numberOfElementChange++;
    //       }
    //     }
    //   });

    //   dispatch(replaceAllTodos(newTodos));

    //   return;
    // }

    const newOrder = items.map((item) => item.content);
    let hasChanged: boolean = false;

    newOrder.forEach((item, index) => {
      if (item.id !== displayedTodos[index].id) {
        hasChanged = true;
      }
    });

    if (hasChanged) {
      dispatch(replaceAllTodos(newOrder));
    }
  }, [items, dispatch]);
  return (
    <div className={styles.list_container}>
      <SortableList items={items} setItems={setItems}>
        {({ items }: { items: SortableItemProps[] }) => (
          <>
            {items.map((item: SortableItemProps) => (
              <div style={{ position: "relative" }} key={item.id}>
                <SortableItem
                  key={item.id}
                  id={item.id}
                  DragHandler={(props) => (
                    <img
                      src="/icons/three-bars.svg"
                      alt="drag"
                      {...props}
                      width={24}
                      style={{
                        position: "absolute",
                        left: 16,
                        top: 16,
                        cursor: "grab",
                      }}
                    />
                  )}
                >
                  <TodoItem todo={item.content} />
                </SortableItem>
              </div>
            ))}
          </>
        )}
      </SortableList>
    </div>
  );
};

export default memo(TodoContainer);
