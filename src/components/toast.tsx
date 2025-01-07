import { toast } from 'react-toastify'

const position = 'top-right'
export const showSuccessToast = (msg?: string, autoClose: number = 2000) => {
  toast.success(msg, {
    toastId: 'success-toast-id',
    position,
    autoClose,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'colored',
  })
}
export const showErrorToast = (msg: string) => {
  toast.success(msg, {
    toastId: 'error-toast-id',
    position,
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'colored',
    type: 'error',
  })
}
