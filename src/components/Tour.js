import React, { useEffect, useState } from "react";
import Loader from './Loader'
import "./style.css";

const Tour = () => {
  let URL = "https://www.course-api.com/react-tours-project";

  const [tourData, setTourData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [readMore, setReadMore] = useState(false)

  const getTour = async () => {
    try {
      const res = await fetch(URL);
      const data = await res.json();
      console.log("data", data);
      setTourData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  useEffect(() => {
    getTour();
  }, []);

//handle delete
const handleDelete=(id)=>{
let updatedList = tourData.filter((item)=>{
return item.id !== id
})
setTourData(updatedList)
}

//handleRead
const handleRead=()=>{
    setReadMore(!readMore)
}


  return (
    <div className="tour">
      <div className="tour-1">
        <h3>Tour App</h3>
      </div>
      <div className="tour-2">
      {loading? <>
        <Loader/>        
      </>:
      <>
      {tourData && tourData.map((item)=>{
        const {info} = item;
        return(
            <div className="tour-card">
            <p className="tour-txt1"> {item.id}</p>
           
            <img src={item.image} alt="" className="tour-img"/>
            <p className="tour-txt1"> {item.price}</p>
            <p className="tour-txt1">{item.name}</p>
            <p className="tour-txt2"> {readMore? info:`${info.substring(0,200)}...`}</p>
            <button onClick={handleRead} className="tour-btn1">{readMore? 'Less':'More'}</button>
            <button className="tour-btn" onClick={()=>handleDelete(item.id)}>Not Interested</button>
        </div>
        )
      })}
     
      </>}
       
      </div>
    </div>
  );
};

export default Tour;
