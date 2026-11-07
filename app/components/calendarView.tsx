import { EntryListItem } from "@/lib/types";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type CalendarDay = {
	day: number;
	entry?: EntryListItem;
};

interface CalendarViewProps {
	entries: EntryListItem[];
	years: string[];
}

function buildOctober(year: string, entriesByDate: Map<string, EntryListItem>): (CalendarDay | null)[][] {
	const firstWeekday = new Date(Number(year), 9, 1).getDay();
	const days: (CalendarDay | null)[] = [
		...Array.from({ length: firstWeekday }, () => null),
		...Array.from({ length: 31 }, (_, index) => {
			const day = index + 1;
			const date = `${year}-10-${String(day).padStart(2, "0")}`;
			return { day, entry: entriesByDate.get(date) };
		}),
	];

	while (days.length % 7 !== 0) days.push(null);

	return Array.from({ length: days.length / 7 }, (_, week) => days.slice(week * 7, week * 7 + 7));
}

function CalendarCell({ year, cell }: { year: string; cell: CalendarDay | null }) {
	if (!cell) {
		return <Box sx={{ bgcolor: "background.default", minWidth: 0 }} />;
	}

	const dayLabel = String(cell.day).padStart(2, "0");
	const content = (
		<>
			<Typography
				variant="caption"
				fontWeight="bold"
				sx={{
					position: "relative",
					zIndex: 1,
					alignSelf: "flex-start",
					px: 0.75,
					py: 0.25,
					borderRadius: 2,
					bgcolor: cell.entry ? "white" : "transparent",
					color: "text.primary",
					lineHeight: 1.4,
				}}
			>
				{cell.day}
			</Typography>
			{cell.entry && (
				<Typography
					variant="caption"
					fontWeight="bold"
					noWrap
					sx={{
						position: "relative",
						zIndex: 1,
						display: { xs: "none", md: "block" },
						color: "white",
						width: "100%",
					}}
				>
					{cell.entry.title}
				</Typography>
			)}
		</>
	);

	const cellStyles = {
		position: "relative",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		minWidth: 0,
		height: { xs: 72, sm: 104, md: 132 },
		p: 0.75,
		overflow: "hidden",
		color: "inherit",
		textDecoration: "none",
		bgcolor: cell.entry ? "grey.900" : "white",
	};

	if (!cell.entry) {
		return <Box sx={cellStyles}>{content}</Box>;
	}

	const [, , day] = cell.entry.date.split("-");

	return (
		<Box component={Link} href={`/${year}/${day}`} aria-label={`Day ${dayLabel} (${year}) ${cell.entry.title}`} sx={cellStyles}>
			<Image src={cell.entry.thumbnail} alt="" fill style={{ objectFit: "cover" }} />
			<Box
				sx={{
					position: "absolute",
					inset: 0,
					background: "linear-gradient(to top, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.05) 55%)",
				}}
			/>
			{content}
		</Box>
	);
}

export default function CalendarView({ entries, years }: CalendarViewProps) {
	const entriesByDate = new Map(entries.map((entry) => [entry.date, entry]));

	return (
		<Stack spacing={4}>
			{years.map((year) => {
				const weeks = buildOctober(year, entriesByDate);

				return (
					<Stack key={year} spacing={1.5}>
						<Typography variant="h5" fontWeight="800">
							October {year}
						</Typography>
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
								gap: "1px",
								border: "2px solid",
								borderColor: "text.primary",
								borderRadius: 2,
								overflow: "hidden",
								bgcolor: "text.primary",
							}}
						>
							{WEEKDAYS.map((weekday) => (
								<Typography
									key={weekday}
									variant="caption"
									fontWeight="bold"
									color="text.secondary"
									sx={{ px: 0.5, py: 1, textAlign: "center", bgcolor: "background.default" }}
								>
									<Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
										{weekday}
									</Box>
									<Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
										{weekday.slice(0, 1)}
									</Box>
								</Typography>
							))}
							{weeks.flat().map((cell, index) => (
								<CalendarCell key={`${year}-${index}`} year={year} cell={cell} />
							))}
						</Box>
					</Stack>
				);
			})}
		</Stack>
	);
}
