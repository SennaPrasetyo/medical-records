import { useState, type ReactNode } from "react";
import {
  Box,
  Button,
  Dialog,
  Flex,
  Heading,
  Text,
  Portal,
} from "@chakra-ui/react";
import {
  ArrowDown,
  ArrowUp,
  Building2,
  Calendar,
  ClipboardList,
  Download,
  FileText,
  GitCompare,
  Info,
  Minus,
  Printer,
  Sparkles,
  User,
} from "lucide-react";
import "./index.css";

type HistoryMetric = {
  label: string;
  value: string;
  unit: string;
  reference: string;
  status: string;
};

type HistoryComparison = {
  label: string;
  value: string;
  trend?: "up" | "down" | "stable";
};

type HistoryDetailData = {
  date: string;
  clinic: string;
  result: string;
  status: string;
  doctor: string;
  mcuType?: string;
  note?: string;
  aiNote?: string;
  aiRecommendations?: string[];
  comparisons?: HistoryComparison[];
  generatedAt?: string;
  metrics?: HistoryMetric[];
};

interface HistoryDetailProps {
  historyData: HistoryDetailData;
  children: ReactNode;
}

const getComparisonTrend = (comparison: HistoryComparison) => {
  if (comparison.trend) return comparison.trend;

  const normalized = comparison.value.toLowerCase();
  if (normalized.includes("menurun") || normalized.includes("turun")) {
    return "down";
  }
  if (
    normalized.includes("meningkat") ||
    normalized.includes("naik") ||
    normalized.includes("tinggi")
  ) {
    return "up";
  }
  return "stable";
};

const ComparisonTrendIcon = ({
  trend,
}: {
  trend: "up" | "down" | "stable";
}) => {
  if (trend === "up") {
    return (
      <ArrowUp
        size={14}
        className="history-detail-trend-icon history-detail-trend-icon--up"
      />
    );
  }
  if (trend === "down") {
    return (
      <ArrowDown
        size={14}
        className="history-detail-trend-icon history-detail-trend-icon--down"
      />
    );
  }
  return (
    <Minus
      size={14}
      className="history-detail-trend-icon history-detail-trend-icon--stable"
    />
  );
};

