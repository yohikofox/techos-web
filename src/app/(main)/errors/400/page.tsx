import StringConvert from "@lib/stringConvert";
export default function Page({
  searchParams: { data },
}: {
  searchParams: { data?: string };
}) {
  return (
    <>
      <h1>400</h1>
      <p>Bad Request</p>
      <pre>
        {data !== undefined && JSON.parse(StringConvert.fromBase64(data))}
      </pre>
    </>
  );
}
