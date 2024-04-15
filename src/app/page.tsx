import Header from "./components/Header";

export default function Home() {
  return (
    <body className="bg-gray-200 h-screen flex items-center justify-center">
      <div className="bg-white w-1/2 p-4 rounded-lg">
        <Header title="Bem vindo(a)!" />
      </div>
    </body>
  );
}
