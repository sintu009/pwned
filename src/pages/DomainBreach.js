// with api key 
import React, { useState } from 'react';

function DomainBreach() {
    const [domain, setDomain] = useState('');
    const [isBreached, setIsBreached] = useState(false);

    const checkDomain = async () => {
        const response = await fetch(`https://haveibeenpwned.com/api/v3/breaches?domain=${domain}`, {
            headers: {
                'hibp-api-key': '7f258aeb7ee544ee9616003fc68c809d'
            }
        });
        setIsBreached(response.status === 200);
    }

    return (
        <div>
            <label>
                Enter a domain to check:
                <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} />
            </label>
            <button onClick={checkDomain}>Check</button>
            {isBreached && <p>This domain has been breached.</p>}
        </div>
    );
}

export default DomainBreach;

/// direct show all the data


// import React, { useEffect, useState } from 'react';

// function App() {
//     const [breaches, setBreaches] = useState([]);

//     useEffect(() => {
//         const fetchBreaches = async () => {
//             const response = await fetch('https://haveibeenpwned.com/api/v2/breaches');
//             const data = await response.json();
//             setBreaches(data);
//         };
//         fetchBreaches();
//     }, []);

//     return (
//         <div>
//             <h1>All Breached Sites</h1>
//             <ul>
//                 {breaches.map((breach) => (
//                     <li key={breach.Name}>
//                         {breach.Name} - {breach.Domain}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default App;







//without key




// import React, { useState } from 'react';

// function App() {
//     const [breaches, setBreaches] = useState([]);
//     const [domain, setDomain] = useState('');

//     const handleInputChange = (event) => {
//         setDomain(event.target.value);
//     };

//     const handleButtonClick = async () => {
//         const response = await fetch(`https://haveibeenpwned.com/api/v2/breaches?domain=${domain}`);
//         const data = await response.json();
//         setBreaches(data);
//     };

//     return (
//         <div>
//             <h1>All Breached Sites</h1>
//             <div>
//                 <input type="text" placeholder="Enter a domain" value={domain} onChange={handleInputChange} />
//                 <button onClick={handleButtonClick}>Search</button>
//             </div>
//             <ul>
//                 {breaches.map((breach) => (
//                     <li key={breach.Name}>
//                         {breach.Name} - {breach.Domain}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default App;
