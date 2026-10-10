@echo off
setlocal EnableExtensions EnableDelayedExpansion

rem Builds public\entries\thumbnail\*.webp from public\entries\*.webp.
rem One file:
rem   magick "public\entries\2026-10-09.webp" -auto-orient -resize "1600x1600>" -strip -quality 85 "public\entries\thumbnail\2026-10-09.webp"
rem The ">" keeps aspect ratio and only shrinks. Quote it, or cmd treats it as a redirect.
rem -strip drops the color profile and EXIF so the result is a plain WebP.

set "SRC=%~dp0public\entries"
set "DEST=%~dp0public\entries\thumbnail"

where magick >nul 2>&1
if errorlevel 1 (
	echo magick was not found. Install ImageMagick and make sure it is on PATH.
	exit /b 1
)

if not exist "%DEST%" mkdir "%DEST%"

set /a CONVERTED=0
set /a SKIPPED=0

for %%F in ("%SRC%\*.webp") do (
	set "OUT=%DEST%\%%~nxF"
	set "RUN=1"
	if exist "!OUT!" (
		xcopy /D /L /Y "%%F" "!OUT!" | findstr /C:"1 File" >nul
		if errorlevel 1 set "RUN="
	)
	if defined RUN (
		echo Converting %%~nxF
		magick "%%F" -auto-orient -resize "1600x1600>" -strip -quality 85 "!OUT!"
		if errorlevel 1 (
			echo Failed: %%~nxF
			exit /b 1
		)
		set /a CONVERTED+=1
	) else (
		echo Up to date %%~nxF
		set /a SKIPPED+=1
	)
)

echo.
echo Converted !CONVERTED! thumbnail^(s^). Skipped !SKIPPED! already up to date.
echo Output: public\entries\thumbnail
endlocal
