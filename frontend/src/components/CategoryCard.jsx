import React from "react";

function CategoryCard(props) {
  return (
    <div className="group relative flex flex-col items-center max-w-32 max-h-32 p-4 min-w-32 min-h-32 rounded-3xl bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-zinc-700">
      <div className="w-full aspect-video mb-3 overflow-hidden rounded-xl" onClick={props.onClick}>
        <img 
          src={props.category.image} 
          alt={props.category.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <label className="text-sm font-medium text-center truncate w-full text-zinc-800 dark:text-zinc-100">
        {props.category.name}
      </label>
    </div>
  );
}

export default CategoryCard;