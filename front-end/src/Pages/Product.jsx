import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { BreadCrums } from "../Component/BreadCrums/BreadCrums";
import { ProductDisplay } from "../Component/productDisplay/ProductDisplay";
import { RelatedProducts } from "../Component/RealatedProducts/RelatedProducts";
import { ShowContext } from "../Context/ShowContext";

export const Product = () => {
    const { allProducts } = useContext(ShowContext); // Use "allProducts"
    const { productId } = useParams();

    const product = allProducts?.find((e) => e.id === Number(productId)); // Optional chaining

    return (
        <div className="">
            {product ? (
                <>
                    <BreadCrums product={product} />
                    <ProductDisplay product={product} />
                    <RelatedProducts />
                </>
            ) : (
                <p>Product not found.</p> // Display a message if product is not found
            )}
        </div>
    );
};
