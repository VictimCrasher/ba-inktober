"use client";

import { Button, Stack } from "@mui/material";
import { Entry } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { ButterflyIcon, CheckIcon, ShareNetworkIcon, TwitterLogoIcon } from "@phosphor-icons/react";
import { useState } from "react";

const buttonSx = {
	color: "text.secondary",
	borderColor: "text.secondary",
};

export default function Socmed({ entry }: { entry: Entry }) {
	const { pixiv, blueSky, twitter } = entry;
	const [isShared, setIsShared] = useState(false);

	const onShare = () => {
		if (typeof window.navigator.share === "function") {
			window.navigator.share({
				title: `${entry.title} - Inktober Archive`,
				text: `${entry.title} - ${entry.description.join(" ")}`,
				url: `${window.location.href}?utm_source=share`,
			});
		} else {
			window.navigator.clipboard.writeText(`${window.location.href}?utm_source=share`);
			setIsShared(true);
			setTimeout(() => {
				setIsShared(false);
			}, 1000);
		}
	};

	return (
		<Stack direction="row" flexWrap="wrap" spacing={1} useFlexGap>
			{twitter && (
				<Link href={twitter} target="_blank">
					<Button variant="outlined" startIcon={<TwitterLogoIcon size={24} color="#666666" />} sx={buttonSx}>
						View on Twitter
					</Button>
				</Link>
			)}
			{blueSky && (
				<Link href={blueSky} target="_blank">
					<Button variant="outlined" startIcon={<ButterflyIcon size={24} color="#666666" />} sx={buttonSx}>
						View on Blue Sky
					</Button>
				</Link>
			)}
			{pixiv && (
				<Link href={pixiv} target="_blank">
					<Button
						variant="outlined"
						startIcon={<Image src="/pixiv.svg" alt="Pixiv" width={24} height={24} color="#666666" />}
						sx={buttonSx}
					>
						View on Pixiv
					</Button>
				</Link>
			)}
			<Button
				variant="outlined"
				onClick={onShare}
				startIcon={
					isShared ? (
						<CheckIcon size={24} color="success.main" />
					) : (
						<ShareNetworkIcon size={24} color="#666666" />
					)
				}
				sx={{
					...buttonSx,
					color: isShared ? "success.main" : "text.secondary",
					borderColor: isShared ? "success.main" : "text.secondary",
				}}
			>
				{isShared ? "Copied to clipboard" : "Share this entry"}
			</Button>
		</Stack>
	);
}
