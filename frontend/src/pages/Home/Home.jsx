import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Navbar/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import FoodItem from '../../components/FoodItem/FoodItem'
const Home = () => {

    const[category,setCategory] = useState("A11");
    // const[on,setOn] = useState(false)
    // const[sum,setSum] = useState(0)
    // const[inputValue,setInputValue] = useState(0)
    // const handleChange = (e) => {
    //   setInputValue(e.target.value);
    // }
    // console.log('inputValue',inputValue);
    // const addNumber = () => {
    //   const number = parseFloat(inputValue);
    //   setSum(sum+number);
    // }
    // console.log('Sum: ',sum);

    // const Sum = (a,b) => {
    //   return a +b;
    // }
    const [work,setWork] = useState("")
    const [todo,setTodo] = useState([])
    const handleChange = (value)=> {
      setWork(value.target.value);
    }
    const addJob = ()=> {
      setTodo(todo=> [work]);
    }
    todo.map((work) => {
      console.log(work);
    })
  return (

    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
      {/* <button onClick={()=>setCount(count+1)}>tăng</button> */}
      {/* <button onClick={()=>setOn(!on)}>{on?'bật':'tắt'}</button> */}
      {/* <input type="text" onChange={(e)=>handleChange(e)}/>
      <button onClick={()=>addNumber()}>thêm số</button> */}
      <input type="text"  onChange={(value)=>handleChange(value)}/>
      <button onClick={()=>addJob()}>them</button>

    </div>
  )
}

export default Home
