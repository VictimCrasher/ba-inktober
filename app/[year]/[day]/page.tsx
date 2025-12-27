import { entries } from "@/lib/entries";
import { notFound } from "next/navigation";
import { Box, Button, Container, Grid, Skeleton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon, CalendarBlankIcon } from "@phosphor-icons/react/dist/ssr";
import moment from "moment";
import Link from "next/link";
import Socmed from "./components/socmed";
import { Suspense } from "react";

interface EntryPageProps {
	params: Promise<{
		year: string;
		day: string;
	}>;
}

export async function generateStaticParams() {
	return entries.map((entry) => ({
		year: entry.date.split("-")[0],
		day: entry.date.split("-")[2],
	}));
}

export const generateMetadata = async ({ params }: EntryPageProps) => {
	const { year, day } = await params;
	const entry = entries.find((entry) => entry.date === `${year}-10-${day}`);
	if (!entry) return notFound();
	return {
		title: `${entry.title} - Inktober Archive Day ${day} (${year})`,
		description: entry.description.join(" "),
		openGraph: {
			title: `${entry.title} - Inktober Archive Day ${day} (${year})`,
			description: entry.description.join(" "),
			images: [`https://ba-ink.victim-crasher.com${entry.image}`],
		},
		twitter: {
			title: `${entry.title} - Inktober Archive Day ${day} (${year})`,
			description: entry.description.join(" "),
			images: [`https://ba-ink.victim-crasher.com${entry.image}`],
		},
	};
};

