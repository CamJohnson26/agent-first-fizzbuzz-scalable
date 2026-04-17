import { describe, it, expect, vi, beforeEach } from 'vitest';
import { exportResults } from './export';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';

vi.mock('file-saver', () => ({
  saveAs: vi.fn(),
}));

vi.mock('xlsx', () => ({
  utils: {
    json_to_sheet: vi.fn(() => ({})),
    aoa_to_sheet: vi.fn(() => ({})),
    book_new: vi.fn(() => ({})),
    book_append_sheet: vi.fn(),
  },
  write: vi.fn(() => new ArrayBuffer(0)),
}));

vi.mock('jspdf', () => {
  const MockjsPDF = vi.fn().mockImplementation(function (this: any) {
    this.text = vi.fn();
    this.save = vi.fn();
    this.internal = {
      pageSize: {
        getWidth: () => 210,
        getHeight: () => 297,
      },
      scaleFactor: 1,
    };
    this.setFontSize = vi.fn();
    return this;
  });
  return { jsPDF: MockjsPDF };
});

vi.mock('jspdf-autotable', () => ({
  default: vi.fn(),
}));

describe('exportResults', () => {
  const results = ['1', '2', 'Fizz', '4', 'Buzz'];
  const start = 1;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('exports to JSON (vertical)', () => {
    exportResults(results, start, 'json', 'vertical');
    expect(saveAs).toHaveBeenCalled();
  });

  it('exports to JSON (horizontal)', () => {
    exportResults(results, start, 'json', 'horizontal');
    expect(saveAs).toHaveBeenCalled();
  });

  it('exports to TXT (vertical)', () => {
    exportResults(results, start, 'txt', 'vertical');
    expect(saveAs).toHaveBeenCalled();
  });

  it('exports to CSV (vertical)', () => {
    exportResults(results, start, 'csv', 'vertical');
    expect(saveAs).toHaveBeenCalled();
  });

  it('exports to Excel', () => {
    exportResults(results, start, 'excel', 'vertical');
    expect(XLSX.utils.book_new).toHaveBeenCalled();
    expect(XLSX.write).toHaveBeenCalled();
    expect(saveAs).toHaveBeenCalled();
  });

  it('exports to PDF', () => {
    exportResults(results, start, 'pdf', 'vertical');
    // jsPDF should have been called as a constructor
    expect(jsPDF).toHaveBeenCalled();
  });
});
