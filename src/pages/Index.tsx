import { Calculator } from "@/components/Calculator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Calculator App</h1>
      <Calculator />
      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        A simple calculator built with React and Tailwind CSS
      </p>
    </div>
  );
};

export default Index;