import DashboardHeader from "../../components/DashboardHeader";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import {  storage } from "../Login/Firebase";
import { UserAuth } from "../Login/AuthContext";


function Data() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setimageUrl] = useState("");
  const [select, setSelected] = useState("");
  const [optionList, setOptionList] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const imageListRef = ref(storage);
  
  
  const { logOut, user } = UserAuth();
  function addproduct() {
    console.warn(name, description, price, file);
    const formData = {
      name : name,
      description : description,
      price : parseFloat(price),
      imageUrl : imageUrls[0],
      categoryId : select,
      storeId: '5a3bacb6-51d5-22bb-b182-1b8b8623dfb6'
    }
    console.log(formData);
    axios.post('https://vinhomesecommercewebapi.azurewebsites.net/api/v1/Product',formData,{
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Authorization" : `Bearer ${user.accessToken}`,
      }
    }).then((response) => {
      response.headers = {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, OPTION",
      }
  })
    if(file == null) return;
    const imageRef = ref(storage, file.name);
    uploadBytes(imageRef,file).then(() => {
      alert("Products Added");
      
    })
  }
  const fetchData = () => {
    axios
      .get("https://vinhomesecommercewebapi.azurewebsites.net/api/v1/Category?include=Products", {
        headers:{ 
        'Access-Control-Allow-Origin': '*',
        "Authorization" : `Bearer ${user.accessToken}`,
        }
      })
      .then((response) => {
        
        const { data } = response;
        if (response.status === 200) {
          //check the api call is success by stats code 200,201 ...etc
          setOptionList(data);
        } else {
          //error handle section
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchData();
  }, [user]);
  useEffect(() => {
    listAll(imageListRef).then((response) =>{
      console.log(response);
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) =>{
          setImageUrls((prev) => [...prev, url]);
        })
      })
    })
  }, []);
  // console.log(optionList);
  return (
    <div className="dashboard-content">
      <DashboardHeader />
      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Add New Products</h2>
        </div>
        <div className="col-sm-6 offset-sm-3">
          <input
            type="text"
            placeholder="name"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="description"
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="price"
            className="form-control"
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <input
            type="file"
            placeholder="imageUrl"
            className="form-control"
            onChange={(e) => setimageUrl(e.target.files[0])}
          />
          <br />
          <br />
          {/* <input
            type="text"
            placeholder="imageUrl"
            className="form-control"
            onChange={(e) => setimageUrl(e.target.value)}
          /> */}
          <br />
          <select
            className="form-control"
            disabled={false}
            value={select}
            onChange={(e) => setSelected(e.currentTarget.value)}
          >
            {optionList.map((item) => (
              <option key={item._id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <br />
          <button onClick={addproduct} className="btn btn-primary">
            Create Product
          </button>
        </div>
      </div>
    </div>
  );
}
export default Data;
