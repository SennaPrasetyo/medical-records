import "./index.css";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  Box,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxRoot,
  Flex,
  IconButton,
  Menu,
  Table,
} from "@chakra-ui/react";
import CustomFilter from "@/components/custom-filter/CustomFilter.tsx";
import { LightMode } from "@/components/ui/color-mode.tsx";
import { TablePagination } from "@/components/table-pagination/TablePagination.tsx";
import { Eye, MoreVertical, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

type HealthStatus = "fit" | "follow_up" | "unfit";

type EmployeeRow = {
  nik: string;
  name: string;
  department: string;
  checkupDate: string;
  result: string;
  status: HealthStatus;
};

const MOCK_ROWS: EmployeeRow[] = Array.from({ length: 185 }, (_, i) => {
  const n = i + 1;
  const statuses: HealthStatus[] = ["fit", "follow_up", "unfit"];
  const status = statuses[i % 3];
  const names = ["Dina", "Raka", "Siti", "Budi", "Anisa", "Wayan", "Putri"];
  const depts = ["Operations", "Engineering", "Finance", "HR", "Legal"];
  return {
    nik: `EMP-2024-${String(n).padStart(3, "0")}`,
    name: `${names[i % names.length]} ${String.fromCharCode(65 + (i % 26))}`,
    department: depts[i % depts.length],
    checkupDate: `2026-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
    result:
      status === "fit"
        ? "Within normal limits"
        : status === "follow_up"
          ? "Elevated cholesterol — referral advised"
          : "Does not meet role fitness criteria",
    status,
  };
});

function StatusBadge({ status }: { status: HealthStatus }) {
  const label =
    status === "fit"
      ? "Fit"
      : status === "follow_up"
        ? "Need follow up"
        : "Unfit";
  return (
    <span
      className={`employees-status-badge employees-status-badge--${status}`}
    >
      <span className="employees-status-badge__dot" aria-hidden />
      {label}
    </span>
  );
}

function RowActionsMenu({ employeeNik }: { employeeNik: string }) {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/detail/employee/${employeeNik}`);
  };

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton
          variant="outline"
          size="sm"
          className="employees-table-action-trigger"
        >
          <MoreVertical size={16} aria-hidden />
        </IconButton>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content
          className="employees-table-action-menu"
          bg="#ffffff"
          color="#0f172a"
          borderWidth="1px"
          borderColor="#e2e8f0"
          style={{ "--menu-bg": "#ffffff" } as CSSProperties}
        >
          <Menu.Item value="view-details" onSelect={goToDetail}>
            <Flex
              align="center"
              gap={2}
              className="employees-table-menu-item-inner"
            >
              <Eye size={16} aria-hidden />
              <Menu.ItemText>View details</Menu.ItemText>
            </Flex>
          </Menu.Item>
          <Menu.Separator className="employees-table-action-menu-sep" />
          <Menu.Item
            value="edit-employee"
            onSelect={() => {
              /* Edit route not implemented yet */
            }}
          >
            <Flex
              align="center"
              gap={2}
              className="employees-table-menu-item-inner"
            >
              <Pencil size={16} aria-hidden />
              <Menu.ItemText>Edit employee data</Menu.ItemText>
            </Flex>
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return MOCK_ROWS;
    return MOCK_ROWS.filter(
      (r) =>
        r.name.toLowerCase().includes(q) || r.nik.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const allFilteredIds = useMemo(() => filtered.map((r) => r.nik), [filtered]);
  const [selected, setSelected] = useState<Set<string>>(() => new Set());

  const allSelected =
    allFilteredIds.length > 0 && allFilteredIds.every((id) => selected.has(id));
  const someSelected =
    allFilteredIds.some((id) => selected.has(id)) && !allSelected;

  const headerChecked: boolean | "indeterminate" = allSelected
    ? true
    : someSelected
      ? "indeterminate"
      : false;

  const toggleRow = (nik: string, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(nik);
      else next.delete(nik);
      return next;
    });
  };

  return (
    <LightMode>
      <Box className="home-page">
        <div className="home-page__toolbar">
          <CustomFilter
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={() => setPage(1)}
          />
        </div>

        <Box className="employees-table-block">
          <Table.ScrollArea className="employees-table-scroll">
            <Table.Root size="md" variant="line" className="employees-table">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader className="employees-table-col employees-table-col--checkbox">
                    <CheckboxRoot
                      className="employees-table-checkbox"
                      colorPalette="gray"
                      variant="outline"
                      size="sm"
                      checked={headerChecked}
                      onCheckedChange={({ checked }) => {
                        if (checked === true)
                          setSelected(new Set(allFilteredIds));
                        else setSelected(new Set());
                      }}
                    >
                      <CheckboxHiddenInput />
                      <CheckboxControl />
                    </CheckboxRoot>
                  </Table.ColumnHeader>
                  <Table.ColumnHeader className="employees-table-col employees-table-col--nik">
                    NIK
                  </Table.ColumnHeader>
                  <Table.ColumnHeader>Nama</Table.ColumnHeader>
                  <Table.ColumnHeader>Departemen</Table.ColumnHeader>
                  <Table.ColumnHeader className="employees-table-col employees-table-col--date">
                    Tanggal MCU
                  </Table.ColumnHeader>
                  <Table.ColumnHeader>Hasil MCU</Table.ColumnHeader>
                  <Table.ColumnHeader className="employees-table-col employees-table-col--status">
                    Status
                  </Table.ColumnHeader>
                  <Table.ColumnHeader className="employees-table-col employees-table-col--action">
                    Action
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {paginatedRows.map((row) => (
                  <Table.Row key={row.nik}>
                    <Table.Cell className="employees-table-col employees-table-col--checkbox">
                      <CheckboxRoot
                        className="employees-table-checkbox"
                        colorPalette="gray"
                        variant="outline"
                        size="sm"
                        checked={selected.has(row.nik)}
                        onCheckedChange={({ checked }) =>
                          toggleRow(row.nik, checked === true)
                        }
                      >
                        <CheckboxHiddenInput />
                        <CheckboxControl />
                      </CheckboxRoot>
                    </Table.Cell>
                    <Table.Cell className="employees-table-col employees-table-col--nik">
                      {row.nik}
                    </Table.Cell>
                    <Table.Cell>{row.name}</Table.Cell>
                    <Table.Cell>{row.department}</Table.Cell>
                    <Table.Cell className="employees-table-col employees-table-col--date">
                      {row.checkupDate}
                    </Table.Cell>
                    <Table.Cell>{row.result}</Table.Cell>
                    <Table.Cell className="employees-table-col employees-table-col--status">
                      <StatusBadge status={row.status} />
                    </Table.Cell>
                    <Table.Cell className="employees-table-col employees-table-col--action">
                      <RowActionsMenu employeeNik={row.nik} />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>

          <TablePagination
            page={page}
            pageSize={pageSize}
            totalCount={filtered.length}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </Box>
      </Box>
    </LightMode>
  );
};

export default Homepage;