const HistoryDetail: React.FC<HistoryDetailProps> = ({
  historyData,
  children,
}) => {
  const summaryItems = [
    { label: "Tanggal MCU", value: historyData.date, icon: Calendar },
    {
      label: "Jenis MCU",
      value: historyData.mcuType ?? "Annual MCU",
      icon: FileText,
    },
    { label: "Dokter Pemeriksa", value: historyData.doctor, icon: User },
    {
      label: "Klinik / Laboratorium",
      value: historyData.clinic,
      icon: Building2,
    },
  ];

  const defaultRecommendations = [
    "Pertahankan pola hidup sehat",
    "Rutin olahraga minimal 150 menit/minggu",
    "Perbanyak konsumsi sayur dan buah",
    "Kontrol rutin sesuai jadwal",
  ];

  const recommendations =
    historyData.aiRecommendations ?? defaultRecommendations;
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={(details) => setOpen(details.open)}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop className="history-detail-backdrop" />
        <Dialog.Positioner className="history-detail-positioner">
          <Dialog.Content className="history-detail-content">
            <Box className="history-detail-header">
              <Flex className="history-detail-header-row">
                <Flex
                  align="center"
                  gap="12px"
                  className="history-detail-header-title"
                >
                  <Box className="history-detail-header-icon">
                    <FileText size={20} />
                  </Box>
                  <Box>
                    <Heading as="h2" className="history-detail-heading">
                      Detail MCU Sebelumnya
                    </Heading>
                    <Text className="history-detail-subtitle">
                      MCU pada {historyData.date} • {historyData.clinic}
                    </Text>
                  </Box>
                </Flex>
              </Flex>
            </Box>

            <Box className="history-detail-scroll">
              <Box className="history-detail-summary">
                <Flex className="history-detail-summary-bar">
                  {summaryItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Box
                        key={item.label}
                        className="history-detail-summary-item"
                      >
                        <Text className="history-detail-summary-item-label">
                          {item.label}
                        </Text>
                        <Flex
                          align="center"
                          gap="8px"
                          className="history-detail-summary-item-value-row"
                        >
                          <Icon
                            size={16}
                            className="history-detail-summary-item-icon"
                          />
                          <Text className="history-detail-summary-item-value">
                            {item.value}
                          </Text>
                        </Flex>
                      </Box>
                    );
                  })}

                  <Box className="history-detail-summary-item history-detail-summary-item--status">
                    <Text className="history-detail-summary-item-label">
                      Status
                    </Text>
                    <Box className="history-detail-status-pill">
                      <Box className="history-detail-status-dot" />
                      {historyData.status}
                    </Box>
                  </Box>
                </Flex>
              </Box>

              <Box className="history-detail-body">
                <Flex className="history-detail-body-grid">
                  <Box className="history-detail-results-panel">
                    <Text className="history-detail-section-heading">
                      Hasil Pemeriksaan
                    </Text>
                    <Box className="history-detail-table-wrapper">
                      <table className="history-detail-table">
                        <thead>
                          <tr>
                            {[
                              "Pemeriksaan",
                              "Hasil",
                              "Satuan",
                              "Nilai Rujukan",
                              "Status",
                            ].map((col) => (
                              <th
                                key={col}
                                className="history-detail-table-head"
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {(historyData.metrics ?? []).map((metric) => (
                            <tr key={metric.label}>
                              <td className="history-detail-table-cell">
                                {metric.label}
                              </td>
                              <td className="history-detail-table-cell history-detail-table-cell--value">
                                {metric.value}
                              </td>
                              <td className="history-detail-table-cell">
                                {metric.unit}
                              </td>
                              <td className="history-detail-table-cell">
                                {metric.reference}
                              </td>
                              <td className="history-detail-table-cell">
                                <Box
                                  as="span"
                                  className={`history-detail-metric-status history-detail-metric-status--${metric.status.toLowerCase()}`}
                                >
                                  {metric.status}
                                </Box>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                    <Flex
                      align="center"
                      gap="6px"
                      className="history-detail-note"
                    >
                      <Info size={14} />
                      <Text>
                        Catatan: Nilai rujukan dapat berbeda sesuai
                        laboratorium.
                      </Text>
                    </Flex>
                  </Box>

                  <Box className="history-detail-sidebar">
                    <Box className="history-detail-note-card history-detail-note-card--doctor">
                      <Flex className="history-detail-note-card-header">
                        <Box className="history-detail-note-card-icon">
                          <ClipboardList size={16} />
                        </Box>
                        <Text className="history-detail-note-card-title">
                          Catatan Dokter
                        </Text>
                      </Flex>
                      <Box className="history-detail-note-card-content history-detail-note-card-content--doctor">
                        <Text className="history-detail-note-card-text">
                          {historyData.note ??
                            "Tidak ada catatan dokter tersedia."}
                        </Text>
                        <Text className="history-detail-note-card-footer">
                          — {historyData.doctor}
                          {historyData.generatedAt
                            ? ` | ${historyData.generatedAt}`
                            : ""}
                        </Text>
                      </Box>
                    </Box>

                    <Box className="history-detail-note-card history-detail-note-card--ai">
                      <Flex className="history-detail-note-card-header">
                        <Box className="history-detail-note-card-icon history-detail-note-card-icon--ai">
                          <Sparkles size={16} />
                        </Box>
                        <Text className="history-detail-note-card-title">
                          Catatan AI
                        </Text>
                      </Flex>
                      <Box className="history-detail-note-card-content history-detail-note-card-content--ai">
                        {historyData.aiNote && (
                          <Text className="history-detail-note-card-text">
                            {historyData.aiNote.split("\n\n")[0]}
                          </Text>
                        )}

                        {historyData.comparisons &&
                          historyData.comparisons.length > 0 && (
                            <Box className="history-detail-comparison-list">
                              <Text className="history-detail-comparison-heading">
                                Dibanding MCU sebelumnya:
                              </Text>
                              {historyData.comparisons.map((item) => {
                                const trend = getComparisonTrend(item);
                                return (
                                  <Flex
                                    key={item.label}
                                    className="history-detail-comparison-row"
                                  >
                                    <ComparisonTrendIcon trend={trend} />
                                    <Text>
                                      {item.label}: {item.value}
                                    </Text>
                                  </Flex>
                                );
                              })}
                            </Box>
                          )}

                        <Box className="history-detail-recommendations">
                          <Text className="history-detail-comparison-heading">
                            Rekomendasi AI:
                          </Text>
                          {recommendations.map((item) => (
                            <Flex
                              key={item}
                              className="history-detail-recommendation-row"
                            >
                              <Box
                                as="span"
                                className="history-detail-recommendation-bullet"
                              >
                                •
                              </Box>
                              <Text>{item}</Text>
                            </Flex>
                          ))}
                        </Box>

                        <Text className="history-detail-note-card-meta">
                          Generated on{" "}
                          {historyData.generatedAt ?? "2025-01-02 10:15"}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </Flex>
              </Box>
            </Box>

            <Box className="history-detail-divider" />
            <Dialog.Footer className="history-detail-footer">
              <Flex className="history-detail-footer-actions">
                <Button
                  variant="outline"
                  className="history-detail-footer-button"
                >
                  <Download size={16} /> Download PDF
                </Button>
                <Button
                  variant="outline"
                  className="history-detail-footer-button"
                >
                  <Printer size={16} /> Print
                </Button>
                <Button
                  variant="outline"
                  className="history-detail-footer-button"
                >
                  <GitCompare size={16} /> Compare
                </Button>
                <Button
                  className="history-detail-footer-close-button"
                  onClick={() => setOpen(false)}
                >
                  Tutup
                </Button>
              </Flex>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default HistoryDetail;
