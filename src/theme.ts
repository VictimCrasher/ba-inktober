"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	typography: {
		fontFamily: "var(--font-plus-jakarta-sans)",
	},
	palette: {
		primary: {
			light: "#93cbf3",
			main: "#288adb",
			dark: "#0d4b98",
			contrastText: "#fff",
		},
		secondary: {
			light: "#efad45",
			main: "#db7928",
			dark: "#cf6324",
			contrastText: "#000",
		},
		text: {
			primary: "#181411",
			secondary: "#666666",
			disabled: "#999999",
		},
		background: {
			default: "#F8F7F5",
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
				},
				outlined: {
					borderWidth: "2px",
				},
			},
		},
		MuiToggleButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
				},
			},
		},
	},
});

export default theme;
