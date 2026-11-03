const GUIDES = {
    event: [
        'Consulte la convocatoria oficial y confirme que el evento acepte la modalidad de participación que busca.',
        'Verifique fechas, sede, costos y condiciones de participación en la fuente oficial.',
        'Si va a presentar, revise los temas aceptados y prepare el resumen o la propuesta según las instrucciones.',
        'Confirme con sus coautores la autoría y revise el formato y los archivos solicitados.',
        'Envíe la propuesta por el canal oficial y conserve el comprobante o la confirmación.',
        'Consulte la respuesta y prepare la presentación si su propuesta es aceptada.',
    ],
    journal: [
        'Lea el alcance de la revista y confirme que su trabajo y tipo de artículo sean pertinentes.',
        'Consulte las instrucciones para autores y confirme los costos, el idioma y las fechas en la fuente oficial.',
        'Acuerde la autoría y prepare el manuscrito y las referencias según las indicaciones de la revista.',
        'Revise las declaraciones y los archivos complementarios que solicite la revista.',
        'Envíe el manuscrito por el canal oficial y conserve el comprobante.',
        'Dé seguimiento a la revisión y responda a las observaciones editoriales.',
    ],
};

export function submissionGuide(type) {
    return GUIDES[type] ? [...GUIDES[type]] : [];
}
