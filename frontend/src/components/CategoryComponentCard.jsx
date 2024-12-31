function CategoryComponentCard({ item }) {
    return (
      <div>
        <div
          key={item.id}
          className="w-full items-center justify-between flex bg-gray-300 dark:bg-gray-600 rounded-lg p-2 mb-2"
        >
          <div className="flex flex-col ">
            <p className="font-sans   text-zinc-800 dark:text-slate-50 font-bold text-lg">
              {item.name}
            </p>
            <p className="font-sans text-zinc-800 dark:text-slate-50  text-md ml-2">
              {item.description}
            </p>
          </div>
          <p className="bg-green-500 w-16 text-center p-1 rounded-2xl">
            {item.price}$
          </p>
        </div>
      </div>
    );
  }
  
  export default CategoryComponentCard;
  