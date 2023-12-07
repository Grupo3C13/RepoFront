import { useEffect, useState } from "react";
import styles from "./Suggestion.module.css"

function Suggestion({ productsList, search , getFilterData, updateSearchBar, searching}) {

  const [show, setShow] = useState(true)
  
    const instrumentosFilter = productsList.filter((products) =>
    products.name.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
      getFilterData(instrumentosFilter);
      console.log(show)
    }, [search])

    useEffect(()=>{
      setShow(searching)
    },[searching])


    const handleClick =(products)=>{
      setShow(false)
      updateSearchBar(products)
    }
   
    const result = () => {
      if(show){
        if (search.length > 0) {
          return instrumentosFilter.map((products) => (
            <li className={styles.sugerenciainstrumentosLi} key={products.id} 
            onClick={()=>handleClick(products.name)}> 
            <img className={styles.imgsearchMini}  src={products.imgUrl} alt={products.title}/>
            {products.name}
            </li>
          ));
        } else {
          return null;
        }
      }
    };
    return (
      <>
      {result()}
      </>
    );
  }
  export default Suggestion;