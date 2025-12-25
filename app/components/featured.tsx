"use client";

import { Box, Stack, Typography } from "@mui/material";
import { getFeaturedEntry } from "@/src/utils";
import { Entry } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

const border = {
	border: "2px solid",
	borderColor: "text.primary",
};

export default function Featured() {
	const featuredEntry: Entry | undefined = getFeaturedEntry();

	if (!featuredEntry) return null;

	const [year, , day] = featuredEntry.date.split("-");
	const { isLandscape, image, title } = featuredEntry;

	return (
		<Stack justifyContent="center" alignItems="center" sx={{ position: "relative", height: "50vh", width: "100%" }}>
			<Box
				component={Link}
				href={`/${year}/${day}`}
				sx={{
					position: "relative",
					// A4 aspect ratio: 210mm × 297mm = 1:1.414 (or 0.707:1)
					...(isLandscape ? { width: "90%" } : { height: "90%" }),
					transform: "rotate(5deg)",
					transition: "transform 0.3s ease-in-out",
					aspectRatio: isLandscape ? 1.414 : 0.707,
					borderRadius: 4,
					"&:hover": {
						transform: "rotate(0deg)",
						"#featured-entry-background": {
							transform: "rotate(0deg) translate(10px, 10px)",
						},
						"#featured-title": {
							transform: "translateX(-50%) rotate(0deg)",
						},
					},
				}}
			>
				<Box
					id="featured-entry-background"
					sx={{
						position: "absolute",
						top: "0px",
						left: "0px",
						width: "100%",
						height: "100%",
						backgroundColor: "gray.50",
						borderRadius: 4,
						...border,
						boxShadow: "2px 2px 0 0 black",
						transform: "rotate(-10deg)",
						transition: "transform 0.3s ease-in-out",
					}}
				/>
				<Image
					src={image}
					alt={title}
					fill
					style={{
						borderRadius: "1rem",
						border: "2px solid black",
						boxShadow: "4px 4px 0 0 black",
					}}
				/>
				<Typography
					id="featured-title"
					fontWeight="bold"
					color="text.primary"
					sx={{
						position: "absolute",
						bottom: "-18px",
						left: "50%",
						transform: "translateX(-50%) rotate(-5deg)",
						textAlign: "center",
						zIndex: 1,
						backgroundColor: "white",
						px: 2,
						py: 0.5,
						borderRadius: 4,
						...border,
						boxShadow: "2px 2px 0 0 black",
						fontSize: "0.75rem",
						textWrap: "pre",
						transition: "transform 0.3s ease-in-out",
					}}
				>
					{`Day ${day} (${year})\n${title}`}
				</Typography>
				<Typography
					id="featured-entry"
					fontSize="0.75rem"
					color="text.secondary"
					sx={{
						position: "absolute",
						top: "10px",
						right: "10px",
						borderRadius: 4,
						py: 0.25,
						px: 1,
						backgroundColor: "primary.main",
						color: "white",
						fontWeight: "bold",
						fontSize: "0.75rem",
						textWrap: "nowrap",
						...border,
						transition: "transform 0.3s ease-in-out",
					}}
				>
					Entry of the Day
				</Typography>
			</Box>
		</Stack>
	);
}
