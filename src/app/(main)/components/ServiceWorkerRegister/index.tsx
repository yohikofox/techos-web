import RegisterNotificationWorker from "./notification";
import FetchServiceWorkerRegister from "./fetch";

export default async function NotificationWorkerWrapper() {

  return (
    <>
      {/* <FetchServiceWorkerRegister /> */}
      <RegisterNotificationWorker />
    </>
  )
} 