export default async function EntryPage({ params }: EntryPageProps) {
	const { year, day } = await params;

	const entryIndex = entries.findIndex((entry) => entry.date === `${year}-10-${day}`);
	if (entryIndex === -1) return notFound();

	const entry = entries[entryIndex];
	const prevEntry = entries[entryIndex - 1];
	const nextEntry = entries[entryIndex + 1];

	const { isLandscape, image, title, description, note, characters } = entry;

	return (
		<Box className="flex flex-col" sx={{ backgroundColor: "background.default", pt: 4 }}>
			<Container maxWidth="lg">
				<Stack direction={{ xs: "column", md: isLandscape ? "column" : "row" }} spacing={isLandscape ? 6 : 3}>
					<Stack
						direction="column"
						spacing={2}
						alignItems="center"
						sx={{
							flexGrow: 1,
							minWidth: { xs: "100%", md: 0 },
							maxWidth: { xs: "100%", md: isLandscape ? "100%" : "50%" },
						}}
					>
						<Stack
							justifyContent="center"
							alignItems="center"
							sx={{
								...(isLandscape
									? { width: "100%" }
									: {
											maxWidth: "100%",
											width: { xs: "100%", md: "auto" },
											minHeight: { xs: "0", md: "75dvh" },
											maxHeight: { md: "75dvh" },
									  }),
								position: "relative",
								aspectRatio: isLandscape ? 1.414 : 0.707,
								borderRadius: 4,
								border: "2px solid",
								borderColor: "text.primary",
								boxShadow: "5px 5px 0 0 black",
							}}
						>
							<Image src={image} alt={title} fill style={{ borderRadius: "1rem", objectFit: "cover" }} />
						</Stack>
						<Stack direction="row" justifyContent="space-between" spacing={2} sx={{ width: "100%" }}>
							{prevEntry ? (
								<Link
									href={`/${prevEntry.date.split("-")[0]}/${prevEntry.date.split("-")[2]}`}
									passHref
								>
									<Button
										variant="text"
										startIcon={<ArrowLeftIcon size={24} color="#666666" weight="bold" />}
										sx={{ textAlign: "left" }}
									>
										<Stack direction="column" alignItems="flex-start">
											<Typography
												variant="body2"
												color="text.secondary"
												sx={{ fontSize: "0.75rem" }}
											>
												PREVIOUS
											</Typography>
											<Typography variant="body2" fontWeight="bold" color="text.secondary">
												{prevEntry.title}
											</Typography>
											<Typography
												variant="body2"
												color="text.secondary"
												sx={{ fontSize: "0.75rem" }}
											>
												{moment(prevEntry.date).format("MMMM D, YYYY")}
											</Typography>
										</Stack>
									</Button>
								</Link>
							) : (
								<div />
							)}
							{nextEntry ? (
								<Link
									href={`/${nextEntry.date.split("-")[0]}/${nextEntry.date.split("-")[2]}`}
									passHref
								>
									<Button
										variant="text"
										endIcon={<ArrowRightIcon size={24} color="#666666" weight="bold" />}
										sx={{ textAlign: "right" }}
									>
										<Stack direction="column" alignItems="flex-end">
											<Typography
												variant="body2"
												color="text.secondary"
												sx={{ fontSize: "0.75rem" }}
											>
												NEXT
											</Typography>
											<Typography variant="body2" fontWeight="bold" color="text.secondary">
												{nextEntry.title}
											</Typography>
											<Typography
												variant="body2"
												color="text.secondary"
												sx={{ fontSize: "0.75rem" }}
											>
												{moment(nextEntry.date).format("MMMM D, YYYY")}
											</Typography>
										</Stack>
									</Button>
								</Link>
							) : (
								<div />
							)}
						</Stack>
					</Stack>
					<Stack
						direction="column"
						spacing={4}
						sx={{ flexGrow: 1, minWidth: 0, maxWidth: { xs: "100%", md: isLandscape ? "100%" : "50%" } }}
					>
						<Stack direction="column" spacing={0.5}>
							<Typography
								variant="h3"
								fontWeight="bold"
								color="text.primary"
								sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
							>
								{`Day ${day} (${year})`}
							</Typography>
							<Typography
								variant="h1"
								fontWeight="bold"
								color="text.primary"
								sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
							>
								{title}
							</Typography>
							<Stack direction="row" spacing={0.5} alignItems="center">
								<CalendarBlankIcon size={14} color="#666666" weight="bold" />
								<Typography variant="body2" color="text.secondary" fontWeight="600">
									{moment(`${year}-10-${day}`).format("MMMM D, YYYY")}
								</Typography>
							</Stack>
						</Stack>

						<Stack direction="column" spacing={0.5}>
							<Typography variant="body2" fontWeight="bold" color="text.secondary">
								IMAGE DESCRIPTION
							</Typography>
							{description.map((desc, index) => (
								<Typography key={index} variant="body2" color="text.secondary">
									{desc}
								</Typography>
							))}
						</Stack>
						<Stack direction="column" spacing={0.5}>
							<Typography variant="body2" fontWeight="bold" color="text.secondary">
								ARTIST COMMENTARY
							</Typography>
							{note.map((noteItem, index) => (
								<Typography key={index} variant="body2" color="text.secondary">
									{noteItem}
								</Typography>
							))}
						</Stack>

						<Stack direction="column" spacing={0.5}>
							<Typography variant="body2" fontWeight="bold" color="text.secondary">
								CHARACTERS
							</Typography>
							<Grid container spacing={2} alignItems="stretch">
								{characters.map((character, index) => (
									<Grid key={index} size={{ xs: 12, md: 6 }}>
										<Stack
											spacing={0.5}
											alignItems="flex-start"
											sx={{
												textAlign: "left",
												borderRadius: 2,
                        backgroundColor: "white",
                        border: "1px solid",
                        borderColor: "text.primary",
												px: 2,
                        py: 1,
                        height: "100%",
											}}
										>
											<Typography variant="body2" fontWeight="bold" color="text.secondary">
												{character.name}
											</Typography>
											<Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
												{character.club || ""}
											</Typography>
										</Stack>
									</Grid>
								))}
							</Grid>
						</Stack>

						<Suspense fallback={<Skeleton variant="rectangular" height={40} width="100%" />}>
							<Socmed entry={entry} />
						</Suspense>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
}
