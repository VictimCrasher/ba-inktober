import { Entry } from "@/lib/types";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface EntryCardProps {
	entry: Entry;
}

export default function EntryCard({ entry }: EntryCardProps) {
	if (!entry) return null;

	const [year, , day] = entry.date.split("-");

	return (
		<Box
			component={Link}
			href={`/${year}/${day}`}
			sx={{
        display: "flex",
				position: "relative",
				width: "100%",
				height: "100%",
				borderRadius: 4,
				border: "2px solid",
				borderColor: "text.primary",
				boxShadow: "3px 3px 0 0 black",
        overflow: "hidden",
        transition: "box-shadow 0.15s ease-in-out",
        '&:hover': {
          boxShadow: "7px 7px 0 0 black",
        },
			}}
		>
			{/* gradient overlay */}
			<Box
				sx={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.8))",
          zIndex: 1,
				}}
			/>
			{/* Image */}
			<Image src={entry.image} alt={entry.title} fill style={{ borderRadius: "1rem", objectFit: "cover" }} />
			{/* Title */}
			<Stack
				spacing={0.5}
				useFlexGap
				sx={{ position: "absolute", bottom: "0.5rem", left: "0.5rem", width: "calc(100% - 1rem)", p: 1, zIndex: 2 }}
			>
				<Typography
					variant="body2"
					color="text.primary"
          fontWeight="bold"
					sx={{
						backgroundColor: "white",
						px: 1,
						py: 0.5,
            borderRadius: 4,
						whiteSpace: "nowrap",
            fontSize: "0.75rem",
            width: "fit-content",
					}}
				>
					{`Day ${day} (${year})`}
				</Typography>
				<Typography variant="h6" fontWeight="bold" color="text.primary" noWrap sx={{ color: "white" }}>
					{entry.title}
				</Typography>
			</Stack>
		</Box>
	);
}
