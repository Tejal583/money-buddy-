export const metadata = {
  title: "Money Buddy - Your Financial Companion",
  keywords: "finance, budgeting, money management, expenses, income, insights",
  description: "Money Buddy is your ultimate financial companion, helping you track expenses, manage budgets, and gain insights into your spending habits.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
