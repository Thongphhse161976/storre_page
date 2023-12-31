import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../components/PaginationPosts/Pagination";
import DoneIcon from "../../assets/icons/done.svg";
import CancelIcon from "../../assets/icons/cancel.svg";
import RefundedIcon from "../../assets/icons/refunded.svg";
import OrderPosts from "../../components/PaginationPosts/OrderPosts";
import { UserAuth } from "../Login/AuthContext";

function Orders() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [storeList , setStoreList] = useState([]);
  const { logOut, user } = UserAuth();
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://vinhomesecommercewebapi.azurewebsites.net/api/v1/Order?include=User",{
          headers:{ 
          'Access-Control-Allow-Origin': '*',
          "Authorization" : `Bearer ${user.accessToken}`,
          }
        });
      const store = await axios.get(
        "https://vinhomesecommercewebapi.azurewebsites.net/api/v1/Store",{
          headers:{ 
          'Access-Control-Allow-Origin': '*',
          "Authorization" : `Bearer ${user.accessToken}`,
          }
        });
      console.log(res);
      setPosts(res.data.filter((value) => value.storeId  === '5a3bacb6-51d5-22bb-b182-1b8b8623dfb6'));
      setStoreList(store.data)
      setLoading(false);
    };
    fetchPosts();
  }, [user]);
  console.log("Post",posts);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">Orders List</h1>
      <OrderPosts orders={currentPosts} loading={loading} storeList={storeList} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
}

export default Orders;
