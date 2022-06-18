let setCategoryPolls = (state, action) => {
    if (action.type === "SET_CATEGORY_POLLS") {
           return action.category
       } else {
           return null
       }
   };
   
   export default setCategoryPolls