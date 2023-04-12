import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';
import CryptoJS from 'crypto-js';

function PasswordChecker() {
  const [hashKey, setHashKey] = useState('');
  const [plainText, setPlainText] = useState('');
  const [breachCount, setBreachCount] = useState(null);

  const handleChange = (event) => {
    setHashKey(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const bytes = CryptoJS.SHA1(hashKey);
    const hash = bytes.toString(CryptoJS.enc.Hex);
    const url = `https://api.pwnedpasswords.com/range/${hash.substring(0, 5)}`;
    const response = await axios.get(url);
    const hashes = response.data.split('\r\n');
    const matchingHash = hashes.find((h) => h.startsWith(hash.substring(5).toUpperCase()));
    if (matchingHash) {
      setBreachCount(parseInt(matchingHash.split(':')[1]));
      setPlainText('');
    } else {
      const wordArray = CryptoJS.enc.Hex.parse(hash);
      const decryptedText = CryptoJS.enc.Base64.stringify(wordArray);
      setPlainText(decryptedText);
      setBreachCount(0);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="hash-key"
        label="Enter SHA-1 Hash Key"
        variant="outlined"
        value={hashKey}
        onChange={handleChange}
      />
      <br />
      <br />
      <Button variant="contained" color="primary" type="submit">
        Check Password
      </Button>
      <br />
      <br />
      {breachCount !== null ? (
        <div>
          {breachCount > 0 ? (
            <p>Password breached {breachCount} times.</p>
          ) : (
            <p>Password not breached.</p>
          )}
          {plainText && <p>Password: {plainText}</p>}
        </div>
      ) : null}
    </form>
  );
}

export default PasswordChecker;
