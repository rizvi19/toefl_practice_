@echo off
setlocal
cd /d "%~dp0"
if not defined KOKORO_PYTHON if exist "D:\LocalTTS\venv\Scripts\python.exe" set "KOKORO_PYTHON=D:\LocalTTS\venv\Scripts\python.exe"
if not defined KOKORO_PYTHON set /p "KOKORO_PYTHON=Path to python.exe in your existing Kokoro environment: "
if not defined KOKORO_HOME if exist "D:\LocalTTS\models\kokoro\config.json" set "KOKORO_HOME=D:\LocalTTS"
if not defined KOKORO_HOME set /p "KOKORO_HOME=Folder containing config.json, kokoro-v1_0.pth and voices folder: "
if not defined FFMPEG_EXE if exist "%LOCALAPPDATA%\Programs\Stremio\ffmpeg.exe" set "FFMPEG_EXE=%LOCALAPPDATA%\Programs\Stremio\ffmpeg.exe"
if not defined FFMPEG_EXE for %%F in (ffmpeg.exe) do if not "%%~$PATH:F"=="" set "FFMPEG_EXE=%%~$PATH:F"
if not defined FFMPEG_EXE set /p "FFMPEG_EXE=Path to your existing ffmpeg.exe: "
echo Keep this window running. Open https://rizvi19.github.io/toefl_practice_/
echo Choose Settings then Kokoro (local helper), and Check connection.
"%KOKORO_PYTHON%" "tools\kokoro-local.py" --serve --allow-generation --kokoro-home "%KOKORO_HOME%" --ffmpeg "%FFMPEG_EXE%"
pause
