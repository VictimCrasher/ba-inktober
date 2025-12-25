"use client";

import { AppBar, Drawer, IconButton, Button, Toolbar, Typography, Fade, Stack, Container } from "@mui/material";
import { ListIcon, XCircleIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { header } from "@/lib/header";
import { useMediaQuery } from "@mui/material";
import theme from "@/src/theme";

export default function Header() {
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
	const [isOpen, setIsOpen] = useState(false);

	const renderDesktopMenu = () => (
		<Stack direction="row" spacing={1}>
			{header.map((item) => (
				<Link href={item.href} key={item.href}>
					<Button color="inherit" sx={{ textTransform: "none", fontWeight: "600" }}>
						{item.label}
					</Button>
				</Link>
			))}
		</Stack>
	);

	const renderMobileMenu = () => (
		<>
			<IconButton onClick={() => setIsOpen(true)}>
				<ListIcon size={24} />
			</IconButton>
			<Drawer
				id="mobile-menu"
				anchor="bottom"
				open={isOpen}
				slots={{ transition: Fade }}
				onClose={() => setIsOpen(false)}
				sx={{
					"& > .MuiDrawer-paper": {
						position: "relative",
						display: "flex",
						justifyContent: "center",
						height: "100vh",
					},
				}}
			>
				<IconButton
					className="close-button"
					onClick={() => setIsOpen(false)}
					sx={{ position: "absolute", top: 16, right: 16 }}
				>
					<XCircleIcon size={32} />
				</IconButton>
				<Stack direction="column" spacing={2} sx={{ p: 3 }}>
					{header.map((item) => (
						<Typography key={item.href} variant="h6" fontWeight="bold" onClick={() => setIsOpen(false)}>
							{item.label}
						</Typography>
					))}
				</Stack>
			</Drawer>
		</>
	);

	return (
		<AppBar
			position="sticky"
			className="border-b-2 border-gray-600"
			sx={{ backgroundColor: "white", color: "text.primary", boxShadow: "none" }}
		>
			<Toolbar>
				<Container maxWidth="lg">
					<Stack direction="row" justifyContent="space-between" alignItems="center">
						<Link href="/">
							<Typography variant="h6" fontWeight="bold" color="primary.main">
								Inktober Archive
							</Typography>
						</Link>
						{isDesktop ? renderDesktopMenu() : renderMobileMenu()}
					</Stack>
				</Container>
			</Toolbar>
		</AppBar>
	);
}
