"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container, Stack, Grid, ToggleButtonGroup, ToggleButton, Typography, Pagination } from "@mui/material";
import { ITEM_PER_PAGE, SORT_OPTIONS, VIEW_OPTIONS, type SortOrder, type ViewMode } from "./constants";
import SearchBar from "./searchBar";
import EntryCard from "@/src/components/entryCard";
import CalendarView from "./calendarView";
import { EntryListItem } from "@/lib/types";
import { SmileyXEyesIcon } from "@phosphor-icons/react";

export default function Entries({ entries }: { entries: EntryListItem[] }) {
	const router = useRouter();
	const searchParams = useSearchParams();

	// Initialize state from URL params
	const [page, setPage] = useState<number>(() => {
		const pageParam = searchParams.get("page");
		return pageParam ? parseInt(pageParam, 10) : 1;
	});
	const [search, setSearch] = useState<string>(() => searchParams.get("search") || "");
	const [year, setYear] = useState<string>(() => searchParams.get("year") || "");
	const [sort, setSort] = useState<SortOrder>(() =>
		searchParams.get("sort") === "newest" ? "newest" : "oldest"
	);
	const [view, setView] = useState<ViewMode>(() =>
		searchParams.get("view") === "calendar" ? "calendar" : "grid"
	);

	// Sync state with URL params
	useEffect(() => {
		const params = new URLSearchParams();

		if (view === "grid" && page > 1) {
			params.set("page", page.toString());
		}
		if (search) {
			params.set("search", search);
		}
		if (year) {
			params.set("year", year);
		}
		if (view === "grid") {
			params.set("sort", sort);
		}
		if (view === "calendar") {
			params.set("view", "calendar");
		}

		const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
		router.replace(newUrl, { scroll: false });
	}, [page, search, year, sort, view, router]);

	// Filter entries based on search, year, schools, and clubs
	const years = useMemo(
		() => [...new Set(entries.map((entry) => entry.date.slice(0, 4)))].sort(),
		[entries]
	);

	const filteredEntries: EntryListItem[] = useMemo(() => {
		return entries.filter((entry) => {
			// Search filter
			if (search) {
				const searchLower = search.toLowerCase();
				const matchesTitle = entry.title.toLowerCase().includes(searchLower);
				const matchesCharacters = entry.characters.some((char) =>
					char.name.toLowerCase().includes(searchLower)
				);
				const matchesSchool = entry.school?.toLowerCase().includes(searchLower);
				if (!matchesTitle && !matchesCharacters && !matchesSchool) return false;
			}

			// Year filter
			if (year) {
				const entryYear = entry.date.split("-")[0];
				if (entryYear !== year) return false;
			}

			return true;
		});
	}, [entries, search, year]);

	const sortedEntries: EntryListItem[] = useMemo(() => {
		const sorted = [...filteredEntries].sort((a, b) => a.date.localeCompare(b.date));
		if (sort === "newest") sorted.reverse();
		return sorted;
	}, [filteredEntries, sort]);

	const paginatedEntries: EntryListItem[] = useMemo(() => {
		return sortedEntries.slice((page - 1) * ITEM_PER_PAGE, page * ITEM_PER_PAGE);
	}, [sortedEntries, page]);

	const calendarYears = useMemo(() => {
		const availableYears = (year ? [year] : [...years]).sort();
		if (!search) return availableYears;
		return availableYears.filter((calendarYear) =>
			filteredEntries.some((entry) => entry.date.startsWith(`${calendarYear}-`))
		);
	}, [year, years, search, filteredEntries]);

	useEffect(() => {
		// eslint-disable-next-line
		setPage(1);
	}, [search, year, sort]);

	return (
		<>
			{/* Search and Filters */}
			<Stack
				direction="row"
				justifyContent="center"
				spacing={2}
				sx={{ borderBottom: "2px solid", borderColor: "text.primary", p: 2 }}
			>
				<Container maxWidth="lg">
					<Grid container spacing={2}>
						<Grid size={{ xs: 12, md: 4 }}>
							<SearchBar search={search} setSearch={setSearch} />
						</Grid>
						<Grid
							size={{ xs: 12, md: 8 }}
							sx={{ display: "flex", justifyContent: "flex-end", gap: 1, flexWrap: "wrap" }}
						>
							<ToggleButtonGroup
								value={view}
								exclusive
								onChange={(_, value: ViewMode | null) => {
									if (value) setView(value);
								}}
								aria-label="View"
								size="small"
							>
								{VIEW_OPTIONS.map((option) => (
									<ToggleButton key={option.value} value={option.value}>
										{option.label}
									</ToggleButton>
								))}
							</ToggleButtonGroup>
							{view === "grid" && (
								<ToggleButtonGroup
									value={sort}
									exclusive
									onChange={(_, value: SortOrder | null) => {
										if (value) setSort(value);
									}}
									aria-label="Sort"
									size="small"
								>
									{SORT_OPTIONS.map((option) => (
										<ToggleButton key={option.value} value={option.value}>
											{option.label}
										</ToggleButton>
									))}
								</ToggleButtonGroup>
							)}
							<ToggleButtonGroup
								value={year}
								exclusive
								onChange={(e, value) => setYear(value)}
								aria-label="Year"
								size="small"
							>
								{[{ label: "All Years", value: "" }, ...years.map((option) => ({ label: option, value: option }))].map(
									(option) => (
									<ToggleButton key={option.value} value={option.value}>
										{option.label}
									</ToggleButton>
								))}
							</ToggleButtonGroup>
						</Grid>
					</Grid>
				</Container>
			</Stack>

			{/* Entries Grid */}
			<Container maxWidth="lg" sx={{ py: 2 }}>
				<Stack spacing={2} useFlexGap>
					{filteredEntries.length === 0 ? (
						<Stack
							spacing={1}
							useFlexGap
							justifyContent="center"
							alignItems="center"
							sx={{ my: 2, minHeight: "300px" }}
						>
							<SmileyXEyesIcon size={48} color="text.primary" />
							<Typography variant="body2" color="text.primary" sx={{ textAlign: "center" }}>
								No entries found
							</Typography>
						</Stack>
					) : view === "calendar" ? (
						<CalendarView entries={filteredEntries} years={calendarYears} />
					) : (
						<Grid container spacing={2}>
							{paginatedEntries.map((entry) => (
								<Grid
									size={{ xs: 6, lg: 4 }}
									key={entry.date}
									sx={{ height: { xs: "300px", md: "500px" }, position: "relative" }}
								>
									<EntryCard entry={entry} />
								</Grid>
							))}
						</Grid>
					)}

					<Stack
						justifyContent="space-between"
						alignItems="center"
						spacing={2}
						useFlexGap
						sx={{ flexDirection: { xs: "column", md: "row" }, pt: 2 }}
					>
						<Typography variant="body2" color="text.secondary">
							Showing {filteredEntries.length} of {entries.length} entries
						</Typography>
						{view === "grid" && (
							<Pagination
								count={Math.ceil(filteredEntries.length / ITEM_PER_PAGE)}
								page={page}
								onChange={(_, value) => setPage(value)}
								size="small"
							/>
						)}
					</Stack>
				</Stack>
			</Container>
		</>
	);
}
