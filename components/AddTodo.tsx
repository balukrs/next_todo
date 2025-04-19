function AddTodo(): React.ReactElement {
  return (
    <div className="flex justify-center mb-4">
      <input
        type="search"
        className="border-2 border-blue-400 rounded-md px-2 py-2 w-1/2 focus:outline-none"
        maxLength={40}
      />
      <button className="bg-blue-950 px-4 rounded-md mx-2 cursor-pointer">Add</button>
    </div>
  );
}

export default AddTodo;
