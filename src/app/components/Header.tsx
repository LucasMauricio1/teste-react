interface Props {
  title: string
}

export default function Header({title}: Props) {
  return (
    <div className="flex justify-center">
      <h1 className="text-4xl font-bold">{title}</h1>
    </div>
  )
}