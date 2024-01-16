const layout = function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <section >
          {children}
        </section>
      </body>
    </html>
  )
};

export default layout;
