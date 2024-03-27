import './newCollections.css';
import {Item} from "../Item/Item";
import {useEffect, useState} from "react";


export const NewCollections = () => {
    const [new_Collections, setNew_Collections] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/newCollectioned').then((response) => response.json()).then((data) => setNew_Collections(data))
    }, [])
    return (
        <div className={'new-collections'}>
            <h1> NEW COLLECTIONS</h1>
            <hr/>
            <div className="collections">
                {new_Collections.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price}
                                 old_price={item.old_price}/>
                })}
            </div>
        </div>
    )
}