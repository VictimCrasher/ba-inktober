import { Box, Button, Container, Divider, Stack, Typography } from "@mui/material";
import { ButterflyIcon, TwitterLogoIcon, GlobeIcon } from "@phosphor-icons/react/dist/ssr";
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

const buttonSx = {
	color: "text.secondary",
	borderColor: "text.secondary",
};

export default function Artist() {
	return (
		<Box
			className="flex flex-col"
			sx={{ backgroundColor: "background.default", pt: 4, minHeight: "calc(100vh - 200px)" }}
		>
			<Container maxWidth="lg">
				<Stack direction="column" spacing={4}>
					<Stack direction="column" spacing={0.5}>
						<Stack direction="row">
							<Typography
								variant="h1"
								fontWeight="bold"
								color="text.primary"
								sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
							>
								Behind The&nbsp;
							</Typography>
							<Typography
								variant="h1"
								fontWeight="bold"
								color="primary.main"
								sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
							>
								Drawings
							</Typography>
						</Stack>
						<Typography
							variant="h3"
							color="text.secondary"
							sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
						>
							Meet The Artist
						</Typography>
					</Stack>
					<Stack
						direction={{ xs: "column", md: "row" }}
						spacing={4}
						useFlexGap
						alignItems={{ xs: "center", md: "flex-start" }}
					>
						<Stack
							direction="row"
							justifyContent="center"
							alignItems="center"
							sx={{ width: { xs: "100%", md: "33%" } }}
						>
							<Image
								src="/me.jpg"
								alt="Me"
								width={400}
								height={400}
								style={{
									borderRadius: "1rem",
									border: "2px solid #666666",
									boxShadow: "7px 7px 0 0 #666666",
								}}
							/>
						</Stack>
						<Stack direction="column" spacing={0.5} sx={{ width: { xs: "100%", md: "67%" } }}>
							<Stack direction="row">
								<Typography variant="h5" fontWeight="bold" color="text.secondary">
									{`Hi! I'm`}&nbsp;
								</Typography>
								<Typography variant="h5" fontWeight="bold" color="primary.main">
									{`Victim Crasher`}
								</Typography>
							</Stack>
							<Typography variant="body1" color="text.secondary">
								{`I'm a software engineer and a big fan of the game Blue Archive based in Jakarta, Indonesia.`}
							</Typography>
							<Typography variant="body1" color="text.secondary">
								{`I've been drawing since I was a kid, and I've been drawing digitally since 2016. Although I'm nowhere near being a professional artist, I hope this website can serve as a platform for me to share my drawings with the world.`}
							</Typography>
							<Typography variant="body1" color="text.secondary">
								{`If you like my drawings, please consider following me on my social media accounts, looking forward to seeing you there!`}
							</Typography>
							<Divider sx={{ pt: 2 }} />
							<Typography variant="h6" fontWeight="bold" color="text.secondary" sx={{ pt: 2 }}>
								Connect With Me
							</Typography>
							<Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ pt: 1 }}>
								<Link href="https://x.com/Victim_Crasher" target="_blank" title="Twitter">
									<Button
										startIcon={<TwitterLogoIcon size={24} color="#666666" />}
										variant="outlined"
										sx={buttonSx}
									>
										Twitter
									</Button>
								</Link>
								<Link
									href="https://bsky.app/profile/victim-crasher.com"
									target="_blank"
									title="BlueSky"
								>
									<Button
										startIcon={<ButterflyIcon size={24} color="#666666" />}
										variant="outlined"
										sx={buttonSx}
									>
										BlueSky
									</Button>
								</Link>
								<Link href="https://www.pixiv.net/en/users/22160611" target="_blank" title="Pixiv">
									<Button
										startIcon={
											<Image
												src="/pixiv.svg"
												alt="Pixiv"
												width={24}
												height={24}
												color="#666666"
											/>
										}
										variant="outlined"
										sx={buttonSx}
									>
										Pixiv
									</Button>
								</Link>
								<Link href="https://victim-crasher.com/" target="_blank" title="Website">
									<Button
										startIcon={<GlobeIcon size={24} color="#666666" />}
										variant="outlined"
										sx={buttonSx}
									>
										My Personal Website
									</Button>
								</Link>
							</Stack>
						</Stack>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
}
