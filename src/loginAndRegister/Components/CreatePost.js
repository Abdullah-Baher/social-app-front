import React from 'react'
import styled from 'styled-components'
import api from '../../api/api'

const CreatePost = ({ userId, setRenderBool }) => {

    const CreatePostContainer = styled.div`
        height: 50%;
        background-color: #faf2da;
        border: none;
        padding: 15px;
        margin-bottom: 10px;
        width: 50%;
        margin-right: auto;
        margin-left: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        border-radius: 12px;
    `
    const TextArea = styled.textarea.attrs({
        placeholder: 'Type Post text here'
    })`
        width: 80%;
        height: 150px;
        border: none;
        padding: 10px;
        font-size: xx-large;
        outline: none;
        border-radius: 25px;
        margin-bottom: 15px;
    `
    const AddFileAndPostContainer = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 50px;
        width: 80%;
        
    `
    const PostBtn = styled.button`
        background-color: #006400;
        color: white;
        width: 20%;
        height: 40px;
        border: none;
        outline: none;
        font-size: x-large;
        border-radius: 10px;
    `
    
    const postNewPost = async () => {
        const postText = document.getElementById('postText').value;
        const Image = document.getElementById('postFile').files[0];
        
        if(!postText || !Image){
            return;
        }
        
        const response = await api.postNewPost(postText, Image, userId);

        document.getElementById('postText').value = '';
        document.getElementById('postFile').value = '';

        setRenderBool(prev => !prev);
        
    }

    return(
        <CreatePostContainer>
            <h2>New Post:</h2>
            <TextArea id='postText'></TextArea>
            <AddFileAndPostContainer>
                <input type='file' id='postFile' />
                <PostBtn onClick={() => postNewPost()}>Post</PostBtn>
            </AddFileAndPostContainer>
        </CreatePostContainer>
    )
}

export default CreatePost;