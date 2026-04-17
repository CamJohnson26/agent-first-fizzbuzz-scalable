import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export type ExportFormat = 'csv' | 'json' | 'pdf' | 'txt' | 'excel';
export type ExportOrientation = 'horizontal' | 'vertical';

export const exportResults = (
  results: string[],
  start: number,
  format: ExportFormat,
  orientation: ExportOrientation
) => {
  const data = results.map((value, index) => ({
    index: start + index,
    value,
  }));

  const filename = `fizzbuzz-results-${start}-${start + results.length - 1}`;

  switch (format) {
    case 'json':
      const jsonContent = orientation === 'vertical' 
        ? JSON.stringify(data, null, 2)
        : JSON.stringify({ range: { start, end: start + results.length - 1 }, results }, null, 2);
      saveAs(new Blob([jsonContent], { type: 'application/json' }), `${filename}.json`);
      break;

    case 'txt':
      const txtContent = orientation === 'vertical'
        ? data.map(d => `${d.index}: ${d.value}`).join('\n')
        : results.join(', ');
      saveAs(new Blob([txtContent], { type: 'text/plain' }), `${filename}.txt`);
      break;

    case 'csv':
      const csvContent = orientation === 'vertical'
        ? 'Index,Value\n' + data.map(d => `${d.index},${d.value}`).join('\n')
        : 'Index,' + data.map(d => d.index).join(',') + '\nValue,' + results.join(',');
      saveAs(new Blob([csvContent], { type: 'text/csv' }), `${filename}.csv`);
      break;

    case 'excel': {
      const ws = orientation === 'vertical'
        ? XLSX.utils.json_to_sheet(data)
        : XLSX.utils.aoa_to_sheet([
            ['Index', ...data.map(d => d.index)],
            ['Value', ...results]
          ]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Results');
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      saveAs(new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), `${filename}.xlsx`);
      break;
    }

    case 'pdf': {
      const doc = new jsPDF();
      doc.text(`FizzBuzz Results (${start} to ${start + results.length - 1})`, 10, 10);
      if (orientation === 'vertical') {
        autoTable(doc, {
          head: [['Index', 'Value']],
          body: data.map(d => [d.index, d.value]),
          startY: 20,
        });
      } else {
        autoTable(doc, {
          body: [
            ['Index', ...data.map(d => d.index)],
            ['Value', ...results]
          ],
          startY: 20,
        });
      }
      doc.save(`${filename}.pdf`);
      break;
    }
  }
};
