import React, { useContext, useEffect, useState } from 'react'
import CreatePost from './CreatePost'
import Post from './Post'
import api from '../../api/api';
import UserContext from '../../Contexts/User/UserContext';

const Profile = () => {
    const user = useContext(UserContext);
    const [ renderBool, setRenderBool ] = useState(false);
    const [ posts, setPosts ] = useState({})
    console.log(user.following);
    const getPosts = async () => {
        const response = await api.getProfilePosts(user._id);
        setPosts(response);
    }

    useEffect(() => {
        getPosts();
    },[renderBool])
    
    return (
        <div>
            <CreatePost setRenderBool={setRenderBool} userId={user._id} />
            {
                posts.length > 0 ?
                posts.map(val => <Post key={val.id}  post={val}></Post>) :
                <h1 style={{color: 'white', textAlign: 'center'}}>Oops No Posts Yet</h1>
            }
        </div>
    )
}

export default Profile;