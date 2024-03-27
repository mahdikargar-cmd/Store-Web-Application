import {Hero} from "../Component/Hero/Hero";
import {Popular} from "../Component/Popular/Popular";
import {Offers} from "../Component/Offers/Offers";
import {NewCollections} from "../Component/newCollections/NewCollections";
import {Newsletter} from "../Component/newsLeter/Newsletter";

export const Shop = () => {
    return (
        <>
            <Hero/>
            <Popular/>
            <Offers/>
            <NewCollections/>
            <Newsletter/>

        </>
    )
}