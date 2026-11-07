@echo off
setlocal EnableExtensions EnableDelayedExpansion

rem Builds two sizes from public\entries\*.webp.
rem   thumbnail\  featured card, 1600px, quality 85
rem   list\       grid and calendar, 640px, quality 70
rem One file:
rem   magick "public\entries\2026-10-09.webp" -auto-orient -resize "640x640>" -strip -quality 70 "public\entries\list\2026-10-09.webp"
rem The ">" keeps aspect ratio and only shrinks. Quote it, or cmd treats it as a redirect.
rem -strip drops the color profile and EXIF so the result is a plain WebP.

set "SRC=%~dp0public\entries"
set "DEST=%~dp0public\entries\thumbnail"
set "LIST=%~dp0public\entries\list"

where magick >nul 2>&1
if errorlevel 1 (
	echo magick was not found. Install ImageMagick and make sure it is on PATH.
	exit /b 1
)

if not exist "%DEST%" mkdir "%DEST%"
if not exist "%LIST%" mkdir "%LIST%"

set /a CONVERTED=0
set /a SKIPPED=0

for %%F in ("%SRC%\*.webp") do (
	call :convert "%%F" "%DEST%\%%~nxF" "1600x1600>" 85
	if errorlevel 1 exit /b 1
	call :convert "%%F" "%LIST%\%%~nxF" "640x640>" 70
	if errorlevel 1 exit /b 1
)

echo.
echo Converted !CONVERTED! thumbnail^(s^). Skipped !SKIPPED! already up to date.
echo Output: public\entries\thumbnail and public\entries\list
endlocal
exit /b 0

:convert
set "RUN=1"
if exist "%~2" (
	xcopy /D /L /Y "%~1" "%~2" | findstr /C:"1 File" >nul
	if errorlevel 1 set "RUN="
)
if defined RUN (
	echo Converting %~nx1 -^> %~2
	magick "%~1" -auto-orient -resize "%~3" -strip -quality %~4 "%~2"
	if errorlevel 1 (
		echo Failed: %~nx1
		exit /b 1
	)
	set /a CONVERTED+=1
) else (
	echo Up to date %~nx2
	set /a SKIPPED+=1
)
exit /b 0
