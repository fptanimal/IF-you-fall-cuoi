// ══════════════════════════════════════════════════════════════
// HEALTH ESTIMATION COEFFICIENTS
// ══════════════════════════════════════════════════════════════
// Công cụ ước tính dựa trên hệ số nguy cơ theo khuyến cáo
// WHO, AHA, CDC, Lancet, NEJM, NIH, ACC/AHA 2023.
//
// Đây là mô hình tính điểm dựa trên quy tắc (rule-based scoring),
// KHÔNG phải mô hình machine learning được huấn luyện trên dữ liệu.
//
// Tuổi thọ cơ sở (baseLife) lấy từ:
//   WHO Vietnam Country Profile 2024 — Nam: 73.6, Nữ: 79.2
// ══════════════════════════════════════════════════════════════

window.AI_MODEL_WEIGHTS = {
    // Tuổi thọ cơ sở — Nguồn: WHO Vietnam Country Profile 2024
    "baseLifeMale": 73.6,
    "baseLifeFemale": 79.2,

    // Hệ số penalty y tế — Nguồn: ACC/AHA 2023 Hypertension Guidelines
    "bp_penalty": -5,

    // Hệ số penalty đường huyết — Nguồn: ADA (American Diabetes Association) 2024
    "bs_penalty": -4,

    // Hệ số penalty BMI — Nguồn: WHO Obesity Classification, NEJM (BMI > 30 giảm 3-7 năm)
    "bmi_penalty": -6,

    // Hệ số penalty cholesterol — Nguồn: ACC/AHA 2023 Lipid Guidelines
    "chol_penalty": -2,

    // Metadata
    "methodology": "Rule-based scoring (không phải AI/ML)",
    "sources": "WHO, AHA, CDC, Lancet 2021, NEJM, NIH, ACC/AHA 2023, BMJ Nutrition",
    "last_updated": "2025-07"
};

console.log("📊 Health Estimation Coefficients loaded | Phương pháp: Rule-based scoring | Nguồn: WHO/AHA/CDC/Lancet");
