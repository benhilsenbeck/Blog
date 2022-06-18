export const increment = () => {
    return {
        type: 'INCREMENT'
    }
}

export const login = () => {
    return {
        type: 'SIGN_IN'
    }
}

export const logout = () => {
    return {
        type: 'SIGN_OUT'
    }
}

export const search = () => {
    return {
        type: 'SEARCH'
    }
}

export const stopSearch = () => {
    return {
        type: 'STOP_SEARCH'
    }
}

export const setBlogID = (id) => {
    return {
        type: 'SET_BLOG_ID',
        id: id
    }
}

export const setCategoryBlog = (category) => {
    return {
        type: 'SET_CATEGORY_BLOG',
        category: category
    }
}

export const setCategoryPolls = (category) => {
    return {
        type: 'SET_CATEGORY_POLLS',
        category: category
    }
}

