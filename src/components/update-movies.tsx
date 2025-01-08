import { Stack, HStack } from '@chakra-ui/react';
import CustomButton from './custom-button';
import CustomInput from './custom-input';
import DropZone from './drop-zone';
import { Field } from './ui/field';
import useMediaQuery from '@/hooks/useMediaQuery';

interface UpdateMovieProps {
  canUpdate: boolean;
  imagePreview: string;
  removeFile: () => void;
  onDrop: (acceptedFiles: File[]) => void;
  title: string;
  setTitle: (title: string) => void;
  publishingYear: number | null;
  setPublishingYear: (year: number) => void;
  loading: boolean;
  redirectToMovies: () => void;
  create: () => void;
  imageFile: File | null;
  label?: string;
}

interface ButtonsProps {
  canUpdate: boolean;
  loading: boolean;
  redirectToMovies: () => void;
  label?: string;
  title: string;
  publishingYear: number | null;
  imagePreview: string;
  create: () => void;
}

const Inputs = ({
  title,
  setTitle,
  canUpdate,
  publishingYear,
  setPublishingYear,
}: UpdateMovieProps) => (
  <Stack>
    <Field w={{ base: 'auto', md: '362px' }}>
      <CustomInput
        label="Title"
        type="text"
        value={title}
        disabled={!canUpdate}
        onChange={(e) => setTitle(e.target.value)}
      />
    </Field>
    <Field w={{ base: 'auto', md: '216px' }}>
      <CustomInput
        label="Publishing year"
        type="number"
        disabled={!canUpdate}
        value={publishingYear?.toString() ?? ''}
        onChange={(e) => setPublishingYear(parseInt(e.target.value))}
      />
    </Field>
  </Stack>
);

const Buttons = ({
  canUpdate,
  loading,
  redirectToMovies,
  label,
  title,
  publishingYear,
  imagePreview,
  create,
}: ButtonsProps) => {
  return (
    <HStack w="full" id="stack2">
      <CustomButton
        width="50%"
        label="Cancel"
        loading={loading}
        isVariantSecondary
        disabled={!canUpdate}
        onClick={redirectToMovies}
      />
      <CustomButton
        width="50%"
        label={label ?? ''}
        disabled={!title || !publishingYear || !imagePreview || !canUpdate}
        loading={loading}
        onClick={create}
      />
    </HStack>
  );
};

const UpdateMovie = ({
  canUpdate,
  imagePreview,
  removeFile,
  onDrop,
  title,
  setTitle,
  publishingYear,
  setPublishingYear,
  loading,
  redirectToMovies,
  create,
  imageFile,
  label = 'Submit',
}: UpdateMovieProps) => {
  //   const [isMobile] = useMediaQuery(['(max-width: 768px)'], { ssr: false });
  //   const isMobile = true;

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <>
      {!isMobile && (
        <DropZone
          imagePreview={imagePreview}
          removeFile={removeFile}
          onDrop={onDrop}
          disabled={!canUpdate}
        />
      )}

      <Stack gap="8" w={{ base: 'full', md: 'auto' }}>
        <Inputs
          title={title}
          setTitle={setTitle}
          canUpdate={canUpdate}
          publishingYear={publishingYear}
          setPublishingYear={setPublishingYear}
          imagePreview={''}
          removeFile={removeFile}
          onDrop={onDrop}
          loading={loading}
          redirectToMovies={redirectToMovies}
          create={create}
          imageFile={imageFile}
        />

        {isMobile && (
          <DropZone
            imagePreview={imagePreview}
            removeFile={removeFile}
            onDrop={onDrop}
            disabled={!canUpdate}
          />
        )}

        <Buttons
          canUpdate={canUpdate}
          loading={loading}
          redirectToMovies={redirectToMovies}
          label={label}
          title={title}
          publishingYear={publishingYear}
          imagePreview={imagePreview}
          create={create}
        />
      </Stack>
    </>
  );
};

export default UpdateMovie;
