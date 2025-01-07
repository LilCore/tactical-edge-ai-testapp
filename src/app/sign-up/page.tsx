'use client';

import { Container, Heading, Link, Stack, Text } from '@chakra-ui/react';
import CustomInput from '@/components/custom-input';
import CustomButton from '@/components/custom-button';
import { useCallback, useMemo, useState } from 'react';
import { isValidEmail, isValidPassword } from '@/functions/validations';
import { ROUTES } from '@/types/routesTypes';
import { registerUser } from '@/services/api';
import { showErrorToast, showSuccessToast } from '@/components/toast';
import { storeUserData } from '@/functions/localStorage';
import { useRouter } from 'next/navigation';
import { CENTER_STYLES } from '@/components/page-spinner';

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [emailHasError, setEmailHasError] = useState(false);
  const [passwordHasError, setPasswordHasError] = useState(false);
  const [repeatPasswordHasError, setRepeatPasswordHasError] = useState(false);

  const [emailError, setEmailError] = useState('');

  const customButtomIsDisabled = useMemo(
    () =>
      !isValidEmail(email) ||
      !name ||
      !isValidPassword(password) ||
      repeatPassword !== password,
    [email, name, password, repeatPassword],
  );

  const signUp = useCallback(async () => {
    setLoading(true);
    const result = await registerUser({ email, password, name });
    console.log({ result });
    const responseMessage = result.message;
    if (result.success) {
      showSuccessToast(responseMessage);
      const token = result.data?.token;
      const user = result.data?.user;
      storeUserData(token, user);
      router.push(ROUTES.MOVIES);
    } else {
      showErrorToast(responseMessage);
      setEmailError(responseMessage);
      setEmailHasError(true);
    }

    setLoading(false);
  }, [email, name, password, router]);

  return (
    <Container maxW="300px" style={CENTER_STYLES}>
      <Stack gap="8">
        <Stack gap={{ base: '2', md: '3' }} textAlign="center">
          <Heading size={{ base: '6xl' }}>Sign up</Heading>
        </Stack>

        <Stack>
          <Stack gap="6">
            <Stack gap="5">
              <CustomInput
                label="Email"
                type="email"
                errorText={emailError}
                value={email}
                invalid={emailHasError}
                onChange={(e) => {
                  setEmailHasError(false);
                  setEmail(e.target.value);
                }}
                onBlur={(e) => {
                  if (e.target.value) {
                    const isInvalid = !isValidEmail(e.target.value);
                    setEmailHasError(isInvalid);
                    setEmailError('Invalid Email Address');
                  }
                }}
              />
              <CustomInput
                label="Name"
                type="text"
                errorText="Invalid Name"
                value={name}
                //   invalid={}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
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
                label="Sign Up"
                disabled={customButtomIsDisabled}
                loading={loading}
                onClick={signUp}
              />
            </Stack>
          </Stack>

          <Text textStyle="sm" color="fg.muted" textAlign="center">
            Have an account already?{' '}
            <Link
              variant="underline"
              href={ROUTES.LOGIN}
              _hover={{ color: 'primary' }}
            >
              Log in
            </Link>
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
}
