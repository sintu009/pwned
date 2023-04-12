import React, { useState } from "react";
import { SHA1 } from "crypto-js";
import { TextField, Button, Grid } from "@material-ui/core";

function SHA1Converter() {
    const [text, setText] = useState("");
    const [hash, setHash] = useState("");

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleClick = () => {
        const hashedText = SHA1(text);
        setHash(hashedText.toString());
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h1>SHA-1 Hash Converter</h1>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Enter text to hash"
                    value={text}
                    onChange={handleChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleClick}>
                    Hash Text
                </Button>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Hashed text"
                    value={hash}
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                />
            </Grid>
        </Grid>
    );
}

export default SHA1Converter;
