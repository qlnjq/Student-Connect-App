import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import SurveyCheckbox from "../../components/Checkboxes/Checkbox";
import {NewsBlogsClubs, Academic, Events} from "./SurveySections";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DoneIcon from '@material-ui/icons/Done';
import {ButtonGroup} from "@material-ui/core";
import Container from "@material-ui/core/Container";
const QontoConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            borderColor: '#0055B7',
        },
    },
    completed: {
        '& $line': {
            borderColor: '#0055B7',
        },
    },
    line: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        color: '#0055B7',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#0055B7',
        zIndex: 1,
        fontSize: 18,
    },
});

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
};


const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
        1: <SettingsIcon />,
        2: <GroupAddIcon />,
        3: <VideoLabelIcon />,
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    nextButton:{
        backgroundColor:'#0055B7',
        color:"white",
        padding: '10px 25px 10px 25px',
        marginRight: theme.spacing(1)

    },
    prevButton:{
        backgroundColor:'#0055B7',
        color:"white",
        padding: '10px 20px 10px 20px',
        marginRight: theme.spacing(1)


    },
    goToHomeButton:{
        backgroundColor:'#0055B7',
        color:"white",
        padding: '10px 20px 10px 20px',
        marginTop: theme.spacing(5),
        textTransform:'none'


    },
    title:{
        color:"#0055B7",


    },


}));

function getSteps() {
    return ['News, Blogs, Clubs', 'Academic', 'Events'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return <NewsBlogsClubs/>;
        case 1:
            return <Academic/>;
        default:
            return <Events/>;
    }
}

export default function Survey() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSave = () => {
        console.log('save')
    };

    return (
        <Container maxWidth={'xl'} >

        <div className={classes.root}>

            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography variant={"h6"} className={classes.title}>
                            Thanks for filling in your preferences. If you would like to make changes, please go to settings page to modify
                        </Typography>
                        <Button component={Link} to="/home" className={classes.goToHomeButton}>
                            Bring me to Home Page!

                        </Button>
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                        <div>
                            <ButtonGroup>
                                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.prevButton} startIcon={<ArrowBackIcon/>}>
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    className={classes.nextButton}
                                >
                                    {activeStep === steps.length - 1 ? <DoneIcon/>: <ArrowForwardIcon/>}
                                </Button>

                            </ButtonGroup>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </Container>
    );
}