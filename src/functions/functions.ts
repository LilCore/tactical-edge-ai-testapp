import { sendDataToS3 } from '@/services/api';
import { User } from '@/types/userTypes';

export const fileToStringBuffer = async (e: File): Promise<string> => {
  const arrayBuffer = await e.arrayBuffer();
  return Buffer.from(arrayBuffer).toString('base64');
};

// TO-DO: Large images will fail
export const storeFile = async (file: any, fileName: string, user: User) => {
  if (file) {
    const stringBuffer = await fileToStringBuffer(file);
    // const stringBuffer = file;
    if (stringBuffer && user) {
      const payload = {
        file: stringBuffer,
        key: `${user.name}-${user.email}/${fileName}`,
      };
      // console.log({ payload });
      return await sendDataToS3(payload);
    }
  }
};
