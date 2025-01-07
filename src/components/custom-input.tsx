import { Box, Input } from '@chakra-ui/react';
import { Field } from './ui/field';
import { ERROR_COLOR, INPUT_COLOR } from '@/config/constants';
import { InputGroup } from './ui/input-group';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useMemo, useState } from 'react';

interface CustomInputProps {
  label: string;
  invalid?: boolean;
  errorText?: string;
  helperText?: string;
  type?: 'email' | 'password' | 'text' | 'number';
  disabled?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const ON_FOCUS_PROPS = (invalid: boolean) => ({
  background: INPUT_COLOR,
  //   borderColor: invalid ? ERROR_COLOR : INPUT_COLOR,
  outlineColor: invalid ? ERROR_COLOR : INPUT_COLOR,
});

const CustomInput = ({
  label,
  invalid,
  errorText,
  helperText,
  type = 'text',
  disabled = false,
  value,
  onChange,
  onBlur,
}: CustomInputProps) => {
  const [mutableType, setMutableType] = useState(type);

  const endElement = useMemo(() => {
    if (type === 'password') {
      return (
        <Box
          pr={2}
          cursor="pointer"
          onClick={() => {
            setMutableType(mutableType === 'password' ? 'text' : 'password');
          }}
        >
          {mutableType === 'password' ? (
            <IoMdEye size={16} />
          ) : (
            <IoMdEyeOff size={16} />
          )}
        </Box>
      );
    }
  }, [mutableType, type]);

  return (
    <Field
      invalid={invalid}
      errorText={errorText}
      //   label={label}
      helperText={helperText}
      //   optionalText={optionalText}
    >
      <InputGroup endElement={endElement} w="full" id="teta">
        <Input
          type={mutableType}
          placeholder={label}
          height="45px"
          borderRadius="10px"
          color="white"
          borderColor={INPUT_COLOR}
          background={INPUT_COLOR}
          pl={2}
          disabled={disabled}
          //   paddingInlineEnd="0px!important"
          _active={ON_FOCUS_PROPS(!!invalid)}
          _focus={ON_FOCUS_PROPS(!!invalid)}
          _focusVisible={ON_FOCUS_PROPS(!!invalid)}
          outlineWidth={invalid ? '1px' : 0}
          //
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </InputGroup>
    </Field>
  );
};

export default CustomInput;
