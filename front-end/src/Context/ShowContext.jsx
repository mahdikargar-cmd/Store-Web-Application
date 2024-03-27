import { createContext, useEffect, useState } from "react";

export const ShowContext = createContext(null);

const getdefaultcard = () => {
    let card = {};
    for (let index = 0; index < 300 + 1; index++) {
        card[index] = 0;
    }
    return card;
};

export const ShopContextProvider = (props) => {
    const [allProducts, setAllProducts] = useState([]);
    const [cartItems, setCartItems] = useState(getdefaultcard());

    useEffect(() => {
        fetch("http://localhost:5000/allproducts")
            .then((response) => response.json())
            .then((data) => setAllProducts(data));
            const token = localStorage.getItem("auth-token");
            if (token && localStorage.getItem("user-id")) {
            fetch("http://localhost:5000/getcart", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "auth-token": token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: localStorage.getItem("user-id") }),
            })
                .then((response) => response.json())
                .then((data) => setCartItems(data));
        }
    }, []);

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        const token = localStorage.getItem("auth-token");

        if (token) {
            fetch("http://localhost:5000/addtocart", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "auth-token": token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ itemId: itemId }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data));
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        const token = localStorage.getItem("auth-token");
        if (token) {
            fetch("http://localhost:5000/removefromcart", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "auth-token": token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ itemId: itemId }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data));
        }
    };

    const getTotalCarAmount = () => {
        return Object.keys(cartItems).reduce((totalAmount, itemId) => {
            if (cartItems[itemId] > 0) {
                const itemInfo = allProducts.find((product) => product.id === Number(itemId));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[itemId];
                }
            }
            return totalAmount;
        }, 0);
    };
    const getTotalCarItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const contextValue = {
        getTotalCarItems,
        getTotalCarAmount,
        allProducts,
        cartItems,
        addToCart,
        removeFromCart,
    };

    return (
        <ShowContext.Provider value={contextValue}>
            {props.children}
        </ShowContext.Provider>
    );
};

export default ShopContextProvider;
