import { Button } from '@/components/ui/button';

interface CustomButtonProps {
  label: string;
  isVariantSecondary?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  height?: string;
  width?: string;
}

const CustomButton = ({
  label,
  isVariantSecondary,
  disabled,
  onClick,
  loading,
  height = '54px',
  width = 'auto',
}: CustomButtonProps) => {
  return (
    <Button
      variant={isVariantSecondary ? 'outline' : 'solid'}
      background={isVariantSecondary ? 'transparent' : 'primary'}
      borderColor={isVariantSecondary ? 'white' : 'primary'}
      color="white"
      fontWeight={700}
      height={height}
      width={width}
      px={4}
      borderRadius="10px"
      disabled={disabled}
      loading={loading}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
