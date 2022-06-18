import React from 'react'
import axios from 'axios'
const config = require('./constants').config()


const TestPage = () => {
    
    const getCategory = async() => {
        await axios.get(config.API_URL + "blog/poll/category", {
            params: {
                Category: "Streamers"
            }
        }) 
        .then (res => {
            console.log(res.data)
        });
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={()=> getCategory()}>Get Category</button>
        </div>
    )
}

export default TestPage