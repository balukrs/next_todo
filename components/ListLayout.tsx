import { ToDoType } from '@/models/tasks';

function ListLayout({ notes }: { notes: ToDoType[] | undefined }): React.ReactElement {
  return (
    <div className="min-h-[400] rounded-md inset-shadow-sm inset-shadow-gray-900 bg-blue-950 px-6 py-6">
      {notes?.map((item: ToDoType, inx: number) => (
        <div
          className="flex justify-between w-full px-4 py-3 bg-midnight rounded-sm items-center mb-2"
          key={`${item.title}-${inx}`}
        >
          <input type="checkbox" />
          <div className="w-4/6 font-bold">
            <p>{item?.title}</p>
          </div>
          <div>
            <button className=" bg-midblue px-2 py-2 rounded-sm mr-2">Archive</button>
            <button className=" bg-red-500 px-2 py-2 rounded-sm mr-2">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListLayout;
