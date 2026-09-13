import { useState } from "react";

function DNAAnalysis() {
  const [genes, setGenes] = useState({
    TP53: 0,
    EGFR: 0,
    TTN: 0,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // -----------------------------
  // Manual gene change
  // -----------------------------
  const handleChange = (gene, value) => {
    setGenes((previous) => ({
      ...previous,
      [gene]: Number(value),
    }));
  };

  // -----------------------------
  // Manual DNA Analysis
  // -----------------------------
  const analyzeDNA = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            genes: genes,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Prediction request failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(
        "Backend connection failed. Make sure FastAPI is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // File Selection
  // -----------------------------
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setError("");
    setResult(null);

    if (!file) {
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  // -----------------------------
  // Genomic File Analysis
  // -----------------------------
  const analyzeFile = async () => {
    if (!selectedFile) {
      setError("Please select a genomic file first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(
        "http://127.0.0.1:8000/analyze-file",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        let errorMessage = "File analysis failed";

        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorMessage;
        } catch {
          // Keep default error message
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Unable to analyze the genomic file."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #020617 0%, #0f172a 50%, #172554 100%)",
        color: "#f8fafc",
        fontFamily: "Inter, Arial, Helvetica, sans-serif",
        padding: "30px 20px 60px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* ================= HEADER ================= */}

        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 24px",
            marginBottom: "55px",
            borderRadius: "18px",
            background: "rgba(15, 23, 42, 0.8)",
            border: "1px solid rgba(148, 163, 184, 0.18)",
            boxShadow: "0 10px 35px rgba(0,0,0,0.25)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "26px",
                background:
                  "linear-gradient(135deg, #2563eb, #7c3aed)",
              }}
            >
              🧬
            </div>

            <div>
              <div
                style={{
                  fontSize: "21px",
                  fontWeight: "800",
                  letterSpacing: "0.5px",
                }}
              >
                HelixMind
              </div>

              <div
                style={{
                  fontSize: "11px",
                  color: "#94a3b8",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Precision Intelligence
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "8px 14px",
              borderRadius: "20px",
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.25)",
              color: "#86efac",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            ● AI SYSTEM ONLINE
          </div>
        </header>

        {/* ================= HERO ================= */}

        <section
          style={{
            textAlign: "center",
            marginBottom: "45px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "8px 16px",
              borderRadius: "30px",
              background: "rgba(37,99,235,0.12)",
              border: "1px solid rgba(96,165,250,0.25)",
              color: "#93c5fd",
              fontSize: "13px",
              fontWeight: "600",
              marginBottom: "18px",
            }}
          >
            🧬 GENOMIC INTELLIGENCE PLATFORM
          </div>

          <h1
            style={{
              fontSize: "clamp(34px, 6vw, 58px)",
              lineHeight: "1.1",
              margin: "0 0 18px",
              fontWeight: "800",
              background:
                "linear-gradient(90deg, #60a5fa, #a78bfa, #c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            DNA-Based Health
            <br />
            Intelligence
          </h1>

          <p
            style={{
              maxWidth: "680px",
              margin: "0 auto",
              color: "#94a3b8",
              fontSize: "16px",
              lineHeight: "1.7",
            }}
          >
            Analyze genomic information using artificial intelligence
            to identify potential cancer classifications from DNA
            mutation patterns.
          </p>
        </section>

        {/* ================= TWO CARDS ================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {/* ================= FILE CARD ================= */}

          <section
            style={{
              background: "rgba(15, 23, 42, 0.85)",
              border: "1px solid rgba(148,163,184,0.16)",
              borderRadius: "22px",
              padding: "28px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.22)",
            }}
          >
            <div style={{ marginBottom: "22px" }}>
              <div
                style={{
                  fontSize: "12px",
                  color: "#60a5fa",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  marginBottom: "8px",
                }}
              >
                OPTION 01
              </div>

              <h2
                style={{
                  margin: "0 0 8px",
                  fontSize: "24px",
                }}
              >
                Genomic File Analysis
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#94a3b8",
                  lineHeight: "1.6",
                  fontSize: "14px",
                }}
              >
                Upload a MAF genomic file for automated analysis.
              </p>
            </div>

            <label
              style={{
                display: "block",
                border: "2px dashed rgba(96,165,250,0.35)",
                borderRadius: "16px",
                padding: "28px 20px",
                textAlign: "center",
                cursor: "pointer",
                background: "rgba(37,99,235,0.05)",
              }}
            >
              <div
                style={{
                  fontSize: "36px",
                  marginBottom: "10px",
                }}
              >
                📁
              </div>

              <div
                style={{
                  fontWeight: "700",
                  marginBottom: "6px",
                }}
              >
                Choose genomic file
              </div>

              <div
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                }}
              >
                MAF / compressed genomic files
              </div>

              <input
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>

            {selectedFile && (
              <div
                style={{
                  marginTop: "15px",
                  padding: "12px",
                  borderRadius: "10px",
                  background: "rgba(34,197,94,0.08)",
                  color: "#86efac",
                  fontSize: "13px",
                  wordBreak: "break-word",
                }}
              >
                ✓ Selected: {selectedFile.name}
              </div>
            )}

            <button
              onClick={analyzeFile}
              disabled={loading}
              style={{
                width: "100%",
                marginTop: "18px",
                padding: "14px",
                border: "none",
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg, #2563eb, #4f46e5)",
                color: "white",
                fontSize: "15px",
                fontWeight: "700",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Analyzing..." : "Analyze Genomic File"}
            </button>
          </section>

          {/* ================= MANUAL CARD ================= */}

          <section
            style={{
              background: "rgba(15, 23, 42, 0.85)",
              border: "1px solid rgba(148,163,184,0.16)",
              borderRadius: "22px",
              padding: "28px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.22)",
            }}
          >
            <div style={{ marginBottom: "22px" }}>
              <div
                style={{
                  fontSize: "12px",
                  color: "#a78bfa",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  marginBottom: "8px",
                }}
              >
                OPTION 02
              </div>

              <h2
                style={{
                  margin: "0 0 8px",
                  fontSize: "24px",
                }}
              >
                Manual DNA Analysis
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#94a3b8",
                  lineHeight: "1.6",
                  fontSize: "14px",
                }}
              >
                Enter mutation status for selected genes.
              </p>
            </div>

            {/* TP53 */}

            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                  fontWeight: "700",
                }}
              >
                <span>TP53</span>
                <span style={{ color: "#64748b" }}>
                  Tumor suppressor
                </span>
              </label>

              <select
                value={genes.TP53}
                onChange={(e) =>
                  handleChange("TP53", e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "10px",
                  border: "1px solid rgba(148,163,184,0.25)",
                  background: "#020617",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                <option value={0}>0 — Not Mutated</option>
                <option value={1}>1 — Mutated</option>
              </select>
            </div>

            {/* EGFR */}

            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                  fontWeight: "700",
                }}
              >
                <span>EGFR</span>
                <span style={{ color: "#64748b" }}>
                  Growth receptor
                </span>
              </label>

              <select
                value={genes.EGFR}
                onChange={(e) =>
                  handleChange("EGFR", e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "10px",
                  border: "1px solid rgba(148,163,184,0.25)",
                  background: "#020617",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                <option value={0}>0 — Not Mutated</option>
                <option value={1}>1 — Mutated</option>
              </select>
            </div>

            {/* TTN */}

            <div style={{ marginBottom: "22px" }}>
              <label
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                  fontWeight: "700",
                }}
              >
                <span>TTN</span>
                <span style={{ color: "#64748b" }}>
                  Protein gene
                </span>
              </label>

              <select
                value={genes.TTN}
                onChange={(e) =>
                  handleChange("TTN", e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "10px",
                  border: "1px solid rgba(148,163,184,0.25)",
                  background: "#020617",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                <option value={0}>0 — Not Mutated</option>
                <option value={1}>1 — Mutated</option>
              </select>
            </div>

            <button
              onClick={analyzeDNA}
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                border: "none",
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg, #7c3aed, #9333ea)",
                color: "white",
                fontSize: "15px",
                fontWeight: "700",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Analyzing..." : "Analyze DNA"}
            </button>
          </section>
        </div>

        {/* ================= ERROR ================= */}

        {error && (
          <div
            style={{
              marginTop: "25px",
              padding: "16px 18px",
              borderRadius: "14px",
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.25)",
              color: "#fca5a5",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* ================= RESULT ================= */}

        {result && (
          <section
            style={{
              marginTop: "30px",
              padding: "30px",
              borderRadius: "22px",
              background: "rgba(15,23,42,0.9)",
              border: "1px solid rgba(96,165,250,0.2)",
              boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                color: "#60a5fa",
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "1px",
                marginBottom: "8px",
              }}
            >
              ANALYSIS COMPLETE
            </div>

            <h2
              style={{
                margin: "0 0 20px",
                fontSize: "28px",
              }}
            >
              Analysis Result
            </h2>

            {/* Prediction */}

            {result.prediction && (
              <div
                style={{
                  padding: "20px",
                  borderRadius: "16px",
                  background:
                    "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(124,58,237,0.15))",
                  marginBottom: "22px",
                }}
              >
                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: "13px",
                    marginBottom: "6px",
                  }}
                >
                  Predicted Classification
                </div>

                <div
                  style={{
                    fontSize: "30px",
                    fontWeight: "800",
                    color: "#93c5fd",
                  }}
                >
                  {result.prediction}
                </div>
              </div>
            )}

            {/* Probabilities */}

            {result.probabilities && (
              <div>
                <h3
                  style={{
                    marginBottom: "15px",
                  }}
                >
                  Confidence Scores
                </h3>

                {Object.entries(result.probabilities).map(
                  ([label, probability]) => {
                    const numericValue = Number(probability);

                    return (
                      <div
                        key={label}
                        style={{
                          marginBottom: "16px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "7px",
                            fontSize: "14px",
                          }}
                        >
                          <span>{label}</span>
                          <strong>
                            {numericValue.toFixed(1)}%
                          </strong>
                        </div>

                        <div
                          style={{
                            height: "9px",
                            borderRadius: "10px",
                            background: "#1e293b",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${Math.min(
                                Math.max(numericValue, 0),
                                100
                              )}%`,
                              height: "100%",
                              borderRadius: "10px",
                              background:
                                "linear-gradient(90deg, #2563eb, #8b5cf6)",
                            }}
                          />
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            )}

            {/* Other backend response fields */}

            {result.message && (
              <p
                style={{
                  color: "#94a3b8",
                  marginTop: "20px",
                }}
              >
                {result.message}
              </p>
            )}
          </section>
        )}

        {/* ================= FOOTER ================= */}

        <footer
          style={{
            marginTop: "45px",
            textAlign: "center",
            color: "#64748b",
            fontSize: "12px",
            lineHeight: "1.7",
          }}
        >
          <p>
            HelixMind-DNA Precision Intelligence System
          </p>

          <p>
            AI-based genomic analysis for research and
            educational purposes.
          </p>

          <p
            style={{
              color: "#475569",
              marginTop: "10px",
            }}
          >
            This system is not a medical diagnosis tool.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default DNAAnalysis;
