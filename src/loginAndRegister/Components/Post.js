import React, { useContext, useRef } from 'react'
import styled from 'styled-components'
import { AiFillHeart, AiFillLike } from 'react-icons/ai'
import api from '../../api/api'
import UserContext from '../../Contexts/User/UserContext'
import { useHistory } from 'react-router'


const PostContainer = styled.div`
    height: 550px;
    background-color: #faf2da;
    border: none;
    padding: 15px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
    margin-right: auto;
    margin-left: auto;
    border-radius: 12px;
`
const Image = styled.img`
    width: 80%;
    max-height: 70%;
    align-self: center;
    
`
const Btn = styled.button`
    background-color: white;
    font-size: larger;
    border: none;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    height: 35px;
    width: 49.5%;
    align-self: center;
    color: black;
    border-radius: 10px;
    color: grey;
`
const LikeIcon = styled(AiFillLike)`
    height: 30px;
    width: 30px;
    cursor: pointer;
    margin-right: 15px;
    color: inherit;
`
const FollowIcon = styled(AiFillHeart)`
    height: 30px;
    width: 30px;
    cursor: pointer;
    margin-right: 15px;
    color: inherit;
`
const LikeAndFollowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
    align-self: center;
`

const Post = ({ post }) => {
    console.log(post);
    const user = useContext(UserContext);
    const userContext = useContext(UserContext);
    const likeButton = useRef(null);
    const followButton = useRef(null);
    let history = useHistory()

    const liked = post.likedBy.includes(user._id);
    const followed = user.following.includes(post.createdBy._id);
    
    const changeLikeColor = async() => {

      if(likeButton.current.style.color === 'rgb(59, 89, 152)'){

        const response = await api.updateLikes(post._id, localStorage.getItem('accessToken'), 'dislike');
            if(!response.message){
                likeButton.current.style.color = 'grey';  
            } else {
                history.push('/loginOrRegister')            
            }
        }
      else{
          const response = await api.updateLikes(post._id, localStorage.getItem('accessToken'), 'like');
          if(!response.message){
            likeButton.current.style.color = 'rgb(59, 89, 152)';
          } else {
              history.push('/loginOrRegister');
          }  
       }
    }
     
    const changeFollowColor = async() => {
        if(followButton.current.style.color !== 'red'){
            const response = await api.updateFollow(post.createdBy._id, localStorage.getItem('accessToken'), 'follow');
        
            if(!response.message){
                followButton.current.style.color = 'red';
                user.following.push(post.createdBy._id);
                userContext.saveUser(user);
            } else if(userContext._id.toString() !== post.createdBy._id.toString()) {
                history.push('/loginOrRegister')
            }
            
        }
        else {
            
            const response = await api.updateFollow(post.createdBy._id, localStorage.getItem('accessToken'), 'unfollow');
            
            if(!response.message){
                followButton.current.style.color = 'grey';
                user.following = user.following.filter(val => val.toString() !== post.createdBy._id.toString());
                userContext.saveUser(user);
            } else if(userContext._id.toString() !== post.createdBy._id.toString()) {
                history.push('/loginOrRegister')
            }
        }
    }

    return (
        <PostContainer>
            <h2 style={{marginBottom: 0, padding: 0,marginLeft: '10%'}}>{post.createdBy.name}</h2>
            <p style={{marginLeft: '10%'}} >{post.text}</p>
            <Image src={post.image.url} />
            <LikeAndFollowContainer>
                <Btn ref={likeButton} style={{color: liked ? 'rgb(59, 89, 152)' : 'grey'}} onClick={() => changeLikeColor()}>
                    <LikeIcon></LikeIcon>
                    Like
                </Btn>
                <Btn ref={followButton} style={{color: followed ? 'red' : 'grey'}} onClick={() => changeFollowColor()}>
                    <FollowIcon></FollowIcon>
                    {`Follow ${post.createdBy.name}`} 
                </Btn>
            </LikeAndFollowContainer> 
        </PostContainer>
    )
}


export default Post;