"use client";

import { entries } from "@/lib/entries";
import { Stack, Button, Link as MuiLink } from "@mui/material";
import Link from "next/link";
import { useMemo } from "react";

export default function HeaderActions() {
	const onClickViewAllEntries = () => {
		// auto scroll to the entries section
		const entriesSection = document.getElementById("entries");
		if (entriesSection) {
			entriesSection.scrollIntoView({ behavior: "smooth" });
		}
	};

	const randomEntry = useMemo(() => {
		// eslint-disable-next-line react-hooks/purity
		const randomEntry = entries[Math.floor(Math.random() * entries.length)];
		const [year, , day] = randomEntry.date.split("-");
		return `/${year}/${day}`;
	}, []);

	return (
		<Stack direction="row" spacing={2} sx={{ justifyContent: { xs: "center", md: "flex-start" } }}>
			<Button size="large" variant="contained" color="primary" onClick={onClickViewAllEntries}>
				View All Entries
			</Button>
			<MuiLink key={randomEntry} component={Link} href={randomEntry} passHref>
				<Button size="large" variant="outlined" color="primary">
					Random Entry
				</Button>
			</MuiLink>
		</Stack>
	);
}
