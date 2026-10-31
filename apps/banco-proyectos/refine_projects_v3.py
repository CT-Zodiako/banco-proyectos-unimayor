
import re
import json
import os

def clean_text(text):
    if not text: return ""
    text = text.replace('Ñ', '')
    repls = {
        'ǭ': 'á', 'Ǹ': 'é', 'ǻ': 'ó', 'Ǽ': 'í', 'Ǯ': 'ú', 'Ǳ': 'ñ', 'ǲ': 'ü',
        'ǳ': 'Á', 'Ǵ': 'É', 'Ǹ': 'Í', 'Ǽ': 'Ó', 'Ǯ': 'Ú', 'Ǳ': 'Ñ',
        '&gt;': '>', '&lt;': '<', '&amp;': '&', '': 'ó', '': 'í'
    }
    for k, v in repls.items():
        text = text.replace(k, v)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def extract_section(lines, keywords, end_keywords):
    result = []
    found = False
    for line in lines:
        line_up = line.upper()
        if not found:
            if any(k.upper() in line_up for k in keywords):
                found = True
                for k in keywords:
                    if k.upper() in line_up and ":" in line:
                        after = line.split(":", 1)[1].strip()
                        if after: result.append(after)
                continue
        else:
            # Check if we hit an end keyword or the start of a next project
            if any(ek.upper() in line_up for ek in end_keywords) or re.match(r'Proyecto \d+:', line, re.I):
                break
            result.append(line)
    return result

