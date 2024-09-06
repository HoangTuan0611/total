import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../../assets/assets'
import axios from 'axios';

const Add = () => {
  const[data,setData] = useState({
    name:"",
    description:'',
    price:''
  })

  const[user,setUser] = useState()

  const[valueInput,setValueInput] = useState({
    username:"",
    password:""
  })

  const handleChangeData = (e) => {
    const name = e.target.name
    const value = e.target.value

    // const { name, value } = e.target;
    // console.log('name',name);
    // console.log('value',value);
    // setData({...data, [name]: value})
    // setData({...data,[name]:value})
    // console.log(data);
    setValueInput({...valueInput,[name]:value});
  }
  console.log(valueInput);
  const url = `http://localhost:4000/api/food/add`

  const onSubmitAdd = async (e) => {
    e.preventDefault()
    console.log(data);
    const response = await axios.post(url, data)
    console.log(response);
    
  }

  const onLogin = async (e) => {
    e.preventDefault();
    const url = `https://jsonplaceholder.typicode.com/users`
    const response = await axios.get(url)
    console.log(response);
    if (response.data.success) {
      setUser(response.data)
    }
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitAdd}>
        {/* <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
                <img src="" alt="" />
            </label>
            <input type="file" id='image' hidden required />
        </div> */}
        <div className="add-product-name flex-col">
            <p>Product name</p>
            <input onChange={(e) => handleChangeData(e)} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
        <p>Product description</p>
        <textarea onChange={e => handleChangeData(e)} name="description" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category-price">
            {/* <div className="add-category flex-col">
                <p>Product category</p>
                <select name="category" >
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                </select>
            </div> */}
            <div className="add-price flex-col">
                <p>Product price</p>
                <input onChange={e => handleChangeData(e)} type="Number" name='price' placeholder='$20' />
            </div>
        </div>
        <button type='submit' className='add-btn'>Add Product</button>
      </form>
      <p>User Name</p>
      <input type="text" name='username' onChange={(e)=> handleChangeData(e)}/>
      <p>PassWord</p>
      <input type="text" name='password' onChange={(e)=> handleChangeData(e)}/>
      <button onClick={onLogin}>Đăng Nhập</button>
      <div>
        UserName: {user?.username}
      </div>
      <div>
        PassWord: {user?.name}
      </div>
    </div>
    
  )
}

export default Add
