import "./offline.scss"

const layout = function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="fr">
      <body>
        <section >
          {children}
        </section>
      </body>
    </html>
  )
};

export default layout;
