import Error from './Error'
import Success from './Success'
function Toast({ toast, close }) {
  const toasts = {
    Success: <Success close={close} message={toast.content} id={toast.id} />,
    Error: <Error close={close} message={toast.content} id={toast.id} />
  }
  return toasts[toast.type]
}

export default Toast