def parse_docx_xml(xml_path):
    with open(xml_path, 'r', encoding='utf-8', errors='ignore') as f:
        xml_content = f.read()

    # Extract all text from paragraphs
    # Join the text parts within a paragraph
    paragraphs = re.findall(r'<w:p[^>]*>(.*?)</w:p>', xml_content, re.DOTALL)
    all_lines = []
    for p in paragraphs:
        t_parts = re.findall(r'<w:t[^>]*>(.*?)</w:t>', p)
        t = "".join(t_parts)
        if t.strip():
            all_lines.append(clean_text(t))

    # Split into project blocks
    project_blocks = []
    current_block = []
    
    for line in all_lines:
        # Relaxed check for project start
        if re.search(r'Proyecto \d+:', line, re.I):
            if current_block:
                project_blocks.append(current_block)
            current_block = [line]
        else:
            if current_block:
                current_block.append(line)
    if current_block:
        project_blocks.append(current_block)

    emoji_map = {
        "1": "🌾", "2": "🏢", "3": "☁️", "4": "🌿", "5": "♻️",
        "6": "🏭", "7": "🏙️", "8": "🏥", "9": "🛡️", "10": "🚨",
        "11": "🔑", "12": "🍯", "13": "⚡", "14": "🚗", "15": "🌬️",
        "16": "💊", "17": "🌱", "18": "🅿️", "19": "⛑️", "20": "📊",
        "21": "🧠", "22": "🧠", "23": "🧘", "24": "⚡", "25": "💻",
        "26": "🧠", "27": "😴", "28": "📚", "29": "🐟", "30": "🐠",
        "31": "🎓", "32": "📋", "33": "🐄", "34": "🥛", "35": "❄️",
        "36": "📦", "37": "🐝", "38": "🐾", "39": "⛏️", "40": "📳",
        "41": "🔬", "42": "🔭", "43": "🧬", "44": "🤖", "45": "📡",
        "46": "🕹️", "47": "🎮", "48": "🚀"
    }

    headers = ["SECTOR", "ÁREA TECNOLÓGICA", "COMPLEJIDAD", "PROBLEMÁTICA", "RESUMEN BREVE", "DESCRIPCIÓN", "OBJETIVO GENERAL", "OBJETIVO", "OBJETIVOS ESPECÍFICOS", "HARDWARE NECESARIO", "SOFTWARE Y TECNOLOGÍAS", "HABILIDADES DESARROLLADAS", "APLICACIONES", "PROTOCOLOS", "SEÑALES"]

    final_data = []
    for block in project_blocks:
        first_line = block[0]
        match = re.search(r'Proyecto (\d+):\s*(.*)', first_line, re.I)
        if not match: continue
        
        pid = match.group(1)
        title = match.group(2).strip()
        if not title and len(block) > 1:
            title = block[1] # Sometimes title is on next line
        
        # Metadata
        sector = " ".join(extract_section(block, ["Sector"], ["Área", "Complejidad", "Problemática"]))
        area = " ".join(extract_section(block, ["Área Tecn"], ["Complejidad", "Problemática", "Sector"]))
        nivel = " ".join(extract_section(block, ["Complejidad"], ["Problemática", "Sector", "Área"]))
        
        # Narrative
        prob = " ".join(extract_section(block, ["Problemática"], ["Resumen Breve", "Descripción", "Objetivo", "Sector"]))
        desc = " ".join(extract_section(block, ["Resumen Breve", "Descripción"], ["Objetivo", "Hardware", "Software", "Habilidades", "Aplicaciones"]))
        
        # Hardware/Software
        hw = extract_section(block, ["Hardware Necesario"], headers[headers.index("HARDWARE NECESARIO")+1:] + ["Proyecto"])
        sw = extract_section(block, ["Software y Tecn"], headers[headers.index("SOFTWARE Y TECNOLOGÍAS")+1:] + ["Proyecto"])
        skills = extract_section(block, ["Habilidades"], ["Proyecto"] + headers)

        # Objectives
        obj_gen = " ".join(extract_section(block, ["Objetivo General", "Objetivo"], ["Objetivos Específicos", "Descripción", "Hardware"]))
        obj_spec_raw = extract_section(block, ["Objetivos Específicos"], ["Descripción", "Hardware", "Software"])
        
        # Post-process Objectives
        objs_list = []
        if obj_gen:
            objs_list.append(f"🎯 Objetivo General: {obj_gen.strip()}")
        if obj_spec_raw:
            objs_list.append("📌 Objetivos Específicos:")
            for s in obj_spec_raw:
                s = re.sub(r'^\d+[\.\)]\s*', '', s).strip()
                if s and len(s) > 5:
                    objs_list.append(f"• {s}")

        emoji = emoji_map.get(pid, "🚀")
        narrative = f"Problema: {prob.strip()}\n\nDescripción: {desc.strip()}"

        final_data.append({
            "id": f"proj_{pid.zfill(3)}",
            "titulo": f"{emoji} Proyecto {pid}: {title}",
            "descripcion": narrative,
            "area": area if area else "SBC-IoT",
            "sector": sector,
            "nivel": nivel if nivel else "Intermedio",
            "duracion": "Un semestre",
            "presupuesto": "Bajo costo",
            "hardware": [h.strip("•- ") for h in hw if len(h.strip()) > 2][:12],
            "software": [s.strip("•- ") for s in sw if len(s.strip()) > 2][:10],
            "habilidades": [sk.strip("•- ") for sk in skills if len(sk.strip()) > 2][:8],
            "objetivos": objs_list if objs_list else ["Desarrollar prototipo funcional"],
            "pasos": ["Análisis", "Diseño", "Desarrollo", "Pruebas"],
            "aplicaciones": [sector] if sector else [],
            "referencias": []
        })

    return final_data

if __name__ == "__main__":
    xml_path = "temp_docx_extract_4/word/document.xml"
    data = parse_docx_xml(xml_path)
    if data:
        with open("src/data/mockProjects.js", "w", encoding="utf-8") as f:
            f.write("export const mockProjects = " + json.dumps(data, indent=4, ensure_ascii=False) + ";")
        print(f"Éxito: {len(data)} proyectos procesados.")
    else:
        print("Error: No se encontraron proyectos.")
