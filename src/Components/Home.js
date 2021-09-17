import React, { useContext, useEffect, useState } from 'react'
import Post from './Post'
import api from '../api/api';
import UserContext from '../Contexts/User/UserContext'

const Home = () => {
    const [ posts, setPosts ] = useState({});
    const user = useContext(UserContext);

    const getPosts = async() => {
        //const response = await api.getHomePosts();
        const response = await api.getFollowedUsersPosts(user._id);
        setPosts(response);
    }

    useEffect(() => {
        getPosts();
        
    }, [])

    return (
        <div>

            {
                posts.length > 0 ?
                posts.map(val => <Post key={val.id} post={val}></Post>) :
                <h1 style={{color: 'white', textAlign: 'center'}}>Oops No Posts Yet, Go to your Profile to create your first post</h1>
            }
        </div>
    )
}

export default Home;