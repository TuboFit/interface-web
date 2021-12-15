import * as React from 'react';
import { FormProvider } from '../../contexts/FormContext'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormDadosPessoais from './FormDadosPessoais';
import FormAlunos from './FormAlunos';
import FormProfessores from './FormProfessores';
import Review from './Review';
import { Copyright } from '../Copyright';

type PropsTypeCadastro = {
    aluno: boolean;
    title: string;
}


const steps = ['Dados Pessoais', 'Cadastro', 'Confirmação'];

function getStepContent(step: number, alunos: boolean, title: string) {
    switch (step) {
        case 0:
            return <FormDadosPessoais title={title} />;
        case 1:
            return (alunos === true ? <FormAlunos /> : < FormProfessores title={title} />);
        case 2:
            return <Review />
        default: {
            throw new Error('Passo inválido');
        }

    }
}

export default function CheckoutForm({ title, aluno }: PropsTypeCadastro) {
    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <FormProvider>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Cadastro
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Cadastro relizado com sucesso!.
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep, aluno, title)}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                            Voltar
                                        </Button>
                                    )}
                                    {activeStep === steps.length - 1 ? null :
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 3, ml: 1 }}
                                        >
                                            {'Proximo'}
                                        </Button>}
                                </Box>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
                <Copyright />
            </Container>
        </FormProvider>
    );
}