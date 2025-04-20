import ListLayout from '@/components/ListLayout';
import AddTodo from '@/components/AddTodo';

function Home(): React.ReactElement {
  return (
    <div>
      <AddTodo />
      <ListLayout />
    </div>
  );
}

export default Home;
