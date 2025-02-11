interface TaskListProps {
  title: string;
  tasks: string[];
}

export default function TaskList({ title, tasks }: TaskListProps) {
  return (
    <div className="text-sm">
      <h3 className=" font-medium mb-2">{title}</h3>
      <ul className="list-disc  pl-5 space-y-1">
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}
