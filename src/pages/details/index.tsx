import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Eye } from "lucide-react";
import { Badge, Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import HistoryDetail from "./components/history-detail-modal/HistoryDetail";
import "./index.css";

const MOCK_EMPLOYEE = {
  nik: "EMP-2024-001",
  name: "Dina A",
  department: "Operations",
  position: "Operations Staff",
  birthDate: "1992-06-15",
  gender: "Perempuan",
  lastMCU: "2026-01-01",
  mcuStatus: "Fit",
  mcuResult: "Within normal limits",
  doctor: "dr. Andi Pratama",
  clinic: "Prodia Kemang",
  metrics: [
    {
      label: "Tekanan Darah",
      value: "118/76",
      unit: "mmHg",
      reference: "90/60 - 120/80",
      status: "Normal",
    },
    {
      label: "Denyut Nadi",
      value: "72",
      unit: "bpm",
      reference: "60 - 100",
      status: "Normal",
    },
    {
      label: "Berat Badan",
      value: "56",
      unit: "kg",
      reference: "45 - 65",
      status: "Normal",
    },
    {
      label: "Tinggi Badan",
      value: "160",
      unit: "cm",
      reference: "-",
      status: "Normal",
    },
    {
      label: "IMT (BMI)",
      value: "21.9",
      unit: "kg/m²",
      reference: "18.5 - 25.0",
      status: "Normal",
    },
    {
      label: "Gula Darah Sewaktu",
      value: "98",
      unit: "mg/dL",
      reference: "< 140",
      status: "Normal",
    },
    {
      label: "Kolesterol Total",
      value: "178",
      unit: "mg/dL",
      reference: "< 200",
      status: "Normal",
    },
    {
      label: "HDL Kolesterol",
      value: "58",
      unit: "mg/dL",
      reference: "> 40",
      status: "Normal",
    },
    {
      label: "LDL Kolesterol",
      value: "102",
      unit: "mg/dL",
      reference: "< 130",
      status: "Normal",
    },
    {
      label: "Trigliserida",
      value: "110",
      unit: "mg/dL",
      reference: "< 150",
      status: "Normal",
    },
    {
      label: "Asam Urat",
      value: "4.8",
      unit: "mg/dL",
      reference: "2.4 - 6.0",
      status: "Normal",
    },
    {
      label: "Hemoglobin",
      value: "13.2",
      unit: "g/dL",
      reference: "12.0 - 15.5",
      status: "Normal",
    },
    {
      label: "Urinalisis",
      value: "Normal",
      unit: "-",
      reference: "-",
      status: "Normal",
    },
    {
      label: "Rontgen Thorax",
      value: "Normal",
      unit: "-",
      reference: "-",
      status: "Normal",
    },
  ],
  history: [
    {
      date: "2025-01-02",
      clinic: "Prodia Kemang",
      result: "Within normal limits",
      status: "Fit",
      doctor: "dr. Andi Pratama",
    },
    {
      date: "2024-01-02",
      clinic: "Prodia Kemang",
      result: "Within normal limits",
      status: "Fit",
      doctor: "dr. Andi Pratama",
    },
    {
      date: "2023-01-03",
      clinic: "Prodia Kemang",
      result: "Within normal limits",
      status: "Fit",
      doctor: "dr. Rina Sari",
    },
  ],
  doctorNote:
    "Hasil pemeriksaan dalam batas normal. Disarankan untuk menjaga pola makan, olahraga teratur, dan kontrol rutin tahun depan.",
  aiNote:
    "Berdasarkan hasil MCU, kondisi kesehatan karyawan baik. Tidak ditemukan faktor risiko signifikan.\n\nSaran AI:\n• Pertahankan pola hidup sehat\n• Rutin olahraga minimal 150 menit/minggu\n• Perbanyak konsumsi sayur dan buah\n• Kontrol rutin sesuai jadwal",
};

const EmployeeDetails = () => {
  const { nik } = useParams();
  const navigate = useNavigate();
  const employee = useMemo(() => {
    if (!nik) return MOCK_EMPLOYEE;
    return nik === MOCK_EMPLOYEE.nik ? MOCK_EMPLOYEE : MOCK_EMPLOYEE;
  }, [nik]);

  return (
    <Box className="details-page">
      <Box className="details-header">
        <Flex className="details-header-top">
          <div>
            <div className="details-breadcrumb">
              <span>Home</span>
              <span>›</span>
              <span>Detail MCU</span>
            </div>
            <Heading as="h1" className="details-title">
              Detail MCU
            </Heading>
          </div>
          <Button
            className="details-back-button"
            variant="outline"
            colorScheme="gray"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} /> Kembali
          </Button>
        </Flex>
      </Box>

      <Box className="details-grid">
        <Box className="details-card details-person-card">
          <Box className="profile-summary">
            <Box className="profile-avatar">{employee.name.charAt(0)}</Box>
            <Box className="profile-meta">
              <Text className="profile-name">{employee.name}</Text>
              <Badge className="profile-status">{employee.mcuStatus}</Badge>
            </Box>
          </Box>

          <Box className="profile-info-grid">
            {[
              { label: "NIK", value: employee.nik },
              { label: "Departemen", value: employee.department },
              { label: "Jabatan", value: employee.position },
              { label: "Tanggal Lahir", value: employee.birthDate },
              { label: "Jenis Kelamin", value: employee.gender },
            ].map((item) => (
              <Box key={item.label} className="profile-info-card">
                <Text className="profile-label">{item.label}</Text>
                <Text className="profile-value">{item.value}</Text>
              </Box>
            ))}
          </Box>
        </Box>

        <Box className="details-sidebar">
          <Box className="details-card details-card--compact">
            <Text className="section-heading">Ringkasan MCU Terakhir</Text>
            <Box className="summary-list">
              <Box className="summary-item">
                <Text className="summary-label">Tanggal MCU</Text>
                <Text>{employee.lastMCU}</Text>
              </Box>
              <Box className="summary-item">
                <Text className="summary-label">Status</Text>
                <Text>{employee.mcuStatus}</Text>
              </Box>
              <Box className="summary-item">
                <Text className="summary-label">Hasil MCU</Text>
                <Text>{employee.mcuResult}</Text>
              </Box>
              <Box className="summary-item">
                <Text className="summary-label">Dokter Pemeriksa</Text>
                <Text>{employee.doctor}</Text>
              </Box>
              <Box className="summary-item">
                <Text className="summary-label">Klinik / Laboratorium</Text>
                <Text>{employee.clinic}</Text>
              </Box>
            </Box>
          </Box>

          <Box className="note-card note-card--doctor">
            <Text className="note-card-heading">Catatan Dokter</Text>
            <Text className="note-card-text">{employee.doctorNote}</Text>
            <Text className="note-card-footer">
              — {employee.doctor}
              <br />
              2026-01-01 09:45
            </Text>
          </Box>

          <Box className="note-card note-card--ai">
            <Text className="note-card-heading">Catatan AI</Text>
            <Text className="note-card-text" whiteSpace="pre-line">
              {employee.aiNote}
            </Text>
            <Text className="note-card-footer">
              Generated on 2026-01-01 10:00
            </Text>
          </Box>
        </Box>

        <Box className="details-card details-results">
          <Text className="section-heading">
            Hasil MCU Terakhir (2026-01-01)
          </Text>
          <Box className="table-scroll">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Pemeriksaan</th>
                  <th>Hasil</th>
                  <th>Satuan</th>
                  <th>Nilai Rujukan</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {employee.metrics.map((metric) => (
                  <tr key={metric.label}>
                    <td>{metric.label}</td>
                    <td>{metric.value}</td>
                    <td>{metric.unit}</td>
                    <td>{metric.reference}</td>
                    <td>
                      <span className="status-pill">{metric.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
          <Text className="history-footer">
            Catatan: Nilai rujukan dapat berbeda sesuai laboratorium.
          </Text>
        </Box>

        <Box className="details-card details-history">
          <Text className="section-heading">Riwayat MCU Sebelumnya</Text>
          <Box className="table-scroll">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Tanggal MCU</th>
                  <th>Klinik / Laboratorium</th>
                  <th>Hasil MCU</th>
                  <th>Status</th>
                  <th>Dokter</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {employee.history.map((item) => {
                  const historyDetailData = {
                    ...item,
                    mcuType: "Annual MCU",
                    note: employee.doctorNote,
                    aiNote: employee.aiNote,
                    generatedAt: `${item.date} 09:30`,
                    metrics: employee.metrics,
                    comparisons: [
                      { label: "Gula Darah", value: "Stabil", trend: "stable" },
                      { label: "Kolesterol", value: "Menurun", trend: "down" },
                      { label: "Tekanan Darah", value: "Stabil", trend: "stable" },
                    ],
                    aiRecommendations: [
                      "Pertahankan pola hidup sehat",
                      "Rutin olahraga minimal 150 menit/minggu",
                      "Perbanyak konsumsi sayur dan buah",
                      "Kontrol rutin sesuai jadwal",
                    ],
                  };

                  return (
                    <tr key={`${item.date}-${item.doctor}`}>
                      <td>{item.date}</td>
                      <td>{item.clinic}</td>
                      <td>{item.result}</td>
                      <td>
                        <span className="status-pill">{item.status}</span>
                      </td>
                      <td>{item.doctor}</td>
                      <td>
                        <HistoryDetail historyData={historyDetailData}>
                          <Button size="sm" variant="solid">
                            <Eye size={16} /> Lihat
                          </Button>
                        </HistoryDetail>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeeDetails;
