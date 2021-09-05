import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:3001' });

const LoginUser = async(data) => {
    try {
        const result = await instance.post('/users/login',{
            email: data.email,
            password: data.password
        });

        return result.data;
    } catch (e) {

        return { message: e.message }
    }
}

const RegisterUser = async (data) => {
    try {
        const response = await instance.post('/users',{
            name: data.name,
            email: data.email,
            password: data.password
        });

        return response.data;
    } catch (e) {
        console.log(e.response);
        return { message: e.message }
    }
}

const getProfilePosts = async(userId) => {
    try {
        const response = await instance.get('/posts', {
            params: {
                userId: userId
            }
        });
        return response.data;
    } catch (e) {
        return { message: e.message }
    }
}


const getHomePosts = async() => {
    try {
        const response = await instance.get('/posts');
        return response.data;
    } catch (e) {
        return { message: e.message }
    }
}

const postNewPost = async(postText, Image, userId) => {
    
   try {
        let data = new FormData();
        data.append('image',Image, Image.name);
        data.append('text', postText);
        data.append('createdBy', userId);
        const response = await instance.post('/posts',data);
        return response.data;
   } catch (e) {
       return { message: e.message }
   }
}

const updateLikes = async(postId, token, action) => {
    try {
        const response = await instance.patch('/posts/likes/' + postId, {
            action: action
        },{
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    
        return response.data;
    } catch (e) {
        return { message: e.message }
    }
}

const updateFollow = async(userToFollowId, token, action) => {
    try {
        const response = await instance.patch('/users/follow/' + userToFollowId, {
            action: action
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    
        return response.data;
    } catch (e) {
        return { message: e.message }
    }
}

const searchForUser = async(partOfName, token) => {
    try {
        const response = await instance.get('/users/search',{
            params: {
                name: partOfName
            },
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        return response.data;
    } catch (e) {
        return { message: e.message }
    }

}

const getFollowedUsersPosts = async(userId) => {
    try {
        const response = await instance.get('/posts/follow/' + userId);
        return response.data;
    } catch (e) {
        return { message: e.message }
    }
}

export default { LoginUser, RegisterUser, getProfilePosts, getHomePosts, postNewPost, updateLikes, updateFollow, searchForUser, getFollowedUsersPosts };