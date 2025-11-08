import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import FeatureCard from '../components/FeatureCard';
import { simulateGst } from '../features/gst/GstReconciliation';
import { simulateTds } from '../features/tds/TdsCalculation';
import { simulateInvoice } from '../features/invoice/InvoiceExtraction';
import { simulateLedger } from '../features/ledger/LedgerClassification';

export default function Dashboard() {
  const [preview, setPreview] = useState(null);
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !editingCell) {
        e.preventDefault();
        handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'z')) && !editingCell) {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editingCell, historyIndex, history]);

  // Convert column index to Excel column letter (A, B, C, ..., Z, AA, AB, ...)
  const getColumnLetter = (index) => {
    let letter = '';
    while (index >= 0) {
      letter = String.fromCharCode(65 + (index % 26)) + letter;
      index = Math.floor(index / 26) - 1;
    }
    return letter;
  };

  // Handle cell click for editing
  const handleCellClick = (rowIndex, cellIndex) => {
    setEditingCell({ row: rowIndex, cell: cellIndex });
    setEditValue(preview.excelData[rowIndex][cellIndex] || '');
  };

  // Handle cell value change
  const handleCellChange = (e) => {
    setEditValue(e.target.value);
  };

  // Handle cell blur (save changes)
  const handleCellBlur = () => {
    if (editingCell) {
      const newData = [...preview.excelData];
      const oldValue = newData[editingCell.row][editingCell.cell];
      
      // Only save if value changed
      if (oldValue !== editValue) {
        newData[editingCell.row][editingCell.cell] = editValue;
        
        // Add to history for undo/redo
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push({
          data: preview.excelData,
          row: editingCell.row,
          cell: editingCell.cell,
          oldValue: oldValue
        });
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        
        setPreview({
          ...preview,
          excelData: newData,
          modified: true
        });
      }
      
      setEditingCell(null);
      setEditValue('');
    }
  };

  // Undo last change
  const handleUndo = () => {
    if (historyIndex >= 0) {
      const prevState = history[historyIndex];
      setPreview({
        ...preview,
        excelData: prevState.data,
        modified: historyIndex > 0
      });
      setHistoryIndex(historyIndex - 1);
    }
  };

  // Redo last undone change
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      const nextState = history[nextIndex];
      const newData = [...nextState.data];
      newData[nextState.row][nextState.cell] = editValue;
      
      setPreview({
        ...preview,
        excelData: newData,
        modified: true
      });
      setHistoryIndex(nextIndex);
    }
  };

  // Handle Enter key to save and move to next cell
  const handleCellKeyDown = (e, rowIndex, cellIndex) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCellBlur();
      
      // Move to next row, same column
      if (rowIndex + 1 < preview.excelData.length) {
        setTimeout(() => {
          handleCellClick(rowIndex + 1, cellIndex);
        }, 0);
      }
    } else if (e.key === 'Escape') {
      setEditingCell(null);
      setEditValue('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleCellBlur();
      
      // Move to next cell in same row
      const row = preview.excelData[rowIndex];
      if (cellIndex + 1 < row.length) {
        setTimeout(() => {
          handleCellClick(rowIndex, cellIndex + 1);
        }, 0);
      }
    }
  };

  // Download modified Excel file
  const downloadModifiedExcel = () => {
    const worksheet = XLSX.utils.aoa_to_sheet(preview.excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, preview.activeSheet || 'Sheet1');
    XLSX.writeFile(workbook, `modified_${preview.fileName}`);
  };

  // Handle cell copy (Ctrl+C)
  const handleCellCopy = (e, rowIndex, cellIndex) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'c' && !editingCell) {
      e.preventDefault();
      const cellValue = preview.excelData[rowIndex][cellIndex];
      navigator.clipboard.writeText(cellValue || '');
    }
  };

  // Handle cell paste (Ctrl+V)
  const handleCellPaste = (e, rowIndex, cellIndex) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'v' && !editingCell) {
      e.preventDefault();
      navigator.clipboard.readText().then(text => {
        const newData = [...preview.excelData];
        newData[rowIndex][cellIndex] = text;
        setPreview({
          ...preview,
          excelData: newData,
          modified: true
        });
      });
    }
  };

  // Handle cell delete (Delete key)
  const handleCellDelete = (e, rowIndex, cellIndex) => {
    if (e.key === 'Delete' && !editingCell) {
      e.preventDefault();
      const newData = [...preview.excelData];
      newData[rowIndex][cellIndex] = '';
      setPreview({
        ...preview,
        excelData: newData,
        modified: true
      });
    }
  };

  const handleFileUpload = (file, title, processCallback) => {
    // Show file preview when uploaded
    const fileType = file.type;
    const fileName = file.name;
    const fileSize = (file.size / 1024).toFixed(2) + ' KB';
    
    // Read Excel file if it's an Excel file
    if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.csv')) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          
          // Get the first sheet
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          
          // Convert to JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
          
          // Get all sheet names
          const sheetNames = workbook.SheetNames;
          
          // Create a modified process callback that uses updated Excel data
          const modifiedProcessCallback = async () => {
            // Convert current Excel data back to file
            const currentData = preview?.excelData || jsonData;
            const ws = XLSX.utils.aoa_to_sheet(currentData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, firstSheetName);
            
            // Create a new file from the modified data
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const modifiedFile = new File([blob], fileName, { type: fileType });
            
            // Call the original process callback with modified file
            if (processCallback) {
              await processCallback();
            }
          };
          
          setPreview({
            title,
            fileName,
            fileSize,
            fileType,
            status: 'uploaded',
            uploadTime: new Date().toLocaleString(),
            excelData: jsonData,
            sheetNames: sheetNames,
            activeSheet: firstSheetName,
            processCallback: modifiedProcessCallback,
            originalFile: file
          });
        } catch (error) {
          console.error('Error reading Excel file:', error);
          setPreview({
            title,
            fileName,
            fileSize,
            fileType,
            status: 'uploaded',
            uploadTime: new Date().toLocaleString(),
            error: 'Failed to read Excel file'
          });
        }
      };
      
      reader.readAsArrayBuffer(file);
    } else {
      // For non-Excel files (PDF, images)
      setPreview({
        title,
        fileName,
        fileSize,
        fileType,
        status: 'uploaded',
        uploadTime: new Date().toLocaleString(),
        processCallback: processCallback
      });
    }
  };

  const handleProcessComplete = (result, title) => {
    // Update preview with results
    setPreview(prev => ({
      ...prev,
      status: 'processed',
      result,
      processTime: new Date().toLocaleString()
    }));
  };

  // Get modified Excel file for processing
  const getModifiedExcelFile = async () => {
    if (preview && preview.excelData && preview.modified) {
      // Convert current Excel data to file
      const ws = XLSX.utils.aoa_to_sheet(preview.excelData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, preview.activeSheet || 'Sheet1');
      
      // Create a new file from the modified data
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const modifiedFile = new File([blob], preview.fileName, { type: preview.fileType });
      
      return modifiedFile;
    }
    return null;
  };

  return (
    <div className="container dashboard-container" style={{ paddingTop: 80 }}>
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <line x1="3" y1="9" x2="21" y2="9"/>
              <line x1="9" y1="21" x2="9" y2="9"/>
            </svg>
          </div>
          <div>
            <h1>Dashboard</h1>
            <div className="tagline">Automate your CA workflows with intelligent processing</div>
          </div>
        </div>
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
            <div className="stat-info">
              <div className="stat-value">4</div>
              <div className="stat-label">Tools Available</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                <polyline points="13 2 13 9 20 9"/>
              </svg>
            </div>
            <div className="stat-info">
              <div className="stat-value">Ready</div>
              <div className="stat-label">System Status</div>
            </div>
          </div>
        </div>
      </header>

      <div className="quick-guide">
        <div className="guide-header">
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <h3>How It Works</h3>
        </div>
        <div className="guide-steps">
          <div className="guide-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Upload File</h4>
              <p>Select your Excel, CSV, or PDF file</p>
            </div>
          </div>
          <div className="guide-arrow">→</div>
          <div className="guide-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Review & Edit</h4>
              <p>Preview and modify data if needed</p>
            </div>
          </div>
          <div className="guide-arrow">→</div>
          <div className="guide-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Process</h4>
              <p>Click process to get results</p>
            </div>
          </div>
          <div className="guide-arrow">→</div>
          <div className="guide-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Download</h4>
              <p>Export processed data</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-title">
        <h2>Choose Your Tool</h2>
        <p>Select a feature below to get started with your file processing</p>
      </div>

      <section className="features-grid">
        <FeatureCard
          title="GST Reconciliation"
          description="Automatically reconcile GST data and identify discrepancies with intelligent matching."
          accept=".xlsx"
          simulateProcess={simulateGst}
          onFileSelect={(file, processCallback) => handleFileUpload(file, 'GST Reconciliation', processCallback)}
          onProcessComplete={(result) => handleProcessComplete(result, 'GST Reconciliation')}
          getModifiedFile={getModifiedExcelFile}
          icon={
            <svg className="icon feature-icon-gst" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <path d="M3 9h18"/>
              <path d="M9 21V9"/>
            </svg>
          }
        />
        <FeatureCard
          title="TDS Calculation"
          description="Calculate TDS deductions instantly with support for multiple sections and rates."
          accept=".csv,.xlsx"
          simulateProcess={simulateTds}
          onFileSelect={(file, processCallback) => handleFileUpload(file, 'TDS Calculation', processCallback)}
          onProcessComplete={(result) => handleProcessComplete(result, 'TDS Calculation')}
          getModifiedFile={getModifiedExcelFile}
          icon={
            <svg className="icon feature-icon-tds" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          }
        />
        <FeatureCard
          title="Invoice Extraction"
          description="Extract invoice data from images and PDFs using advanced OCR technology."
          accept=".pdf,.png,.jpg,.jpeg"
          simulateProcess={simulateInvoice}
          onFileSelect={(file, processCallback) => handleFileUpload(file, 'Invoice Extraction', processCallback)}
          onProcessComplete={(result) => handleProcessComplete(result, 'Invoice Extraction')}
          getModifiedFile={getModifiedExcelFile}
          icon={
            <svg className="icon feature-icon-invoice" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          }
        />
        <FeatureCard
          title="Ledger Classification"
          description="Automatically categorize ledger entries with AI-powered classification system."
          accept=".csv,.xlsx"
          simulateProcess={simulateLedger}
          onFileSelect={(file, processCallback) => handleFileUpload(file, 'Ledger Classification', processCallback)}
          onProcessComplete={(result) => handleProcessComplete(result, 'Ledger Classification')}
          getModifiedFile={getModifiedExcelFile}
          icon={
            <svg className="icon feature-icon-ledger" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              <path d="M8 7h8"/>
              <path d="M8 11h8"/>
              <path d="M8 15h6"/>
            </svg>
          }
        />
      </section>

      {/* Preview Section */}
      {preview && (
        <section className="preview-panel">
          <div className="preview-header">
            <h2>
              <svg className="icon" style={{ marginRight: 8 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              Preview: {preview.title}
            </h2>
            <button className="preview-close" onClick={() => setPreview(null)}>
              <svg className="icon" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div className="preview-body">
            {/* File Info */}
            <div className="preview-section">
              <h3>File Information</h3>
              <div className="preview-table">
                <div className="preview-row">
                  <span className="preview-label">File Name:</span>
                  <span className="preview-value">{preview.fileName}</span>
                </div>
                <div className="preview-row">
                  <span className="preview-label">File Size:</span>
                  <span className="preview-value">{preview.fileSize}</span>
                </div>
                <div className="preview-row">
                  <span className="preview-label">File Type:</span>
                  <span className="preview-value">{preview.fileType}</span>
                </div>
                <div className="preview-row">
                  <span className="preview-label">Upload Time:</span>
                  <span className="preview-value">{preview.uploadTime}</span>
                </div>
                <div className="preview-row">
                  <span className="preview-label">Status:</span>
                  <span className={`preview-badge ${preview.status}`}>
                    {preview.status === 'uploaded' ? 'Ready to Process' : 'Processing Complete'}
                  </span>
                </div>
              </div>
            </div>

            {/* Excel View Preview */}
            {preview.status === 'uploaded' && preview.excelData && (
              <div className="preview-section">
                <h3>📊 Excel Spreadsheet Preview</h3>
                <div className="excel-view">
                  <div className="excel-toolbar">
                    <div className="excel-tabs">
                      {preview.sheetNames && preview.sheetNames.map((sheetName, index) => (
                        <div 
                          key={index} 
                          className={`excel-tab ${index === 0 ? 'active' : ''}`}
                        >
                          {sheetName}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="excel-grid">
                    <table className="excel-sheet">
                      <thead>
                        <tr>
                          <th className="row-header"></th>
                          {preview.excelData[0] && preview.excelData[0].map((_, colIndex) => (
                            <th key={colIndex}>
                              {getColumnLetter(colIndex)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {preview.excelData.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            <td className="row-header">{rowIndex + 1}</td>
                            {row.map((cell, cellIndex) => {
                              const isEditing = editingCell?.row === rowIndex && editingCell?.cell === cellIndex;
                              return (
                                <td 
                                  key={cellIndex}
                                  onClick={() => !isEditing && handleCellClick(rowIndex, cellIndex)}
                                  onKeyDown={(e) => {
                                    handleCellCopy(e, rowIndex, cellIndex);
                                    handleCellPaste(e, rowIndex, cellIndex);
                                    handleCellDelete(e, rowIndex, cellIndex);
                                    if (!isEditing && (e.key.length === 1 || e.key === 'F2')) {
                                      handleCellClick(rowIndex, cellIndex);
                                    }
                                  }}
                                  tabIndex={0}
                                  className={isEditing ? 'editing' : 'editable'}
                                  title="Click to edit, Ctrl+C to copy, Ctrl+V to paste, Delete to clear"
                                >
                                  {isEditing ? (
                                    <input
                                      type="text"
                                      value={editValue}
                                      onChange={handleCellChange}
                                      onBlur={handleCellBlur}
                                      onKeyDown={(e) => handleCellKeyDown(e, rowIndex, cellIndex)}
                                      autoFocus
                                      className="cell-input"
                                    />
                                  ) : (
                                    <span>{cell !== null && cell !== undefined ? String(cell) : ''}</span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="excel-footer">
                  <div className="excel-actions">
                    <button 
                      className="btn-action"
                      onClick={handleUndo}
                      disabled={historyIndex < 0}
                      title="Undo (Ctrl+Z)"
                    >
                      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 7v6h6"/>
                        <path d="M21 17a9 9 0 00-9-9 9 9 0 00-9 9"/>
                      </svg>
                      Undo
                    </button>
                    <button 
                      className="btn-action"
                      onClick={handleRedo}
                      disabled={historyIndex >= history.length - 1}
                      title="Redo (Ctrl+Y)"
                    >
                      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 7v6h-6"/>
                        <path d="M3 17a9 9 0 019-9 9 9 0 019 9"/>
                      </svg>
                      Redo
                    </button>
                  </div>
                  <p className="preview-note">
                    📋 {preview.excelData.length} rows • Click to edit • Ctrl+C/V to copy/paste • Delete to clear
                    {preview.modified && (
                      <span className="modified-badge">
                        • Modified (will process updated data)
                      </span>
                    )}
                  </p>
                  {preview.modified && (
                    <button 
                      className="btn-download"
                      onClick={downloadModifiedExcel}
                    >
                      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      Download Modified
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Error Message */}
            {preview.status === 'uploaded' && preview.error && (
              <div className="preview-section">
                <div className="preview-error">
                  ⚠️ {preview.error}
                </div>
              </div>
            )}

            {/* Non-Excel File Preview */}
            {preview.status === 'uploaded' && !preview.excelData && !preview.error && (
              <div className="preview-section">
                <div className="preview-info">
                  📄 File uploaded successfully. Click "Process" button to continue.
                </div>
              </div>
            )}

            {/* Results Preview */}
            {preview.status === 'processed' && preview.result && (
              <div className="preview-section">
                <h3>Processing Results</h3>
                <div className="preview-result">
                  <pre>{typeof preview.result === 'string' ? preview.result : JSON.stringify(preview.result, null, 2)}</pre>
                </div>
                <div className="preview-row" style={{ marginTop: 16 }}>
                  <span className="preview-label">Process Time:</span>
                  <span className="preview-value">{preview.processTime}</span>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
