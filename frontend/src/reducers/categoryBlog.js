let setCategoryBlog = (state, action) => {
    if (action.type === "SET_CATEGORY_BLOG") {
           return action.category
       } else {
           return null
       }
   };
   
   export default setCategoryBlog