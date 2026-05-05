"use client";

// Microsoft Clarity loader. Renders the official Clarity tag via next/script
// with afterInteractive so it doesn't compete with first paint. The project
// ID is interpolated from an env var (NEXT_PUBLIC_CLARITY_ID) read at build
// time on the parent server component, then passed in here as a prop.

import Script from "next/script";

interface ClarityProps {
  projectId: string;
}

export function Clarity({ projectId }: ClarityProps) {
  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", ${JSON.stringify(projectId)});`}
    </Script>
  );
}
