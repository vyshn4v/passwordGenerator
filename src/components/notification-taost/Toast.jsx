import Error from './Error'
import Success from './Success'
function Toast({ toast, close }) {
  const toasts = {
    Success: <Success close={close} message={toast.content} />,
    Error: <Error close={close} message={toast.content} />
  }
  return toasts[toast.type]
}

export default Toast