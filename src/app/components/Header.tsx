interface Props {
  title: string;
}

export default function Header({ title }: Props) {
  return (
    <main>
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
    </main>
  );
}
