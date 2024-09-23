import React from 'react';
import Button from '@mui/material/Button';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "../../assets/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew Bold.ttf',
    italics: 'THSarabunNew Italic.ttf',
    bolditalics: 'THSarabunNew BoldItalic.ttf'
  }
}

export default function ClubPDF(props) {

    const { data, teacherData, clubName } = props;

    function printPDF() {

        const teacherBody = [
            [{ text: 'ครูประจำชมรม', bold: true }]
        ];

        // eslint-disable-next-line
        teacherData.map((teacher, index) => {
            teacherBody.push([
                `${teacher.firstName} ${teacher.lastName}`,
            ]);
        }); 

        const tableBody = [
            [
                { text: 'ลำดับ', bold: true }, 
                { text: 'รหัสนักเรียน', bold: true }, 
                { text: 'ชื่อ-นามสกุล', bold: true },
                { text: 'ระดับชั้น', bold: true },
                { text: 'เลขที่', bold: true }, 
                { text: '1', bold: true }, 
                { text: '2', bold: true }, 
                { text: '3', bold: true }, 
                { text: '4', bold: true }, 
                { text: '5', bold: true },
                { text: '6', bold: true }, 
                { text: '7', bold: true }, 
                { text: '8', bold: true }, 
                { text: '9', bold: true }, 
                { text: '10', bold: true }
            ]
        ];

        // eslint-disable-next-line
        data.map((student, index) => {
            tableBody.push([
                index + 1,
                student.code,
                `${student.preface} ${student.firstName} ${student.lastName}`,
                student.grade,
                student.number,
                '', '', '', '', '', '', '', '', '', '', 
            ]);
        });

        const docDefinition = {
            content: [
                { text: `ชมรม ${clubName}`, fontSize: 24, bold: true, margin: [0, 0, 0, 10] },
                {
                    table: {
                        headerRows: 1,
                        body: teacherBody
                    },
                    margin: [0, 0, 0, 10]
                },
                { text: 'รายชื่อนักเรียน', fontSize: 18, bold: true, margin: [0, 0, 0, 5] },
                {
                    table: {
                        headerRows: 1,
                        widths: [23 , 48, 130, 40, 22, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
                        body: tableBody
                    }
                }
            ],
            defaultStyle: {
                font: "THSarabunNew",
                fontSize: 14
            }
        };

        pdfMake.createPdf(docDefinition).open();
    }

    return (
        <>
            <Button variant="contained" onClick={printPDF}>
                สร้าง PDF
            </Button>
        </>
    );
}
