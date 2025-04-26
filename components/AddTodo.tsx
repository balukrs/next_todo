'use client';

import { useState } from 'react';
import { useFetch } from '@/utils/hooks/useFetch';
import Notifications from '@/utils/Notification';

function AddTodo(): React.ReactElement {
  const [title, setTitle] = useState<string>('');
  const { isLoading, fetchData } = useFetch();

  const onSubmit = async (title: string): Promise<undefined> => {
    if (!title) return;
    const response = await fetchData('api/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    if (response?.success != null) {
      Notifications(response.message, 'success');
      setTitle('');
    } else if (response?.message != null) {
      Notifications(response.message, 'error');
      setTitle('');
    }
  };

  return (
    <div className="flex justify-center mb-4">
      <input
        type="search"
        className="border-2 border-blue-400 rounded-md px-2 py-2 w-1/2 focus:outline-none"
        maxLength={40}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') void onSubmit(title);
        }}
        value={title}
      />
      <button
        className="bg-blue-950 px-4 rounded-md mx-2 cursor-pointer"
        onClick={() => onSubmit(title)}
      >
        {isLoading ? 'Loading...' : 'Add'}
      </button>
    </div>
  );
}

export default AddTodo;
