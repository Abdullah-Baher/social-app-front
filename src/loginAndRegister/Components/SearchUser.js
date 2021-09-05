import React, { useState, useRef, useContext } from 'react'
import styled from 'styled-components'
import api from '../../api/api'
import { AiOutlineSearch } from 'react-icons/ai'
import { useHistory } from 'react-router'
import UserContext from '../../Contexts/User/UserContext'


const SearchBar = styled.input.attrs({
    type: 'text',
})`
    width: 70%;
    height: 35px;
    border: none;
    outline: none;
    padding: 5px;
    display: inline-block;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    font-size: x-large;
    text-align: center;
    margin-left: 8%;
    vertical-align: middle;    
`
const SearchUserContainer = styled.div`
    background-color: #faf2da;
    border: none;
    padding: 15px;
    margin-bottom: 10px;
    width: 50%;
    margin-right: auto;
    margin-left: auto;
    min-height: 200px;
    border-radius: 12px;
`

const SuggestionsContainer = styled.div`
    width: 70%;
    padding: 5px;
    display: block;
    border-top: 1px solid black;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    outline: none;
    font-size: x-large;
    margin-left: 8%;
    background-color: white;
`
const SearchIcon = styled(AiOutlineSearch)`
    height: 30px;
    width: 30px;
`

const SearchBtn = styled.button`
    height: 45px;
    width: 80px;
    border: none;
    border-radius: 10px;
    outline: none;
    padding: 5px;
    background-color: #006400;
    font-size: x-large;
    font-weight: bold;
    color: white;
    display: inline-block;
    margin-left: 3%;
    vertical-align: middle;
`

const SearchUser = ({ setPosts }) => {
    const [ searchText, setSearchText ] = useState('');
    const [ suggestions, setSuggestions ] = useState([]);
    const selectedUser = useRef();
    let history = useHistory();
    const userContext = useContext(UserContext);

    

    const onTextChanged = async(e) => {
        const value = e.target.value;
        setSearchText(value);
        if(value.length > 0){
            try {
                const response = await api.searchForUser(value, localStorage.getItem('accessToken'));
                if(!response.message){
                    setSuggestions(response);  
                }
                else {
                    //move to login form
                    history.push('/loginOrRegister');
                }
            } catch (e) {
                console.log(e);
            }
            
        } else {
            setSuggestions([]);
        }
    }

    const suggestionSelected = (value) => {
        setSuggestions([]);
        setSearchText(value.name);
        selectedUser.current = value;
    }
    
    const getUserPosts = async() => {
        if(suggestions.length > 0){
            console.log(suggestions[0]);
            const response = await api.getProfilePosts(suggestions[0]._id);
            setPosts(response);
        } else {
            console.log(selectedUser.current);
            const response = await api.getProfilePosts(selectedUser.current._id);
            setPosts(response);
        }
    }

    return (
        <SearchUserContainer>
            <h2 style={{marginLeft: '8%'}}>Search for user:</h2>
            <SearchBar value={searchText} onChange={onTextChanged} />
            <SearchBtn onClick={getUserPosts}>
                <SearchIcon />
            </SearchBtn>
            {
                suggestions.length > 0 ?
                <SuggestionsContainer>
                    <ul>
                    {
                        suggestions.map(val => <li onClick={() => suggestionSelected(val)} >{val.name}</li>)
                    }
                    </ul>
                </SuggestionsContainer> :
                null
            }
        </SearchUserContainer>
    )
}

export default SearchUser;