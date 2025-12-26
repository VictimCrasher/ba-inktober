"use client";

import { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useDebounce } from "@/src/hooks/useDebounce";

interface SearchBarProps {
	search: string;
	setSearch: (search: string) => void;
}

export default function SearchBar({ search, setSearch }: SearchBarProps) {
	const [searchText, setSearchText] = useState<string>(search);

	// debounce search
	const debouncedSearchText = useDebounce(searchText, 500);

	// Sync searchText with search prop (from URL params)
	useEffect(() => {
		setSearchText(search);
	}, [search]);

  useEffect(() => {
    setSearch(debouncedSearchText);
    // eslint-disable-next-line
  }, [debouncedSearchText]);

	return (
		<TextField
			placeholder="Search by title or character name"
			variant="outlined"
			value={searchText}
			onChange={(e) => setSearchText(e.target.value)}
			size="small"
			fullWidth
			slotProps={{
				input: {
					startAdornment: (
						<InputAdornment position="start">
							<MagnifyingGlassIcon />
						</InputAdornment>
					),
				},
			}}
			sx={{ backgroundColor: "white" }}
		/>
	);
}
