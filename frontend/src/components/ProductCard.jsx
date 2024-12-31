import { useState } from "react";
import CustomDropdown from "./CustomDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";

function ProductCard({ product }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newProductName, setNewProductName] = useState(product.name);
  const [newProductPrice, setNewProductPrice] = useState(product.price);
  const [newOffer, setNewOffer] = useState(product.offer);
  const [newAvailability, setNewAvailability] = useState(product.availability);
  const [newCategory, setNewCategory] = useState(product.category);
  const [newProductDescription, setNewProductDescription] = useState(
    product.description
  );
  const [newCoverImage, setNewCoverImage] = useState(product.image);

  const handleOnSelect = (item) => {
    setIsEditing(true);
    setEditingField(item);
  };
  const editableList = [
    "name",
    "category",
    "price",
    "description",
    "image",
    "availability",
    "offer",
  ];

  const renderEditField = () => {
    switch (editingField) {
      case "name":
        return (
          <input
            type="text"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            className="w-full px-2 py-1 border focus:outline-none rounded-lg bg-gray-600 text-zinc-100"
            placeholder="new name"
          />
        );
      case "description":
        return (
          <textarea
            value={newProductDescription}
            onChange={(e) => setNewProductDescription(e.target.value)}
            className="w-full px-2 py-1 border focus:outline-none rounded-lg bg-gray-600 text-zinc-100"
            placeholder="new description"
            rows={3}
          />
        );
      case "price":
        return (
          <input
            type="number"
            value={newProductPrice}
            onChange={(e) => setNewProductPrice(Number(e.target.value))}
            className="w-full px-2 py-1 border focus:outline-none rounded-lg bg-gray-600 text-zinc-100"
            placeholder="new price"
          />
        );
      case "category":
        return (
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full px-2 py-1 border focus:outline-none rounded-lg bg-gray-600 text-zinc-100"
            placeholder="new category"
          />
        );
      case "image":
        return (
          <input
            type="text"
            value={newCoverImage}
            onChange={(e) => setNewCoverImage(e.target.value)}
            className="w-full px-2 py-1 border focus:outline-none rounded-lg bg-gray-600 text-zinc-100"
            placeholder="new cover image URL"
          />
        );
      case "offer":
        return (
          <input
            type="text"
            value={newOffer}
            onChange={(e) => setNewOffer(e.target.value)}
            className="w-full px-2 py-1 border focus:outline-none rounded-lg bg-gray-600 text-zinc-100"
            placeholder="new offer"
          />
        );
      case "availability":
        return (
          <input
            type="text"
            value={newAvailability}
            onChange={(e) => setNewAvailability(e.target.value)}
            className="w-full px-2 py-1 border focus:outline-none rounded-lg bg-gray-600 text-zinc-100"
            placeholder="new availability"
          />
        );
      default:
        return null;
    }
  };

  const renderDescription = () => {
    if (product.description.length > 15 && !isDescriptionExpanded) {
      const words = product.description.split(" ");
      const preview = words.slice(0, 5).join(" ");
      return (
        <span>
          {preview}...
          <span
            onClick={() => setIsDescriptionExpanded(true)}
            className="font-sans text-sm font-normal text-slate-300 hover:text-blue-700 cursor-pointer leading-relaxed text-inherit antialiased"
          >
            Read more
          </span>
        </span>
      );
    }

    return (
      <span>
        {product.description}
        {isDescriptionExpanded && (
          <span
            onClick={() => setIsDescriptionExpanded(false)}
            className="font-sans text-sm text-slate-300 font-normal hover:text-blue-700 cursor-pointer leading-relaxed text-inherit antialiased"
          >
            ..Show less
          </span>
        )}
      </span>
    );
  };
  return (
    <div className="relative flex w-80 flex-col rounded-xl bg-white/50 bg-clip-border text-gray-800 shadow-md">
      <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
        {product.image ? (
          <img
            src={product.image}
            alt={`${product.name} cover`}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="w-full h-full inline-flex flex-col justify-center items-center">
            <FontAwesomeIcon icon={faImage} className="w-4 h-4 text-white" />
            <span>no cover image</span>
          </span>
        )}
      </div>
      <div className="p-6">
        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {product.name}
        </h5>
        <div className="block font-sans text-base leading-relaxed text-inherit antialiased">
          {isEditing && editingField ? (
            <div className="mb-4">{renderEditField()}</div>
          ) : (
            <>
              <span className="font-normal">
                Category: <span className="font-light">{product.category}</span>
              </span>
              <br />
              <span className="font-normal">
                availability:{" "}
                <span className="font-light">{product.availability}</span>
              </span>
              <br />
              <span className="font-normal">
                Description:{" "}
                <span className="font-light">{renderDescription()}</span>
              </span>
              <br />
              <span className="font-normal">
                Offers:
                <span className="font-light">{product.offer}</span>{" "}
              </span>
              <br />
              <span className="font-normal">
                Price: <span className="font-light">{product.price}</span>
              </span>
            </>
          )}
        </div>
      </div>
      {isAdmin && (
        <div className="px-6 pt-0 flex flex-wrap items-center justify-start gap-4">
          {isEditing ? (
            <>
              <button
                type="button"
                // onClick={handleSave}
                className="mr-2 rounded-lg bg-green-500 py-2 px-4 text-white"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditingField(null);
                }}
                className="rounded-lg bg-gray-500 py-2 px-4 text-white"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <CustomDropdown
                list={editableList}
                placeholder="Set a new .."
                onSelect={handleOnSelect}
              />
              <button
                type="button"
                // onClick={handleGroupDelete}
                className="select-none rounded-lg bg-red-500 py-3 px-6 mb-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Delete group
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductCard;
