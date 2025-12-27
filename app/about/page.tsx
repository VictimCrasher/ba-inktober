import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export const generateMetadata = async () => {
	return {
		title: "About This Project - Inktober Archive",
		description: "About This Project - Inktober Archive",
		openGraph: {
			title: "About This Project - Inktober Archive",
			description: "About This Project - Inktober Archive",
			url: "https://ba-ink.victim-crasher.com/about",
			images: ["https://ba-ink.victim-crasher.com/banner.png"],
		},
		twitter: {
			title: "About This Project - Inktober Archive",
			description: "About This Project - Inktober Archive",
			images: ["https://ba-ink.victim-crasher.com/banner.png"],
		},
	};
};

export default function About() {
	return (
		<Box className="flex flex-col min-h-screen" sx={{ backgroundColor: "background.default", pt: 4 }}>
			<Container maxWidth="lg">
				<Stack direction="column" spacing={4}>
					<Stack direction="column" spacing={0.5}>
						<Typography
							variant="h1"
							fontWeight="bold"
							color="text.primary"
							sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
						>
							About This Project
						</Typography>
						<Typography
							variant="h3"
							color="text.secondary"
							sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
						>
							What is this project even about?
						</Typography>
					</Stack>
					<Stack
						direction={{ xs: "column", md: "row" }}
						spacing={2}
						useFlexGap
						alignItems={{ xs: "center", md: "flex-start" }}
					>
						<Stack direction="row" justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
							<Box
								sx={{
									width: "100%",
									height: "auto",
									position: "relative",
									aspectRatio: "4/3",
									borderRadius: "1rem",
								}}
							>
								<Image src="/bannerbig.webp" alt="About This Project" fill />
							</Box>
						</Stack>
						<Stack direction="column" spacing={0.5} sx={{ width: "100%" }}>
							<Typography variant="h6" fontWeight="bold" color="text.secondary">
								What is Inktober?
							</Typography>
							<Typography variant="body1" color="text.secondary">
								{`Inktober is a yearly event where artists create a drawing every day for the month of
								October. I've been participating in this event since 2018 and have been
								consistently participating since 2023. In 2024 I decided to start my own spin in the
								event by adding a consistent theme to my drawings, and I think no other theme is more
								suited than the theme of Blue Archive.`}
							</Typography>
							<Typography variant="h6" fontWeight="bold" color="text.secondary" sx={{ pt: 2 }}>
								Why Blue Archive?
							</Typography>
							<Typography variant="body1" color="text.secondary">
								{`Blue Archive is a game that I've been playing since 2023 and I've fallen in love with the characters and the story. As a gacha game, the game consists of diverse characters with unique personalities and backstories. Since inktober is all about creating a drawing every day, I thought it would be a great idea to draw the characters from Blue Archive and don't need to worry about coming up with the same question of "Who should I draw today?".`}
							</Typography>
							<Typography variant="h6" fontWeight="bold" color="text.secondary" sx={{ pt: 2 }}>
								{`Why the name "Inktober Archive"?`}
							</Typography>
							<Typography variant="body1" color="text.secondary">
								{`Simply, it's a pun of the words "Inktober" and "Blue Archive".`}
							</Typography>
							<Typography variant="h6" fontWeight="bold" color="text.secondary" sx={{ pt: 2 }}>
								{`How can I support this project?`}
							</Typography>
							<Typography variant="body1" color="text.secondary">
								{`You can support this project by following me on my social media accounts. I'm also considering putting the drawings in a physical book, please kindly look forward to it!`}
							</Typography>
							<Typography variant="h6" fontWeight="bold" color="text.secondary" sx={{ pt: 2 }}>
								{`How can I contact you?`}
							</Typography>
							<Typography variant="body1" color="text.secondary">
								{`You can contact me by my social media accounts here:`}&nbsp;
								<Link
									href="https://victim-crasher.com/"
									target="_blank"
									style={{ color: "blue", textDecoration: "underline" }}
								>
									{`victim-crasher.com`}
								</Link>
							</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
}
