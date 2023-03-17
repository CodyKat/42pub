import React, { useEffect, useState } from 'react';

const Mainpage = () => {
    const [message, setMessage] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://127.0.0.1:5000/api/hello');
            const json = await response.json();
            setMessage(json.message);
        }
        fetchData();
    }, []);

    return (
        <div>
            <h2>Mainpage</h2>
            <p>{message ? message : 'Loading...'}</p>
        </div>
    );
};

export default Mainpage;
