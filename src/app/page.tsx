'use client';

import {
  Container,
  HStack,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Checkbox } from '@/components/ui/checkbox';
import CustomInput from '@/components/custom-input';
import CustomButton from '@/components/custom-button';
import { useCallback, useMemo, useState } from 'react';
import { isValidEmail, isValidPassword } from '@/functions/validations';
import { ROUTES } from '@/types/routesTypes';
import { logUserIn } from '@/services/api';
import { showSuccessToast, showErrorToast } from '@/components/toast';
import { storeUserData } from '@/functions/localStorage';
import { useRouter } from 'next/navigation';
import { CENTER_STYLES } from '@/components/page-spinner';
import useStore from '@/config/zustantStore';

export default function Login() {
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailHasError, setEmailHasError] = useState(false);
  const [passwordHasError, setPasswordHasError] = useState(false);

  const [emailError, setEmailError] = useState('');

  const customButtomIsDisabled = useMemo(
    () => !isValidEmail(email) || !isValidPassword(password),
    [email, password],
  );

  const signIn = useCallback(async () => {
    setLoading(true);
    const result = await logUserIn({ email, password });
    // console.log({ result });
    const responseMessage = result.message;
    if (result.success) {
      showSuccessToast(responseMessage);
      const token = result.data?.token;
      const user = result.data?.user;
      storeUserData(token, user);
      setUser(user);
      router.push(ROUTES.MOVIES);
    } else {
      showErrorToast(responseMessage);
      setEmailError(responseMessage);
      setEmailHasError(true);
    }

    setLoading(false);
  }, [email, password, router, setUser]);

  return (
    <Container maxW="300px" style={CENTER_STYLES}>
      <Stack gap="8">
        <Stack gap={{ base: '2', md: '3' }} textAlign="center">
          <Heading size={{ base: '6xl' }}>Sign in</Heading>
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
                label="Password"
                type="password"
                helperText="Password must be at least 6 characters"
                errorText="Invalid Password"
                value={password}
                invalid={passwordHasError}
                onChange={(e) => {
                  setPasswordHasError(false);
                  setPassword(e.target.value);
                }}
                onBlur={(e) => {
                  if (e.target.value)
                    setPasswordHasError(!isValidPassword(e.target.value));
                }}
              />
            </Stack>
            <HStack justify="space-between">
              {/* <Checkbox defaultChecked>Remember me</Checkbox> */}
              {/* <Link variant="plain" fontSize="sm" href={ROUTES.FORGOT_PASSWORD}>
              Forgot password
            </Link> */}
            </HStack>
            <Stack gap="4">
              <CustomButton
                label="Login"
                disabled={customButtomIsDisabled}
                loading={loading}
                onClick={signIn}
              />
            </Stack>
          </Stack>

          <Text textStyle="sm" color="fg.muted" textAlign="center">
            Doesn&apos;t have an account?{' '}
            <Link
              variant="underline"
              href={ROUTES.SIGNUP}
              _hover={{ color: 'primary' }}
            >
              Sign up
            </Link>
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
}
