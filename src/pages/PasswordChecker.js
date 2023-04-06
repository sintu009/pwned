import React, { useState } from "react";
import "./PasswordChecker.css";

function PasswordChecker() {
    const [password, setPassword] = useState("");
    const [breached, setBreached] = useState(false);
    const [breachCount, setBreachCount] = useState(0);

    const checkPassword = async () => {
        const hash = await sha1(password); // get the SHA-1 hash of the password
        const prefix = hash.slice(0, 5);
        const suffix = hash.slice(5);

        const response = await fetch(
            `https://api.pwnedpasswords.com/range/${prefix}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text();
        const breaches = data
            .split("\n")
            .map((line) => line.split(":"))
            .filter(([hashSuffix]) => hashSuffix === suffix);

        if (breaches.length > 0) {
            setBreached(true);
            setBreachCount(parseInt(breaches[0][1]));
        } else {
            setBreached(false);
            setBreachCount(0);
        }
    };

    return (
        <div className="container">
            <h1>Password Checker</h1>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button onClick={checkPassword}>Check Password</button>
            {breached && <p className="breached">Your password has been breached {breachCount} times. Please choose a different password.</p>}
            {!breached && <p className="not-breached">Your password has not been breached.</p>}
        </div>
    );
}

async function sha1(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex.toUpperCase();
}

export default PasswordChecker;

// import React, { useState } from "react";

// function PasswordChecker() {
//     const [password, setPassword] = useState("");
//     const [breached, setBreached] = useState(false);
//     const [breachCount, setBreachCount] = useState(0);

//     const checkPassword = async () => {
//         const hash = await sha1(password); // get the SHA-1 hash of the password
//         const prefix = hash.slice(0, 5);
//         const suffix = hash.slice(5);

//         const response = await fetch(
//             `https://api.pwnedpasswords.com/range/${prefix}`
//         );

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.text();
//         const breaches = data
//             .split("\n")
//             .map((line) => line.split(":"))
//             .filter(([hashSuffix]) => hashSuffix === suffix);

//         if (breaches.length > 0) {
//             setBreached(true);
//             setBreachCount(parseInt(breaches[0][1]));
//         } else {
//             setBreached(false);
//             setBreachCount(0);
//         }
//     };

//     return (
//         <div>
//             <label>
//                 Password:
//                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//             </label>
//             <button onClick={checkPassword}>Check Password</button>
//             {breached && <p>Your password has been breached {breachCount} times. Please choose a different password.</p>}
//             {!breached && <p>Your password has not been breached.</p>}
//         </div>
//     );
// }

// async function sha1(message) {
//     const msgBuffer = new TextEncoder().encode(message);
//     const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
//     const hashArray = Array.from(new Uint8Array(hashBuffer));
//     const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
//     return hashHex.toUpperCase();
// }

// export default PasswordChecker;
