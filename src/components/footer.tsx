"use client";

import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import { ButterflyIcon, GlobeIcon, XLogoIcon } from "@phosphor-icons/react";
import Image from "next/image";

export default function Footer() {
	return (
		<Box component="footer" sx={{ backgroundColor: "background.default", p: 2 }}>
			<Container maxWidth="lg" sx={{ borderTop: "2px solid", borderColor: "text.primary", mt: 5 }}>
				<Stack
					direction={{ xs: "column", md: "row" }}
					justifyContent="space-between"
					alignItems="center"
          spacing={2}
					sx={{ py: 2 }}
				>
					<Stack direction="row" spacing={2} alignItems="center">
						<Image
							src="/icon.png"
							alt="Inktober Archive"
							width={48}
							height={48}
              className="hidden md:block"
						/>
						<Stack sx={{ textAlign: { xs: "center", md: "left" } }}>
							<Typography variant="h6" fontWeight="bold" color="primary.main" lineHeight="1.2">
								Inktober Archive
							</Typography>
							<Typography
								variant="body2"
								fontWeight="500"
								color="text.secondary"
								sx={{ fontSize: "0.75rem" }}
							>
								Copyright © {new Date().getFullYear()} Victim_Crasher
							</Typography>
							<Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
								Blue Archive is a Real-time Strategy Gacha RPG developed by MX Studio under the NEXON
								GAMES label.
							</Typography>
						</Stack>
					</Stack>
					<Stack direction="row" spacing={0.5}>
						<IconButton
							component="a"
							href="https://x.com/Victim_Crasher"
							target="_blank"
							rel="noopener noreferrer"
							title="X"
						>
							<XLogoIcon size={24} color="text.secondary" />
						</IconButton>
						<IconButton
							component="a"
							href="https://bsky.app/profile/victim-crasher.com"
							target="_blank"
							rel="noopener noreferrer"
							title="BlueSky"
						>
							<ButterflyIcon size={24} color="text.secondary" />
						</IconButton>
						<IconButton
							component="a"
							href="https://www.pixiv.net/en/users/22160611"
							target="_blank"
							rel="noopener noreferrer"
							title="Pixiv"
						>
							<Image src="/pixiv.svg" alt="Pixiv" width={24} height={24} />
						</IconButton>
						<IconButton
							component="a"
							href="https://victim-crasher.com/"
							target="_blank"
							rel="noopener noreferrer"
							title="Website"
						>
							<GlobeIcon size={24} color="text.secondary" />
						</IconButton>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
}
