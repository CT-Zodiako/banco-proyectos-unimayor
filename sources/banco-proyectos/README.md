# Project bank source material

Original documents and one-off extraction outputs used to build the first project catalog. Nothing in the apps reads
these files; the live data is in `apps/banco-proyectos/src/data/`.

| File | What it is |
|---|---|
| `100_Proyectos_IoT_Ampliado-FINAL.pdf` | Final document of the 100 IoT projects |
| `100_Proyectos_IoT_Hardware_Software.docx` / `.pdf` | 100 projects with hardware and software tables |
| `50_Proyectos_IoT_Completo_Final.pdf`, `40_Proyectos_IoT_Completo_Detallado.docx` | Earlier versions (50 and 40 projects) |
| `raw_pdf_text.txt`, `100_projects_raw.txt` | Text extracted from the PDFs |
| `extracted_100_tables.json`, `extracted_41_50.json` | Tables extracted from the documents |
| `refine_projects_v3.py` | Historical one-off script that generated `src/data/mockProjects.js` from a DOCX extraction |
| `diseño.jpg` | Original design reference image |

`refine_projects_v3.py` is kept for reference only. It overwrites `src/data/mockProjects.js`, which has been edited
since, so do not run it against the app.
