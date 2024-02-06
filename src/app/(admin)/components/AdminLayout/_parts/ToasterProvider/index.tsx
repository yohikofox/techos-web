import { Toaster } from 'sonner'

import styles from "./styles.module.scss"

interface ToastClassnames {
  toast?: string;
  title?: string;
  description?: string;
  loader?: string;
  closeButton?: string;
  cancelButton?: string;
  actionButton?: string;
  success?: string;
  error?: string;
  info?: string;
  warning?: string;
  default?: string;
}

const classNames: ToastClassnames = {
  toast: styles.toast,
  title: styles.title,
  description: styles.message,
  closeButton: styles.close,
  loader: styles.icon,
  success: styles.success,
  error: styles.error,
  info: styles.info,
  warning: styles.warning,
  default: styles.default,
}

export default function Component() {
  return (<>
    <Toaster
      position={'bottom-right'}
      expand={false}
      closeButton={true}
      dir={"ltr"}
      toastOptions={{
        unstyled: true,
        classNames
      }}
    />
  </>)
}