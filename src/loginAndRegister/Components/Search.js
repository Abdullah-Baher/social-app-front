import React, { useContext, useEffect, useState } from 'react'
import SearchUser from './SearchUser'
import UserContext from '../../Contexts/User/UserContext'
import Post from './Post'


const Search = () => {
   
    const [ posts, setPosts ] = useState({});
    const [ refresh, setRefresh ] = useState(false);
    const userContext = useContext(UserContext);

    useEffect(() => {
        setRefresh(prev => !prev);
    },[userContext.saveUser])
    return(
        <div>
            <SearchUser setPosts={setPosts} />
            {
                posts.length > 0 ?
                posts.map(val => <Post key={val.id} setRefresh={setRefresh} post={val}></Post>) :
                <h1 style={{color: 'white', textAlign: 'center'}}>Type a username</h1>
            }
        </div>
    )
}


export default Search;