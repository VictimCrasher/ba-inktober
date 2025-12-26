"use client";

import { useState, useMemo } from "react";
import {
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Checkbox,
	ListItemText,
	Box,
	Stack,
	Typography,
	IconButton,
	Menu,
} from "@mui/material";
import { XCircleIcon, CheckIcon, FunnelIcon } from "@phosphor-icons/react";
import { schools, clubsBySchool } from "@/lib/entries";

interface FiltersProps {
	selectedSchools: string[];
	selectedClubs: string[];
	onApply: (schools: string[], clubs: string[]) => void;
}

export default function Filters({ selectedSchools, selectedClubs, onApply }: FiltersProps) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [tempSelectedSchools, setTempSelectedSchools] = useState<string[]>(selectedSchools);
	const [tempSelectedClubs, setTempSelectedClubs] = useState<string[]>(selectedClubs);

	// Get available clubs based on selected schools
	const availableClubs = useMemo(() => {
		if (tempSelectedSchools.length === 0) {
			// If no schools selected, show all clubs from all schools
			const allClubs = new Set<string>();
			Object.values(clubsBySchool).forEach((clubs) => {
				clubs.forEach((club) => allClubs.add(club));
			});
			return Array.from(allClubs).sort();
		}
		// Show clubs only from selected schools
		const clubs = new Set<string>();
		tempSelectedSchools.forEach((school) => {
			(clubsBySchool[school] || []).forEach((club) => clubs.add(club));
		});
		return Array.from(clubs).sort();
	}, [tempSelectedSchools]);

	const handleApply = () => {
		onApply(tempSelectedSchools, tempSelectedClubs);
	};

	const handleReset = () => {
		setTempSelectedSchools([]);
		setTempSelectedClubs([]);
		onApply([], []);
	};

	const hasChanges =
		JSON.stringify(tempSelectedSchools.sort()) !== JSON.stringify(selectedSchools.sort()) ||
		JSON.stringify(tempSelectedClubs.sort()) !== JSON.stringify(selectedClubs.sort());

	return (
		<>
			<Button
				id="filters-button"
				variant="contained"
				disableElevation
				onClick={(event) => setAnchorEl(event.currentTarget)}
				startIcon={<FunnelIcon size={16} />}
				size="small"
			>
				Filters
			</Button>

			<Menu id="filters-menu" open={open} onClose={() => setAnchorEl(null)} anchorEl={anchorEl}>
				<Stack spacing={2}>
					<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
						<Typography variant="h6" fontWeight={600}>
							Filters
						</Typography>
						{(tempSelectedSchools.length > 0 || tempSelectedClubs.length > 0) && (
							<IconButton size="small" onClick={handleReset} aria-label="Reset filters">
								<XCircleIcon size={24} />
							</IconButton>
						)}
					</Box>

					<Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ width: "100%" }}>
						<FormControl fullWidth size="small">
							<InputLabel id="school-filter-label">Schools</InputLabel>
							<Select
								labelId="school-filter-label"
								id="school-filter"
								multiple
								value={tempSelectedSchools}
								size="small"
								onChange={(e) => {
									const value =
										typeof e.target.value === "string" ? [e.target.value] : e.target.value;
									// Handle select all / deselect all
									if (value.includes("__select_all__")) {
										if (tempSelectedSchools.length === schools.length) {
											setTempSelectedSchools([]);
											setTempSelectedClubs([]);
										} else {
											setTempSelectedSchools([...schools]);
										}
										return;
									}
									// Remove clubs that only belong to deselected schools
									const removedSchools = tempSelectedSchools.filter((s) => !value.includes(s));
									if (removedSchools.length > 0) {
										const remainingClubs = new Set<string>();
										value.forEach((school: string) => {
											(clubsBySchool[school] || []).forEach((club) => remainingClubs.add(club));
										});
										setTempSelectedClubs((prevClubs) =>
											prevClubs.filter((club) => remainingClubs.has(club))
										);
									}
									setTempSelectedSchools(value);
								}}
								renderValue={(selected) => {
									if (selected.length === 0) return "All Schools";
									if (selected.length === schools.length) return "All Schools";
									if (selected.length === 1) return selected[0];
									return `${selected.length} schools selected`;
								}}
								label="Schools"
								sx={{ backgroundColor: "white" }}
							>
								<MenuItem value="__select_all__">
									<Checkbox
										size="small"
										checked={tempSelectedSchools.length === schools.length}
										indeterminate={
											tempSelectedSchools.length > 0 &&
											tempSelectedSchools.length < schools.length
										}
									/>
									<ListItemText primary="Select All" />
								</MenuItem>
								{schools.map((school) => (
									<MenuItem key={school} value={school}>
										<Checkbox size="small" checked={tempSelectedSchools.indexOf(school) > -1} />
										<ListItemText primary={school} />
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormControl fullWidth size="small">
							<InputLabel id="club-filter-label">Clubs</InputLabel>
							<Select
								labelId="club-filter-label"
								id="club-filter"
								multiple
								value={tempSelectedClubs}
								size="small"
								onChange={(e) => {
									const value =
										typeof e.target.value === "string" ? [e.target.value] : e.target.value;
									// Handle select all / deselect all
									if (value.includes("__select_all__")) {
										if (tempSelectedClubs.length === availableClubs.length) {
											setTempSelectedClubs([]);
										} else {
											setTempSelectedClubs([...availableClubs]);
										}
										return;
									}
									setTempSelectedClubs(value);
								}}
								renderValue={(selected) => {
									if (selected.length === 0) return "All Clubs";
									if (selected.length === availableClubs.length) return "All Clubs";
									if (selected.length === 1) return selected[0];
									return `${selected.length} clubs selected`;
								}}
								label="Clubs"
								sx={{ backgroundColor: "white" }}
								disabled={availableClubs.length === 0}
							>
								{availableClubs.length > 0 && (
									<MenuItem value="__select_all__">
										<Checkbox
											checked={
												tempSelectedClubs.length === availableClubs.length &&
												availableClubs.length > 0
											}
											indeterminate={
												tempSelectedClubs.length > 0 &&
												tempSelectedClubs.length < availableClubs.length
											}
											size="small"
										/>
										<ListItemText primary="Select All" />
									</MenuItem>
								)}
								{availableClubs.map((club) => (
									<MenuItem key={club} value={club}>
										<Checkbox size="small" checked={tempSelectedClubs.indexOf(club) > -1} />
										<ListItemText primary={club} />
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Stack>

					<Button
						variant="contained"
						onClick={handleApply}
						disabled={!hasChanges}
						startIcon={<CheckIcon size={24} />}
						sx={{
							alignSelf: { xs: "stretch", md: "flex-end" },
							width: { xs: "100%", md: "auto" },
							minWidth: { md: "120px" },
						}}
					>
						Apply
					</Button>
				</Stack>
			</Menu>
		</>
	);
}
