export default async function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
    
  }) {
    
   
    return (
      <section>
        <header>
          <h1>Welcome</h1>
        </header>
        <main>{children}</main>
      </section>
    )
  }