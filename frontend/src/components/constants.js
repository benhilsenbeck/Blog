const prod =  {
    API_URL: 'https://www.oneroomgaming.com/api/'
}

const staging = {
    API_URL: 'https://staging.oneroomgaming.com/api/'
}

const dev = {
    API_URL: 'http://localhost:8000/'
}

exports.config = () => {
    if(process.env.REACT_APP_ENV === 'development') return dev
    else if (process.env.REACT_APP_ENV === 'staging') return staging
    else if (process.env.REACT_APP_ENV === 'production') return prod
    return null 
}