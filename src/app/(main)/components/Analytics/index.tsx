/* eslint-disable @next/next/next-script-for-ga */
'use client';
// import Script from "next/script"

export function ImpressPixel({ gtm_id }: { gtm_id: string }) {
  return (
    <>
      <div dangerouslySetInnerHTML={{
        __html: `
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtm_id}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <script async type="text/javascript">console.info('ImpressPixel loaded ...');</script>
      `}} />
    </>
  )
}

export default function Analytics({ gtm_id }: { gtm_id: string }) {
  return (
    <>
      <script
        id="google-tag-manager"
        dangerouslySetInnerHTML={{
          __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
console.info('Google Tag Manager loaded ...');
})(window,document,'script','dataLayer','${gtm_id}');
      `}} ></script>
    </>
  )
}

