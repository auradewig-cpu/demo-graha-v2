@echo off
setlocal enabledelayedexpansion

for %%F in (*.webp) do (

    set "fullname=%%~nF"

    :: ambil bagian sebelum .webp_
    for /f "tokens=1 delims=|" %%A in ("!fullname:.webp_=|!") do (
        set "cleanname=%%A.webp"
    )

    echo Renaming:
    echo %%F
    echo to
    echo !cleanname!

    ren "%%F" "!cleanname!"
)

echo.
echo ==========================
echo DONE!
echo ==========================
pause