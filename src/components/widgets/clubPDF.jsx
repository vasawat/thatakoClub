import React from 'react';
import Button from '@mui/material/Button';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

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
        const tableBody = [
            [{ text: 'เลขที่', bold: true }, { text: 'ชื่อ-นามสกุล', bold: true }, { text: 'รหัสนักเรียน', bold: true }, { text: 'ระดับชั้น', bold: true }, { text: 'ชมรม', bold: true }]
        ];

        const teacherBody = [
            [{ text: 'ครูประจำชมรม', bold: true }]
        ];

        // eslint-disable-next-line
        teacherData.map((teacher, index) => {
            teacherBody.push([
                `${teacher.firstName} ${teacher.lastName}`,
            ]);
        }); 

        // eslint-disable-next-line
        data.map((student, index) => {
            tableBody.push([
                student.number,
                `${student.preface} ${student.firstName} ${student.lastName}`,
                student.code,
                student.grade,
                student.club
            ]);
        });

        const docDefinition = {
            content: [
                { text: `ชมรม ${clubName}`, fontSize: 24, bold: true, margin: [0, 0, 0, 10] },
                {
                    table: {
                        headerRows: 1, // หัวตาราง
                        body: teacherBody
                    },
                    margin: [0, 0, 0, 10]
                },
                { text: 'รายชื่อนักเรียน', fontSize: 18, bold: true, margin: [0, 0, 0, 5] },
                {
                    table: {
                        headerRows: 1, // หัวตาราง
                        body: tableBody // ข้อมูลในตาราง
                    }
                }
            ],
            defaultStyle: {
                font: "THSarabunNew",
                fontSize: 15
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
