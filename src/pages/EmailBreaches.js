import { useState } from 'react';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import {
    Container,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Grid,
    InputLabel,
    FormControl,
    FormHelperText,
    IconButton,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

function getFileName(event) {
    const fileName = event.target.value.split('\\').pop();
    document.getElementById('fileName').innerHTML = fileName;
}

function EmailBreaches() {
    const [emails, setEmails] = useState('');
    const [breaches, setBreaches] = useState([]);

    const handleEmailsChange = (event) => {
        setEmails(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const emailsArray = emails.split(',').map((email) => email.trim());
        const breachesArray = [];
        try {
            for (const email of emailsArray) {
                const response = await fetch(
                    `https://haveibeenpwned.com/api/v3/breachedaccount/?email=${email}`,
                    { mode: 'cors' },
                    {
                        headers: {
                            'hibp-api-key': '7f258aeb7ee544ee9616003fc68c809d',
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                    breachesArray.push(
                        ...data.map((breach) => ({
                            Email: email,
                            Title: breach.Title,
                            Name: breach.Name,
                            BreachDate: breach.BreachDate,
                        }))
                    );
                } else if (response.status === 404) {
                    breachesArray.push({
                        Email: email,
                        Title: 'No breaches found',
                        Name: '',
                        BreachDate: '',
                    });
                } else {
                    throw new Error(`Server error: ${response.status}`);
                }
            }
        } catch (error) {
            console.error(error);
        }
        setBreaches(breachesArray);
    };

    const handleExport = () => {
        const csv = Papa.unparse(breaches);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, 'breaches.csv');
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const csv = e.target.result;
            const results = Papa.parse(csv, { header: true });
            const emailsArray = results.data.map((row) => row.Email.trim());
            setEmails(emailsArray.join(', '));
        };
        reader.readAsText(file);
    };

    return (
        <Container maxWidth="md">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth>
                            {/* <InputLabel htmlFor="email-input">
                                Enter your email addresses separated by a comma:
                            </InputLabel> */}
                            <TextField
                                id="email-input"
                                value={emails}
                                onChange={handleEmailsChange}
                                variant="outlined"
                                required
                            />
                            <FormHelperText>
                                Separate multiple email addresses with commas
                            </FormHelperText>
                            <br />
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary">
                            Check Breaches</Button>
                    </form>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" component="h2">
                        Breaches
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Breach Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {breaches.map((breach, index) => (
                                <TableRow key={index}>
                                    <TableCell>{breach.Email}</TableCell>
                                    <TableCell>{breach.Title}</TableCell>
                                    <TableCell>{breach.Name}</TableCell>
                                    <TableCell>{breach.BreachDate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleExport}
                        disabled={!breaches.length}
                        startIcon={<CloudUploadIcon />}
                    >
                        Export
                    </Button>
                    <input
                        accept=".csv"
                        id="file-upload"
                        type="file"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="file-upload">
                        <IconButton color="primary" component="span">
                            <CloudUploadIcon />
                        </IconButton>
                        <span id="fileName">Upload a CSV file</span>
                    </label>
                </Grid>
            </Grid>
        </Container>
    );
}

export default EmailBreaches;