import React, { useState, useCallback } from 'react';
import LoadingOverlay from './LoadingOverlay';
import UploadButton from './UploadButton';

export default function FeatureCard({ title, description, accept, simulateProcess, icon, onFileSelect, onProcessComplete, onProcessRequest, getModifiedFile }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload = useCallback(async (file) => {
    // Store the file for later processing
    setSelectedFile(file);
    
    // Notify parent about file selection (with process callback)
    if (onFileSelect) {
      onFileSelect(file, async () => {
        // This callback will be called when user clicks "Process File"
        await processFile(file);
      });
    }
  }, [onFileSelect]);

  const processFile = useCallback(async (file) => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      // Get the modified file if available (for Excel files that were edited)
      let fileToProcess = file;
      if (getModifiedFile) {
        const modifiedFile = await getModifiedFile();
        if (modifiedFile) {
          fileToProcess = modifiedFile;
        }
      }
      
      const res = await simulateProcess(fileToProcess);
      setResult(res);
      
      // Notify parent about process completion
      if (onProcessComplete) {
        onProcessComplete(res);
      }
    } catch (e) {
      setError(e?.message || 'Something went wrong while processing.');
    } finally {
      setLoading(false);
    }
  }, [simulateProcess, onProcessComplete, getModifiedFile]);

  return (
    <div className="card" aria-busy={loading}>
      <h2>{icon ? <span aria-hidden="true">{icon}</span> : null}<span>{title}</span></h2>
      <p>{description}</p>
      
      {/* Show filename if file is selected */}
      {selectedFile && (
        <div className="selected-file-info">
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
            <polyline points="13 2 13 9 20 9"/>
          </svg>
          <span className="file-name">{selectedFile.name}</span>
          <span className="file-size">({(selectedFile.size / 1024).toFixed(2)} KB)</span>
        </div>
      )}
      
      <div className="button-group">
        <UploadButton disabled={loading} accept={accept} onFile={handleUpload} />
        {selectedFile && (
          <button 
            className="btn-process-card"
            onClick={() => processFile(selectedFile)}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="icon spinning" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  <path d="M21 12a9 9 0 00-9-9"/>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12l5 5L20 7"/>
                </svg>
                Process
              </>
            )}
          </button>
        )}
      </div>
      
      {loading && <LoadingOverlay text="Processing..." />}
      {result && <div className="result" role="status">{result}</div>}
      {error && <div className="error" role="alert">{error}</div>}
    </div>
  );
}
