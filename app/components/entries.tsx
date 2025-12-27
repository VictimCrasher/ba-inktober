"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container, Stack, Grid, ToggleButtonGroup, ToggleButton, Typography, Pagination } from "@mui/material";
import { ITEM_PER_PAGE, YEAR_OPTIONS } from "./constants";
import { entries } from "@/lib/entries";
import SearchBar from "./searchBar";
import EntryCard from "@/src/components/entryCard";
import { Entry } from "@/lib/types";
import { SmileyXEyesIcon } from "@phosphor-icons/react";

export default function Entries() {
	const router = useRouter();
	const searchParams = useSearchParams();

	// Initialize state from URL params
	const [page, setPage] = useState<number>(() => {
		const pageParam = searchParams.get("page");
		return pageParam ? parseInt(pageParam, 10) : 1;
	});
	const [search, setSearch] = useState<string>(() => searchParams.get("search") || "");
	const [year, setYear] = useState<string>(() => searchParams.get("year") || "");

	// Sync state with URL params
	useEffect(() => {
		const params = new URLSearchParams();

		if (page > 1) {
			params.set("page", page.toString());
		}
		if (search) {
			params.set("search", search);
		}
		if (year) {
			params.set("year", year);
		}

		const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
		router.replace(newUrl, { scroll: false });
	}, [page, search, year, router]);

	// Filter entries based on search, year, schools, and clubs
	const filteredEntries: Entry[] = useMemo(() => {
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
	}, [search, year]);

	const paginatedEntries: Entry[] = useMemo(() => {
		return filteredEntries.slice((page - 1) * ITEM_PER_PAGE, page * ITEM_PER_PAGE);
	}, [filteredEntries, page]);

	useEffect(() => {
		// eslint-disable-next-line
		setPage(1);
	}, [search, year]);

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
						<Grid size={{ xs: 12, md: 8 }} sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
							<ToggleButtonGroup
								value={year}
								exclusive
								onChange={(e, value) => setYear(value)}
								aria-label="Year"
								size="small"
							>
								{YEAR_OPTIONS.map((option) => (
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
					<Grid container spacing={2}>
						{paginatedEntries.length === 0 ? (
							<Grid size={12}>
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
							</Grid>
						) : (
							paginatedEntries.map((entry) => (
								<Grid
									size={{ xs: 6, lg: 4 }}
									key={entry.date}
									sx={{ height: { xs: "300px", md: "500px" }, position: "relative" }}
								>
									<EntryCard entry={entry} />
								</Grid>
							))
						)}
					</Grid>

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
						<Pagination
							count={Math.ceil(filteredEntries.length / ITEM_PER_PAGE)}
							page={page}
							onChange={(_, value) => setPage(value)}
							size="small"
						/>
					</Stack>
				</Stack>
			</Container>
		</>
	);
}
