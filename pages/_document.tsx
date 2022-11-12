import { Main, NextScript, Head } from "next/document";

<Head>
  <script
    dangerouslySetInnerHTML={{
      __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','G-GVTLXMTJ30');`,
    }}
  />
</Head>;

<body>
  <Main />
  <NextScript />
  <noscript
    dangerouslySetInnerHTML={{
      __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=G-GVTLXMTJ30" height="0" width="0" style="display: none; visibility: hidden;" />`,
    }}
  />
</body>;
