import { Box, Container, Stack, Typography } from "@mui/material";
import { headerLabels, headerDescription } from "@/lib/header";
import HeaderActions from "./components/headerActions";
import Featured from "./components/featured";
import Entries from "./components/entries";

export default function Home() {
	return (
		<Box className="flex flex-col min-h-screen" sx={{ backgroundColor: "background.default" }}>
			<Container
				component="section"
				role="main"
				maxWidth="lg"
				sx={{
					my: 4,
					display: "flex",
					alignItems: "center",
					flexDirection: { xs: "column", md: "row" },
					"& > *": { width: { xs: "100%", md: "50%" } },
					gap: { xs: 4, md: 2 },
				}}
			>
				<Stack direction="column" spacing={4} useFlexGap>
					<Stack spacing={0}>
						{headerLabels.map((label, index) => {
							const isLast = index === headerLabels.length - 1;
							return (
								<Typography
									variant={isLast ? "h2" : "h3"}
									fontWeight="800"
									className={isLast ? "border-b-4 border-primary-main w-fit" : "w-fit"}
									color={isLast ? "primary.main" : "text.primary"}
									key={label}
								>
									{label}
								</Typography>
							);
						})}
					</Stack>
					<Typography
						variant="h6"
						fontWeight="600"
						color="text.primary"
						sx={{ borderLeft: "4px solid", borderColor: "primary.main", pl: 2 }}
					>
						{headerDescription}
					</Typography>
					<HeaderActions />
				</Stack>
				<Box>
					<Featured />
				</Box>
			</Container>
			<section id="entries" style={{ scrollMarginTop: "64px" }}>
				<Entries />
			</section>
		</Box>
	);
}
