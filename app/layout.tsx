import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/src/theme";
import "./globals.css";
import Header from "@/src/components/Header/header";
import Footer from "@/src/components/footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const plusJakartaSans = Plus_Jakarta_Sans({
	variable: "--font-plus-jakarta-sans",
	subsets: ["latin"],
	display: "swap",
	weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
	title: "Inktober Archive",
	description: "A collection of Inktober drawings, Blue Archive edition",
	icons: {
		icon: "/favicon.ico",
	},
	openGraph: {
		title: "Inktober Archive",
		description: "A collection of Inktober drawings, Blue Archive edition",
		images: "/og-image.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${plusJakartaSans.variable} antialiased`}>
				<AppRouterCacheProvider options={{ enableCssLayer: true }}>
					<ThemeProvider theme={theme}>
						<Header />
						{children}
						<Footer />
					</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
			<GoogleAnalytics gaId="G-R3PG5HCG44" />
		</html>
	);
}
