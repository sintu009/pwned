
import React, { useState } from 'react';

const RCC = "RedCliff";

function EmailBreachChecker() {
    const [email, setEmail] = useState('');
    const [isBreached, setIsBreached] = useState(false);

    const checkEmailBreach = async () => {
        const response = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${email}`, {

            mode: 'no-cors',
            "user-agent": RCC,
            "hibp-api-key": '7f258aeb7ee544ee9616003fc68c809d',

        });
        console.log(response)
        if (response.status === 200) {
            console.log(response)
            setIsBreached(true);
        } else {
            setIsBreached(false);
        }
    };

    return (
        <div>
            <h2>Check if your email has been breached</h2>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={checkEmailBreach}>Check</button>
            {isBreached ? <p>Your email has been breached.</p> : <p>Your email has not been breached.</p>}
        </div>
    );
}

export default EmailBreachChecker;




// import React, { useState } from "react";

// const API_KEY = "7f258aeb7ee544ee9616003fc68c809d";
// const RCC = "RedCliff";

// function App() {
//     const [email, setEmail] = useState("");
//     const [breaches, setBreaches] = useState([]);

//     const handleInputChange = (event) => {
//         setEmail(event.target.value);
//     };

//     const handleButtonClick = async () => {
//         try {
//             const response = await fetch(
//                 `https://haveibeenpwned.com/api/v3/breachedaccount/${email}`,
//                 {
//                     headers: {
//                         "mode": 'no-cors',
//                         "user-agent": RCC,
//                         "hibp-api-key": API_KEY,
//                         'Access-Control-Allow-Origin': '*',
//                         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
//                     },
//                 }
//             );

//             if (response.ok) {
//                 const data = await response.json();
//                 setBreaches(data);
//             } else {
//                 console.error(response.statusText);
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <div>
//             <label htmlFor="email">Email:</label>
//             <input
//                 type="text"
//                 id="email"
//                 name="email"
//                 value={email}
//                 onChange={handleInputChange}
//             />
//             <button onClick={handleButtonClick}>Check Breaches</button>

//             {breaches.length > 0 ? (
//                 <ul>
//                     {breaches.map((breach) => (
//                         <li key={breach.Name}>
//                             <h3>{breach.Name}</h3>
//                             <p>{breach.Description}</p>
//                             <p>Compromised Data: {breach.DataClasses.join(", ")}</p>
//                             <p>Breach Date: {breach.BreachDate}</p>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No breaches found for {email}</p>
//             )}
//         </div>
//     );
// }

// export default App;



// // import React, { useState } from 'react';

// // function EmailBreachChecker() {
// //     const [email, setEmail] = useState('');
// //     const [isBreached, setIsBreached] = useState(false);

// //     const checkEmailBreach = async () => {
// //         const response = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${email}/hibp-api-key:[7f258aeb7ee544ee9616003fc68c809d]`, {

// //             mode: 'no-cors'

// //         });
// //         console.log(response)
// //         if (response.status === 200) {
// //             console.log(response)
// //             setIsBreached(true);
// //         } else {
// //             setIsBreached(false);
// //         }
// //     };

// //     return (
// //         <div>
// //             <h2>Check if your email has been breached</h2>
// //             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
// //             <button onClick={checkEmailBreach}>Check</button>
// //             {isBreached ? <p>Your email has been breached.</p> : <p>Your email has not been breached.</p>}
// //         </div>
// //     );
// // }

// // export default EmailBreachChecker;
