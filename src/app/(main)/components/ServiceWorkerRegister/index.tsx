import RegisterNotificationWorker from "./notification";

export default async function NotificationWorkerWrapper() {

  return (
    <>
      {/* <FetchServiceWorkerRegister /> */}
      <RegisterNotificationWorker />
    </>
  )
} 