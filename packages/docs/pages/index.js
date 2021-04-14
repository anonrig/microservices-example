import { RedocStandalone } from 'redoc'
import { NextSeo } from 'next-seo'
import config from 'next/config'

export async function getServerSideProps(ctx) {
  const { serverRuntimeConfig } = config()
  const response = await fetch(serverRuntimeConfig.docsUrl)
  return {
    props: {
      spec: await response.json(),
    },
  }
}

export default function Home({ spec }) {
  return (
    <>
      <NextSeo title="Subscription API Documentation" description="Subscription API for emails" />

      <RedocStandalone
        spec={spec}
        options={{
          hideDownloadButton: true,
          hideLoading: true,
          theme: {
            colors: { primary: { main: '#F97316' } },
            typography: {
              fontSize: 14,
              fontWeightLight: 300,
              fontWeightRegular: 500,
              fontWeightBold: 800,
              lineHeight: '1.25rem',
              fontFamily:
                'Inter var,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
              smoothing: true,
              optimizeSpeed: true,
              headings: {
                fontFamily:
                  'Inter var,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
                fontWeight: 800,
                lineHeight: '2.25rem',
              },
              rightPanel: {
                backgroundColor: '#737373',
                textColor: '#FAFAF9',
              },
            },
          },
        }}
      />
    </>
  )
}
