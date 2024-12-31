import React, { useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      product: "Floral Print Wrap Dress",
      color: "Blue",
      size: "42",
      price: 20.5,
      quantity: 2,
      desciption:
        "vgvy gugugu gughhggug gugugug gugu gugu ghugugug gugugu guggu ugug bhugughih",
      img: "https://plus.unsplash.com/premium_photo-1680985551009-05107cd2752c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGhvbmV8ZW58MHx8MHx8fDA%3D",
    },
    {
      product: "Floral Print Wrap Dress",
      color: "Blue",
      size: "42",
      price: 30.5,
      quantity: 1,
      desciption:
        "igui gyugig gyugiygyg hiyfyufi gyufuyfyfy yugfuygyf gygy gyg ygfytf yguyg",
      img: "https://plus.unsplash.com/premium_photo-1681302427948-2fd0eca629b1?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bGFwdG9wfGVufDB8fDB8fHww",
    },
  ]);

  const handleQuantityChange = (index, quantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = quantity;
    setCartItems(updatedCartItems);
  };

  return (
    <div className="p-4 w-full h-full bg-yellow-500">
      <div className=" w-11/12 h-full rounded-lg shadow-md"></div>
      <div>
        <p>Shopping Cart</p>
        <p>{cartItems.length} items in your cart</p>
      </div>
      <table className="w-3/4 table-auto overflow-hidden rounded-3xl">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-black font-sans font-normal">
              Product
            </th>
            <th className="px-4 py-2 text-left text-black font-sans font-normal">
              Price
            </th>
            <th className="px-4 py-2 text-center text-black font-sans font-normal">
              Quantity
            </th>
            <th className="px-4 py-2 text-right text-black font-sans font-normal">
              Total Price
            </th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index} className="border-b bg-gray-400 border-gray-600">
              <td className="px-4 py-2 text-left w-1/2">
                <div className="w-full flex flex-row items-center gap-3">
                  <img
                    src={item.img}
                    className="w-24 h-36 object-cover rounded-2xl "
                  />
                  <div>
                    <p className="text-black">{item.product}</p>
                    <p className="text-red-800 text-xs py-3">
                      {item.desciption}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2 text-left">${item.price.toFixed(2)}</td>
              <td className="px-4 py-2 text-center">
                <button
                  className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                  onClick={() => handleQuantityChange(index, item.quantity - 1)}
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                  onClick={() => handleQuantityChange(index, item.quantity + 1)}
                >
                  +
                </button>
              </td>
              <td className="px-4 py-2 text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartPage;
