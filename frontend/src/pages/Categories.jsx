import { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faPlusCircle,
  faSearch,
  faT,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useCategoryStore } from "../store/category";
import CustomAlert from "../components/CustomAlert";
import { useAuthStore } from "../store/auth";

function Categories() {
  const [category, setCategory] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { isAuthenticated, user } = useAuthStore();
  const [alert, setAlert] = useState(false);
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");
  const [newCategory, setNewCategory] = useState({
    name: "",
    items: [],
    image: "",
  });
  const navigate = useNavigate();

  // Access categories directly from the store
  const { categories, createCategory,fetchCategories } = useCategoryStore();
 useEffect((()=>{
  fetchCategories()
 }),[fetchCategories])

  const handleCatClick = (catID) => {
    navigate(`/app/categories/${catID}`);
  };

  const handleNewCategory = async (e) => {
    e.preventDefault();
    const { success } = await createCategory(newCategory);
    if (success) {
      setAlert(true);
      setColor("green-500");
      setMessage("Category Added !");
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    } else {
      setAlert(true);
      setColor("red-500");
      setMessage("Failed to Add Category!");
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
    setIsEditing(false);
  };

  return (
    <div className="p-4 flex-1 bg-gray-50 dark:bg-gray-700">
      {alert && <CustomAlert message={message} color={color} />}
      {isEditing && (
        <div className="fixed inset-0 flex items-center z-10 justify-center bg-black bg-opacity-60">
          <form
            onSubmit={handleNewCategory}
            className="dark:bg-gray-700 bg-slate-100 flex flex-col gap-2 rounded-lg p-6 w-96"
          >
            <h2 className="text-lg font-semibold mb-4 dark:text-slate-100">
              New Category
            </h2>
            <div className="bg-slate-300 flex pl-2 flex-row gap-1 w-full rounded-xl p-1 items-center dark:bg-gray-800">
              <FontAwesomeIcon
                icon={faT}
                className="w-4 dark:text-slate-200 h-4"
              />
              <input
                type="text"
                value={newCategory.name}
                minLength={1}
                required
                maxLength={20}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                className="w-full border-none text-sm rounded text-zinc-900 dark:text-slate-50 bg-transparent"
                placeholder="name"
              />
            </div>
            <div className="bg-slate-300 flex flex-row pl-2 gap-1 p-1 rounded-xl items-center dark:bg-gray-800">
              <FontAwesomeIcon
                icon={faImage}
                className="w-4 dark:text-slate-200 h-4"
              />
              <input
                type="text"
                value={newCategory.image}
                minLength={1}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, image: e.target.value })
                }
                className="w-full focus:outline-none  text-sm border-none rounded   text-zinc-900 dark:text-slate-50 bg-transparent"
                placeholder="image url"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded px-4 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#FFD700] hover:bg-[#d7bb1c] text-white rounded px-4 py-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
      <p className="dark:text-slate-100 text-black font-sans font-semibold text-2xl mb-5">
        Categories
      </p>
      <div className="flex z-10 mb-10 p-2 rounded-3xl gap-2 flex-row w-80 mx-auto bg-white">
        <FontAwesomeIcon
          icon={faSearch}
          className="w-5 h-5 bg-[#1985a1] text-white rounded-full p-2"
        />
        <input
          placeholder="Search for category..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-white text-zinc-800 text-md rounded-lg p-1 w-full focus:outline-none"
        />
      </div>
      {isAuthenticated && user.username !== "guest" && (
        <div>
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="bg-[#FFD700] items-center gap-1 text-white inline-flex p-2 rounded-xl mb-5"
          >
            <FontAwesomeIcon icon={faPlusCircle} />
            New Category
          </button>
        </div>
      )}

      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {categories
          .filter((c) => c.name.toLowerCase().includes(category.toLowerCase()))
          .map((cat) => (
            <div
              key={cat._id}
              onClick={() => handleCatClick(cat._id)}
              className="bg-white cursor-pointer dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-3 flex flex-col items-center"
            >
              <div className="w-full aspect-square rounded-lg overflow-hidden mb-2">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-slate-100  text-center truncate w-full">
                {cat.name}
              </p>
            </div>
          ))}
      </div>

      {categories.filter((c) =>
        c.name.toLowerCase().includes(category.toLowerCase())
      ).length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No categories found.
        </div>
      )}
    </div>
  );
}

export default Categories;
