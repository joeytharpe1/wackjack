import React, { useState } from 'react';
import { deck } from './cardDecks';
import { useHistory } from 'react-router-dom'

import './game.css';

import ComputerTwoToneIcon from '@material-ui/icons/ComputerTwoTone';
import PersonTwoToneIcon from '@material-ui/icons/PersonTwoTone';
import PlayArrowTwoToneIcon from '@material-ui/icons/PlayArrowTwoTone';
import swal from 'sweetalert';



import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    alert: {
        backgroundColor: 'Teal',
        fontWeight: 'bold'
    },
    root: {
        backgroundColor: '#35654d'
    },
    container2: {
        marginTop: 10,
    },
    dealer: {
        color: 'red'
    },
    media: {
        borderRadius: '10px',
        border: '0.5px solid grey',
        transition: "transform 0.15s ease-in-out",
        "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },

    },
    button: {
        color: 'red',
        transition: "transform 0.15s ease-in-out",
        "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
        cursor: 'not-allowed',
    },
    buttonPlay: {
        border: '1px solid black',
        color: 'white',
        backgroundColor: 'red',
        transition: "transform 0.15s ease-in-out",
        "&:hover": {
            transform: "scale3d(1.05, 1.05, 1)",
            color: 'red',
            backgroundColor: 'white'
        },
        cursor: 'pointer',
    },
}));


function Game() {
    const classes = useStyles();
    const [scoreD, setScoreD] = useState(0);
    const [scoreP, setScoreP] = useState(0);
    const history = useHistory();

    const handleClick = () => {
        if (playerTotal > dealerTotal) {
            setScoreP(prevScoreP => prevScoreP + 1);
        } else if (playerTotal < dealerTotal) {
            setScoreD(prevScoreD => prevScoreD + 1);
        } else if (playerTotal === dealerTotal) {
            setScoreP(scoreP + 0);
            setScoreD(scoreD + 0)
        }
        if (scoreD === 10) {
            swal({
                title: "Try again?",
                text: "YOU LOSE !",
                icon: "error",
                dangerMode: true,
            });
            setScoreD(0);
            setScoreP(0);
        }
        else if (scoreP === 10) {
            swal({
                title: "HOT-STREAK",
                text: "CONGRATS YOURE A WINNER !",
                icon: "success",
                dangerMode: false,
            });
            setScoreD(0);
            setScoreP(0);
        }
        history.push('/game');
    }

    const originalDeck = deck.cards.map(item => ({ a: item.value, b: item.image }))

    let playerCard = originalDeck[Math.floor(Math.random() * originalDeck.length)];
    let playerCard2 = originalDeck[Math.floor(Math.random() * originalDeck.length)];

    let dealerCard = originalDeck[Math.floor(Math.random() * originalDeck.length)];
    console.log(dealerCard.a);

    let dealerCard2 = originalDeck[Math.floor(Math.random() * originalDeck.length)];
    console.log(dealerCard2.a);

    let playerTotal = parseInt(playerCard.a) + parseInt(playerCard2.a)
    console.log(`player score: ${playerTotal}`);
    let dealerTotal = parseInt(dealerCard.a) + parseInt(dealerCard2.a)
    console.log(`dealer score: ${dealerTotal}`);

    return (
        <Container className={classes.root}>
            <Container maxWidth='md'>
                <Grid container spacing={1} align='center' justify='center' className={classes.container2}>
                    <Grid item xs={10} md={10} align="center" justify="center">
                        {
                            playerTotal > dealerTotal ? (
                                <Typography id='winner' variant="h4" color='secondary' gutterBottom>
                                    Player score is {playerTotal} PLAYER Wins ! 🏆
                                </Typography>
                            ) :
                                dealerTotal > playerTotal ? (
                                    <Typography id='winner' variant="h4" className={classes.dealer} gutterBottom>Dealer score is {dealerTotal} DEALER Wins ! 😢</Typography>
                                ) :
                                    <Typography variant="h4" color="textSecondary" gutterBottom>DRAW 🤞 Player score: {playerTotal}, Dealer score: {dealerTotal}</Typography>
                        }
                    </Grid>
                    <Grid item xs={2} md={2} align="center" justify="center">
                        <Button
                            onClick={handleClick}
                            variant="outlined"
                            color="inherit"
                            size="small"
                            className={classes.buttonPlay}
                            startIcon={<PlayArrowTwoToneIcon />}
                        >
                            Again
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={4} md={2} align="center" justify="center">
                        <Button
                            size="small"
                            className={classes.button}
                            color='secondary'
                            variant="contained"
                            startIcon={<ComputerTwoToneIcon />}
                        >
                            Dealer: {scoreD}
                        </Button>
                    </Grid>
                    <Grid item xs={4} md={5} align="center" justify="center">
                        <img src={dealerCard.b} height='210px' title={dealerCard.a} alt='' />
                    </Grid>
                    <Grid item xs={4} md={5} align="center" justify="center">
                        <img src={dealerCard2.b} height='210px' title={dealerCard2.a} alt='' />
                    </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.container2}>
                    <Grid item xs={4} md={2} align="center" justify="center">
                        <Button

                            size="small"
                            className={classes.button}
                            color='secondary'
                            variant="contained"
                            startIcon={<PersonTwoToneIcon />}
                        >
                            Player: {scoreP}
                        </Button>
                    </Grid>
                    <Grid item xs={4} md={5} align="center" justify="center">
                        <img src={playerCard.b} height='210px' title={playerCard.a} alt='' />
                    </Grid>
                    <Grid item xs={4} md={5} align="center" justify="center">
                        <img src={playerCard2.b} height='210px' title={playerCard2.a} alt='' />
                    </Grid>
                </Grid>
            </Container>
        </Container>
    );
}

export default Game
