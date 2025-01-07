'use client';

import { Container, HStack, Heading, Stack, Text } from '@chakra-ui/react';
import CustomInput from '@/components/custom-input';
import CustomButton from '@/components/custom-button';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { isValidEmail, isValidPassword } from '@/functions/validations';
import { PinInput } from '@/components/ui/pin-input';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/types/routesTypes';

const Step1 = ({
  email,
  setEmail,
  setStep,
}: {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<number>>;
}) => {
  const [emailHasError, setEmailHasError] = useState(false);

  return (
    <Stack gap="8">
      <Stack gap={{ base: '2', md: '3' }} textAlign="center">
        <Heading size={{ base: '2xl' }}>Enter your email address</Heading>
      </Stack>

      <Stack gap="6">
        <Stack gap="5">
          <CustomInput
            label="Email"
            type="email"
            errorText="Invalid Email"
            value={email}
            invalid={emailHasError}
            onChange={(e) => {
              setEmailHasError(false);
              setEmail(e.target.value);
            }}
            onBlur={(e) => {
              if (e.target.value)
                setEmailHasError(!isValidEmail(e.target.value));
            }}
          />
        </Stack>
        <Stack gap="2">
          <Text fontSize="sm" textAlign="center">
            We will send a code to your email.
          </Text>
          <CustomButton
            label="Send Code"
            disabled={!isValidEmail(email)}
            onClick={() => {
              setStep(2);
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

const Step2 = ({
  code,
  setCode,
  setStep,
}: {
  code: string[];
  setCode: Dispatch<SetStateAction<string[]>>;
  setStep: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <Stack gap="8">
      <Stack gap={{ base: '2', md: '3' }} textAlign="center">
        <Heading size={{ base: '2xl' }}>Enter code</Heading>
      </Stack>

      <Stack gap="6">
        <HStack gap="5" justifyContent="center">
          <PinInput
            otp
            variant="subtle"
            // borderColor={INPUT_COLOR}
            // background={INPUT_COLOR}
            value={code}
            onValueChange={(e) => setCode(e.value)}
          />
        </HStack>
        <Stack gap="2">
          <CustomButton
            label="Validate Code"
            disabled={code.join('').length !== 4}
            onClick={() => {
              setStep(3);
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

const Step3 = ({
  password,
  repeatPassword,
  setPassword,
  setRepeatPassword,
}: {
  password: string;
  repeatPassword: string;
  setPassword: Dispatch<SetStateAction<string>>;
  setRepeatPassword: Dispatch<SetStateAction<string>>;
}) => {
  const [passwordHasError, setPasswordHasError] = useState(false);
  const [repeatPasswordHasError, setRepeatPasswordHasError] = useState(false);
  const router = useRouter();

  return (
    <Container maxW="300px">
      <Stack gap="8">
        <Stack gap={{ base: '2', md: '3' }} textAlign="center">
          <Heading size={{ base: '2xl', md: '6xl' }}>Sign up</Heading>
        </Stack>

        <Stack gap="6">
          <Stack gap="5">
            <CustomInput
              label="Password"
              type="password"
              errorText="Invalid Password"
              value={password}
              invalid={passwordHasError}
              onChange={(e) => {
                setPasswordHasError(false);
                setRepeatPasswordHasError(false);
                setPassword(e.target.value);
              }}
              onBlur={(e) => {
                if (e.target.value) {
                  setPasswordHasError(!isValidPassword(e.target.value));
                  if (repeatPassword)
                    setRepeatPasswordHasError(
                      e.target.value !== repeatPassword,
                    );
                }
              }}
            />
            <CustomInput
              label="Repeat password"
              type="password"
              helperText="Password must be at least 6 characters"
              errorText="Repeat password is not equal"
              value={repeatPassword}
              invalid={repeatPasswordHasError}
              onChange={(e) => {
                setRepeatPasswordHasError(false);
                setPasswordHasError(false);
                setRepeatPassword(e.target.value);
              }}
              onBlur={(e) => {
                if (e.target.value) {
                  setRepeatPasswordHasError(e.target.value !== password);
                }
              }}
            />
          </Stack>
          <Stack gap="4">
            <CustomButton
              label="Change Password"
              disabled={
                !isValidPassword(password) || repeatPassword !== password
              }
              onClick={() => {
                console.log('Password changed');
                router.push(ROUTES.LOGIN);
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default function Login() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '']);

  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const content = useMemo(() => {
    switch (step) {
      case 1:
        return <Step1 email={email} setEmail={setEmail} setStep={setStep} />;
      case 2:
        return <Step2 code={code} setCode={setCode} setStep={setStep} />;
      case 3:
        return (
          <Step3
            password={password}
            repeatPassword={repeatPassword}
            setPassword={setPassword}
            setRepeatPassword={setRepeatPassword}
          />
        );

      default:
        return <></>;
    }
  }, [code, email, password, repeatPassword, step]);

  return <Container maxW="300px">{content}</Container>;
}
