let blogID = (state, action) => {
 if (action.type === "SET_BLOG_ID") {
        return action.id
    } else {
        return null
    }
};

export default blogID