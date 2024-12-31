import { useParams } from "react-router-dom";
import CategoryComponentCard from "../components/CategoryComponentCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faA,
  faD,
  faDollarSign,
  faPlusCircle,
  faSearch,
  faT,
} from "@fortawesome/free-solid-svg-icons";
import { useCategoryStore } from "../store/category";
import { useState } from "react";
import CustomAlert from "../components/CustomAlert";
function Category() {
  const { id } = useParams();
  const { categories,updateCategory } = useCategoryStore();
  const [item, setItem] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState(false);
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");
  const [newItem, setNewItem] = useState({
    name: "",
    price: 0,
    description: "",
    availability: "",
  });

  const category = categories?.find((cat) => cat._id === id);
  const isAdmin = true;
  if (!category) {
    // Fallback for undefined category
    return (
      <div className="text-center text-gray-500 p-4">
        <p>No category found.</p>
      </div>
    );
  }
  const handleNewItem = async (e) => {
    
    e.preventDefault();
    const updatedCategory={
      ...category,
      items: [...category.items, newItem],
    }
    const { success } = await updateCategory(id,updatedCategory);
    if (success) {
      setAlert(true);
      setColor("green-500");
      setMessage("Category Item Added !");
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    } else {
      setAlert(true);
      setColor("red-500");
      setMessage("Failed to Category Item!");
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
    setIsEditing(false);
  };

  return (
    <div className="flex flex-1 p-1">
      {alert && <CustomAlert message={message} color={color} />}
      {isEditing && (
        <div className="fixed inset-0 flex items-center z-10 justify-center bg-black bg-opacity-60">
          <form
            onSubmit={handleNewItem}
            className="dark:bg-gray-700 bg-slate-100 flex flex-col gap-2 rounded-lg p-6 w-96"
          >
            <h2 className="text-lg font-semibold mb-4 dark:text-slate-100">
              New Item
            </h2>
            <div className="bg-slate-300 flex pl-2 flex-row gap-1 w-full rounded-xl p-1 items-center dark:bg-gray-800">
              <FontAwesomeIcon
                icon={faT}
                className="w-4 dark:text-slate-200 h-4"
              />
              <input
                type="text"
                value={newItem.name}
                minLength={1}
                required
                maxLength={20}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
                className="w-full border-none text-sm rounded text-zinc-900 dark:text-slate-50 bg-transparent"
                placeholder="name"
              />
            </div>
            <div className="bg-slate-300 flex flex-row pl-2 gap-1 p-1 rounded-xl items-center dark:bg-gray-800">
              <FontAwesomeIcon
                icon={faD}
                className="w-4 dark:text-slate-200 h-4"
              />
              <input
                type="text"
                value={newItem.description}
                minLength={1}
                maxLength={60}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
                className="w-full focus:outline-none  text-sm border-none rounded   text-zinc-900 dark:text-slate-50 bg-transparent"
                placeholder="description"
              />
            </div>
            <div className="bg-slate-300 flex flex-row pl-2 gap-1 p-1 rounded-xl items-center dark:bg-gray-800">
              <FontAwesomeIcon
                icon={faA}
                className="w-4 dark:text-slate-200 h-4"
              />
              <input
                type="text"
                value={newItem.availability}
                minLength={1}
                maxLength={30}
                onChange={(e) =>
                  setNewItem({ ...newItem, availability: e.target.value })
                }
                className="w-full focus:outline-none  text-sm border-none rounded   text-zinc-900 dark:text-slate-50 bg-transparent"
                placeholder="availability"
              />
            </div>
            <div className="bg-slate-300 flex flex-row pl-2 gap-1 p-1 rounded-xl items-center dark:bg-gray-800">
              <FontAwesomeIcon
                icon={faDollarSign}
                className="w-4 dark:text-slate-200 h-4"
              />
              <input
                type="number"
                value={newItem.price}
                minLength={1}
                required
                maxLength={5}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: e.target.value })
                }
                className="w-full focus:outline-none  text-sm border-none rounded   text-zinc-900 dark:text-slate-50 bg-transparent"
                placeholder="price $"
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
      <div className="flex-1 flex p-2 flex-col">
        <img
          src={category.image}
          alt={category.name}
          className="w-11/12 max-w-full mb-5 mx-auto lg:w-1/2 h-72 rounded-lg"
        />
        <div className="flex  p-2 rounded-3xl gap-2 flex-row w-80 mx-auto bg-white">
          <FontAwesomeIcon
            icon={faSearch}
            className="w-5 h-5 bg-[#1985a1] text-white rounded-full p-2"
          />
          <input
            placeholder="Search for item..."
            value={item}
            type="text"
            onChange={(e) => setItem(e.target.value)}
            className="bg-white text-zinc-800 text-md rounded-lg p-1 w-full border-none focus:outline-none"
          />
        </div>
        <span className="text-sm mb-5 text-gray-500 text-center">
          Search by name, specs, or price
        </span>
        <p className="text-2xl font-bold text-zinc-700 dark:text-slate-100 mb-2">
          {category.name} List:
        </p>
        {isAdmin && (
          <div>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-[#FFD700] items-center gap-1 text-white inline-flex p-2 rounded-xl mb-5"
            >
              <FontAwesomeIcon icon={faPlusCircle} />
              New Item
            </button>
          </div>
        )}
        <div className="flex flex-col flex-1">
          {category.items.length !== 0 ? (
            category.items
              ?.filter(
                (i) =>
                  i.name.toLowerCase().includes(item.toLowerCase()) ||
                  i.description.toLowerCase().includes(item.toLowerCase()) ||
                  i.price.toString().includes(item)
              )
              .map((item) => (
                <CategoryComponentCard item={item} key={item._id} />
              ))
          ) : (
            <div className="mx-auto text-gray-500 text-lg mt-10">
              No items to show
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Category;
