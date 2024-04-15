import Header from "./components/Header";
import Icon from "./components/Icon";

export default function Home() {
  return (
    <body className="bg-gray-200 h-screen flex items-center justify-center w-screen">
      <div className="bg-white w-1/2 p-4 rounded-lg flex flex-col gap-4">
        <Header title="Bem vindo(a)!" />
        <Icon name="user" size={8}/>
      </div>
    </body>
  );
}
