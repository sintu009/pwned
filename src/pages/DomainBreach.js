import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    CircularProgress,
    Container,
    Grid,
    InputAdornment,
    TextField,
    Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(4),
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
    },
    loadingContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
    },
    errorContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
    },
    errorText: {
        color: theme.palette.error.main,
    },
}));

function DomainBreach() {
    const classes = useStyles();

    const [domain, setDomain] = useState('');
    const [breachData, setBreachData] = useState(null);
    const [isBreached, setIsBreached] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleDomainChange = (event) => {
        setDomain(event.target.value);
    };

    const handleCheckDomain = async () => {
        setIsLoading(true);
        setErrorMessage('');
        setIsBreached(false);
        setBreachData(null);

        try {
            const response = await fetch(`https://haveibeenpwned.com/api/v3/breaches?domain=${domain}`, { mode: 'cors' }, {
                headers: {
                    'Content-Type': 'application/json',
                    'hibp-api-key': '7f258aeb7ee544ee9616003fc68c809d',
                    'Access-Control-Allow-Origin': '*',
                },
            }
            );

            if (response.ok) {
                const data = await response.json();
                setBreachData(data);
                setIsBreached(true);
            } else if (response.status === 404) {
                setIsBreached(false);
                setBreachData([]);
            } else {
                setErrorMessage(`Failed to check domain: ${response.statusText}`);
            }
        } catch (error) {
            setErrorMessage(`Failed to check domain: ${error.message}`);
        }

        setIsLoading(false);
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className={classes.loadingContainer}>
                    <CircularProgress />
                </div>
            );
        }

        if (errorMessage) {
            return (
                <div className={classes.errorContainer}>
                    <Typography variant="h6" className={classes.errorText}>
                        {errorMessage}
                    </Typography>
                </div>
            );
        }

        if (isBreached && breachData && breachData.length > 0) {
            return (
                <div>
                    <Typography variant="h5" gutterBottom>
                        Breached data for {domain}:
                    </Typography>
                    <Grid container spacing={2}>
                        {breachData.map((breach) => (
                            <Grid item xs={12} key={breach.Name}>
                                <Typography variant="h6">{breach.Name}</Typography>
                                <Typography>Breach date: {breach.BreachDate}</Typography>
                                <Typography>Added date: {breach.AddedDate}</Typography>
                                <Typography>Modified date: {breach.ModifiedDate}</Typography>
                                <Typography
                                    variant="body1"
                                    dangerouslySetInnerHTML={{ __html: breach.Description }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            );
        }
        if (isBreached && breachData && breachData.length === 0) {
            return (
                <div>
                    <Typography variant="h5" gutterBottom>
                        No breached data found for {domain}
                    </Typography>
                </div>
            );
        }

        return null;

    };

    return (
        <Container maxWidth="md" className={classes.container}>
            <Typography variant="h4" gutterBottom>
                Check if your domain has been breached
            </Typography>
            <div className={classes.inputContainer}>
                <TextField
                    variant="outlined"
                    label="Domain"
                    value={domain}
                    onChange={handleDomainChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">https://</InputAdornment>
                        ),
                    }}
                />
                <Button variant="contained" color="primary" onClick={handleCheckDomain}>
                    Check
                </Button>
            </div>
            <div className={classes.buttonContainer}>
                {renderContent()}
            </div>
        </Container>
    );
}

export default DomainBreach;