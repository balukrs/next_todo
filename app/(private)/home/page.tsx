'use client';
import { useEffect, useState } from 'react';
import ListLayout from '@/components/ListLayout';
import AddTodo from '@/components/AddTodo';
import { useFetch } from '@/utils/hooks/useFetch';
import { ToDoResponse } from '@/types/todo';
import { ToDoType } from '@/models/tasks';

function Home(): React.ReactElement {
  const [notes, setNotes] = useState<ToDoType[] | undefined>([]);
  const { fetchData } = useFetch<ToDoResponse>();

  const fetchNotes = async (): Promise<ToDoResponse | null> => {
    const response = await fetchData('api/todo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setNotes(response?.data);
    return response;
  };

  useEffect(() => {
    void fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <AddTodo />
      <ListLayout notes={notes} />
    </div>
  );
}

export default Home;
